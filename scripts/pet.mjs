#!/usr/bin/env node
// Launch/verify helper for the a11y pet.
//   node scripts/pet.mjs up        install + build if needed, start production server in background
//   node scripts/pet.mjs down      stop it
//   node scripts/pet.mjs status    is it answering?
//   node scripts/pet.mjs config    print machine-readable run config (absolute page URLs) for the checker
//   node scripts/pet.mjs verify    check that every non-interactive ID in expected/ISSUES.md is present in the served HTML
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'a11y-pet.config.json'), 'utf8'));
const stateDir = join(root, '.pet');
const pidFile = join(stateDir, 'server.pid');
const logFile = join(stateDir, 'server.log');
const baseUrl = process.env.PET_BASE_URL || config.baseUrl;
const urlOf = (path) => new URL(path, baseUrl).href;

const run = (cmd) => {
  const result = spawnSync(cmd, { cwd: root, stdio: 'inherit', shell: true });
  if (result.status !== 0) throw new Error(`failed: ${cmd}`);
};

const isUp = async () => {
  try {
    const res = await fetch(urlOf(config.launch.readyPath));
    return res.ok;
  } catch {
    return false;
  }
};

const waitUntilUp = async () => {
  const deadline = Date.now() + config.launch.readyTimeoutMs;
  while (Date.now() < deadline) {
    if (await isUp()) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`server not ready after ${config.launch.readyTimeoutMs} ms, see ${logFile}`);
};

const up = async () => {
  if (await isUp()) return console.log(`already running at ${config.baseUrl}`);
  if (!existsSync(join(root, 'node_modules'))) run(config.launch.install);
  if (!existsSync(join(root, '.next', 'BUILD_ID'))) run(config.launch.build);
  mkdirSync(stateDir, { recursive: true });
  const log = openSync(logFile, 'a');
  const [cmd, ...args] = config.launch.start.split(' ');
  const child = spawn(cmd, args, { cwd: root, detached: true, stdio: ['ignore', log, log] });
  child.unref();
  writeFileSync(pidFile, String(child.pid));
  await waitUntilUp();
  console.log(`running at ${config.baseUrl} (pid ${child.pid}, log ${logFile})`);
};

const down = () => {
  if (!existsSync(pidFile)) return console.log('not started by pet.mjs (no pid file)');
  const pid = Number(readFileSync(pidFile, 'utf8'));
  try {
    process.kill(-pid);
  } catch {
    console.log(`process group ${pid} already gone`);
  }
  rmSync(pidFile);
  console.log('stopped');
};

const status = async () => {
  const up = await isUp();
  console.log(up ? `up: ${config.baseUrl}` : 'down');
  process.exitCode = up ? 0 : 1;
};

const printConfig = () => {
  const pages = config.pages.map((page) => ({ ...page, url: urlOf(page.path) }));
  console.log(JSON.stringify({ ...config, pages }, null, 2));
};

const parseIssueRows = () => {
  const markdown = readFileSync(join(root, config.expectedIssues), 'utf8');
  return markdown
    .split('\n')
    .map((line) => line.split('|').map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 10 && /^[A-Z]+(-[A-Z]+)*-\d+$/.test(cells[1]))
    .map((cells) => ({
      id: cells[1],
      page: cells[2],
      interactive: cells[7].toLowerCase() === 'yes',
      viewport: cells[8],
    }));
};

const verify = async () => {
  if (!(await isUp())) throw new Error('server is not running, use `node scripts/pet.mjs up`');
  const rows = parseIssueRows();
  const htmlByPage = new Map();
  const missing = [];
  let skipped = 0;
  for (const row of rows) {
    if (row.interactive) {
      skipped += 1;
      continue;
    }
    // Shell defects ("global") may live in components some pages omit (e.g. breadcrumbs), so any page may carry them.
    const pages = row.page === 'global' ? config.pages : config.pages.filter((p) => p.id === row.page);
    if (pages.length === 0) {
      missing.push(`${row.id} (unknown page ${row.page})`);
      continue;
    }
    let found = false;
    for (const page of pages) {
      if (!htmlByPage.has(page.id)) htmlByPage.set(page.id, await (await fetch(urlOf(page.path))).text());
      if (htmlByPage.get(page.id).includes(row.id)) {
        found = true;
        break;
      }
    }
    if (!found) missing.push(`${row.id} (${row.page})`);
  }
  console.log(`${rows.length} manifest rows, ${rows.length - skipped} checked in HTML, ${skipped} interactive skipped`);
  if (missing.length > 0) {
    console.error(`MISSING from served HTML:\n  ${missing.join('\n  ')}`);
    process.exitCode = 1;
    return;
  }
  console.log('manifest and app are in sync');
};

const commands = { up, down, status, config: printConfig, verify };
const command = commands[process.argv[2]];
if (!command) {
  console.error(`usage: node scripts/pet.mjs <${Object.keys(commands).join('|')}>`);
  process.exit(2);
}
try {
  await command();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
