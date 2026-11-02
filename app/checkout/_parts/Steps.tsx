const steps = ['Contact', 'Delivery', 'Payment', 'Account'];

export default function Steps() {
  return (
    <nav aria-label="Checkout progress">
      <ol className="co-steps">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === 0 ? 'step' : undefined}>
            <span className="n" aria-hidden="true">{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
