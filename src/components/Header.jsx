import React, { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div>Vijayawada, Andhra Pradesh <span className="divider">|</span> Mon–Sat, 10 AM – 7 PM</div>
          <div>
            <a href="tel:+918688242655">+91 86882 42655</a>,{' '}
            <a href="tel:+917382120015">+91 73821 20015</a>
            <span className="divider">|</span>
            <a href="mailto:ashok.risefinance@gmail.com">ashok.risefinance@gmail.com</a>
          </div>
        </div>
      </div>

      <header>
        <nav className="nav wrap">
          <a className="brand" href="#home">
            <img src="/assets/rise-financial-services-logo.png" alt="Rise Financial Services" />
          </a>

          <div
            className="navlinks"
            id="navlinks"
            style={
              open
                ? {
                    display: 'flex',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--paper)',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '20px',
                    borderBottom: '1px solid var(--line)',
                    gap: '18px',
                  }
                : undefined
            }
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>Why Us</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#network" onClick={closeMenu}>Network</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>

          <div className="nav-cta">
            <a className="btn btn-outline" href="tel:+918688242655" role="button">Call Us</a>
            <a className="btn btn-gold" href="#apply" role="button">Apply Now</a>
          </div>

          <button
            className="hamburger"
            id="hamburger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>
    </>
  );
}
