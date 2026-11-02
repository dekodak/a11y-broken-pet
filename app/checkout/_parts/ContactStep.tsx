'use client';

interface ContactStepProps {
  email: string;
  onEmail: (value: string) => void;
  emailError: string;
}

export default function ContactStep({ email, onEmail, emailError }: ContactStepProps) {
  return (
    // OK-FRM-1: correct billing contact group
    <fieldset className="ok" data-pet-issue="OK-FRM-1">
      <legend>Contact details</legend>
      <div className="co-pair">
        <div className="field">
          <label htmlFor="bill-first">First name <span className="co-opt">(required)</span></label>
          <input id="bill-first" name="firstName" type="text" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="bill-last">Last name <span className="co-opt">(required)</span></label>
          <input id="bill-last" name="lastName" type="text" required autoComplete="family-name" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="bill-email">Email address <span className="co-opt">(required)</span></label>
        <input
          id="bill-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? 'bill-email-error' : undefined}
          className={emailError ? 'invalid' : undefined}
        />
        <div id="bill-email-error" role="alert" className="err">{emailError}</div>
      </div>
    </fieldset>
  );
}
