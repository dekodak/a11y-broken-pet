import { useState } from 'react';
import Icon from '../../_components/Icon';

export default function ReturnsTip() {
  const [show, setShow] = useState(false);
  return (
    <span className="tip-wrap">
      {/* DLG-008: hover-only popover, no focus, no tooltip role, no aria-describedby */}
      <button
        type="button"
        className="returns-btn ok"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        data-pet-issue="DLG-008"
      >
        <Icon name="info" size={18} />
        Free returns
      </button>
      {show ? (
        <div className="popover tip-pop" data-pet-issue="DLG-008">
          Send unworn gear back within 30 days and we cover the postage. Boots must be tried on indoors.
        </div>
      ) : null}
    </span>
  );
}
