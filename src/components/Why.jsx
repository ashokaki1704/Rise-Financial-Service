import React from 'react';
import useReveal from '../useReveal.js';
import { whyItems } from '../data.js';

const icons = [
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" key="shield"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" key="clock"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3.5 2" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" key="bolt"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" key="check"><path d="M7 11l3 3 7-7" /><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" /></svg>,
];

export default function Why() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();

  return (
    <section className="why" id="about">
      <div className="wrap">
        <div className={`section-head${headIn ? ' in' : ''}`} ref={headRef}>
          <div className="eyebrow">Why Choose Us</div>
          <h2>Big dreams need the right financial support.</h2>
          <p>Every case is handled personally, from the first conversation to final disbursal — with clarity at each step.</p>
        </div>

        <div className={`why-grid${gridIn ? ' in' : ''}`} ref={gridRef}>
          {whyItems.map((item, i) => (
            <div className="why-item" key={item.title}>
              <div className="icon">{icons[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
