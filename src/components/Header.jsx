import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // style used when the mobile menu is open
  const mobileMenuStyle = open
    ? {
        display: 'flex',
        position: 'fixed', // ensure it sits above page content and below headers
        top: 'calc(var(--topbar-height) + var(--nav-height) + env(safe-area-inset-top))',
        left: 0,
        right: 0,
        background: 'var(--paper)',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '18px 20px',
        borderBottom: '1px solid var(--line)',
        gap: '14px',
        maxHeight: 'calc(100vh - (var(--topbar-height) + var(--nav-height) + env(safe-area-inset-top)))',
        overflowY: 'auto',
        zIndex: 2050,
      }
    : undefined;

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-wrap">
          <div className="topbar-left">
            <div className="location">Vijayawada, Andhra Pradesh</div>
            <span className="divider">|</span>
            <div className="hours">Mon–Sat, 10 AM – 7 PM</div>
          </div>

          <div className="topbar-right">
            <div className="contacts">
              <a href="tel:+918688242655" className="phone">+91 86882 42655</a>
              <span className="comma">,</span>
              <a href="tel:+917382120015" className="phone">+91 73821 20015</a>
              <span className="divider">|</span>
              <a href="mailto:ashok.risefinance@gmail.com" className="email">ashok.risefinance@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <header className="site-header">
        <nav className="nav wrap">
          <a className="brand" href="#home">
            <img src="/assets/rise-financial-services-logo.png" alt="Rise Financial Services" />
          </a>

          <div
            className="navlinks"
            id="navlinks"
            style={mobileMenuStyle}
          >
            {/* Mobile-only contact block (moved from topbar for small screens) */}
            <div className="mobile-contacts" role="group" aria-label="Contact">
              <a href="tel:+918688242655" onClick={closeMenu} className="phone">📞 +91 86882 42655</a>
              <a href="tel:+917382120015" onClick={closeMenu} className="phone">📞 +91 73821 20015</a>
              <a href="mailto:ashok.risefinance@gmail.com" onClick={closeMenu} className="email">✉️ ashok.risefinance@gmail.com</a>
            </div>

            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>Why Us</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#network" onClick={closeMenu}>Network</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>

            {/* Optional: duplicate CTAs inside mobile menu for convenience */}
            <div className="mobile-ctas">
              <a className="btn btn-gold" href="#apply" onClick={closeMenu} role="button">Apply Now</a>
              <a className="btn btn-outline" href="tel:+918688242655" onClick={closeMenu} role="button">Call Us</a>
            </div>
          </div>

          <div className="nav-cta">
            <a className="btn btn-outline" href="tel:+918688242655" role="button">Call Us</a>
            <a className="btn btn-gold" href="#apply" role="button">Apply Now</a>
          </div>

          <button
            className="hamburger"
            id="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      {/* overlay shown only when the mobile menu is open — closes menu when tapped */}
      <div
        className={`nav-overlay ${open ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!open}
      />
    </>
  );
}
