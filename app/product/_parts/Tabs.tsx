'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabDef {
  id: string;
  label: string;
  panel: ReactNode;
}

export interface TabsProps {
  id: string;
  tabs: TabDef[];
  label?: string;
  vertical?: boolean;
  keys?: 'none' | 'lr' | 'full';
  roving?: boolean;
  selectedAttr?: boolean;
  controls?: 'valid' | 'missing';
  panelLabelled?: boolean;
  panelFocusable?: boolean;
  hideActivePanel?: boolean;
  ok?: boolean;
  listIssue?: string;
  panelIssue?: string;
}

export default function Tabs({
  id,
  tabs,
  label,
  vertical = false,
  keys = 'full',
  roving = true,
  selectedAttr = true,
  controls = 'valid',
  panelLabelled = true,
  panelFocusable = false,
  hideActivePanel = false,
  ok = false,
  listIssue,
  panelIssue,
}: TabsProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const count = tabs.length;

  const go = (index: number) => {
    setActive(index);
    refs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (keys === 'none') return;
    let next = -1;
    if (event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (keys === 'full' && event.key === 'Home') next = 0;
    else if (keys === 'full' && event.key === 'End') next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    go(next);
  };

  const panelPrefix = controls === 'valid' ? 'panel' : 'tabpanel';

  return (
    <div className={`tabs${vertical ? ' tabs-v' : ''}`}>
      <div
        role="tablist"
        className={`tablist${vertical ? ' vertical' : ''}${ok ? ' ok' : ''}`}
        aria-label={label}
        aria-orientation={vertical ? 'vertical' : undefined}
        data-pet-issue={listIssue}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.id}`}
            className={`tab${index === active ? ' active' : ''}`}
            aria-selected={selectedAttr ? index === active : undefined}
            aria-controls={`${id}-${panelPrefix}-${tab.id}`}
            tabIndex={roving ? (index === active ? 0 : -1) : undefined}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabpanels">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${id}-panel-${tab.id}`}
            className="tabpanel"
            hidden={index !== active}
            aria-labelledby={panelLabelled ? `${id}-tab-${tab.id}` : undefined}
            aria-hidden={hideActivePanel ? index === active : undefined}
            tabIndex={panelFocusable ? 0 : undefined}
            data-pet-issue={panelIssue}
          >
            {tab.panel}
          </div>
        ))}
      </div>
    </div>
  );
}
