import React from 'react';
import useReveal from '../useReveal.js';
import { netStats } from '../data.js';

export default function Network() {
  const [leftRef, leftIn] = useReveal();
  const [statsRef, statsIn] = useReveal();

  return (
    <section className="network" id="network">
      <div className="wrap network-grid">
        <div ref={leftRef} className={leftIn ? 'in' : ''}>
          <div className="eyebrow" style={{ color: 'var(--gold-light)' }}>Our Network</div>
          <h2>One-stop financial solutions, backed by a wide lending network.</h2>
          <p>We compare options across a broad panel of NBFCs and banks so you can explore wider choices without approaching each lender yourself.</p>
          <div className="net-tags">
            <span>Wider Options</span>
            <span>Faster Assistance</span>
            <span>Better Solutions</span>
            <span>Strong Network</span>
          </div>
        </div>

        <div className={`net-stats${statsIn ? ' in' : ''}`} ref={statsRef}>
          {netStats.map((s) => (
            <div className="net-stat" key={s.cap}>
              <div className="big">{s.big}</div>
              <div className="cap">{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
