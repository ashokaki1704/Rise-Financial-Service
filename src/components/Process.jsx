import React from 'react';
import useReveal from '../useReveal.js';
import { processSteps } from '../data.js';

export default function Process() {
  const [headRef, headIn] = useReveal();
  const [listRef, listIn] = useReveal();

  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className={`section-head center${headIn ? ' in' : ''}`} ref={headRef}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Process</div>
          <h2>A clear path from enquiry to disbursal</h2>
          <p>No confusion, no chasing — our team supports you through every step, in this order.</p>
        </div>

        <div className={`process-list${listIn ? ' in' : ''}`} ref={listRef}>
          {processSteps.map((step) => (
            <div className="process-item" key={step.mark}>
              <div className="step-mark">{step.mark}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
