import React from 'react';
import useReveal from '../useReveal.js';
import { services } from '../data.js';

export default function Services() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();

  return (
    <section id="services">
      <div className="wrap">
        <div className={`section-head${headIn ? ' in' : ''}`} ref={headRef}>
          <div className="eyebrow">Our Services</div>
          <h2>Solutions for every financial milestone</h2>
          <p>From your first home to your next business expansion, we help you make an informed decision.</p>
        </div>

        <div className={`services-grid${gridIn ? ' in' : ''}`} ref={gridRef}>
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <a href="#apply">Enquire now →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
