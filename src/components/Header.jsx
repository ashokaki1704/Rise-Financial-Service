import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const lastY = useRef(0);

  const closeMenu = () => setOpen(false);

  // Lock page scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      setShowTopbar(true);
      document.body.classList.remove('topbar-hidden');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Hide topbar while scrolling down, show while scrolling up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      if (currentY > lastY.current && currentY > 80) {
        setShowTopbar(false);
        document.body.classList.add('topbar-hidden');
      } else {
        setShowTopbar(true);
        document.body.classList.remove('topbar-hidden');
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Mobile menu
  const mobileMenuStyle = open
    ? {
        display: 'flex',
        position: 'fixed',
        top: 'calc(var(--topbar-height) + var(--nav-height) + env(safe-area-inset-top))',
        left: 0,
        right: 0,
        background: 'var(--paper)',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '18px 20px',
        borderBottom: '1px solid var(--line)',
        gap: '14px',
        maxHeight:
          'calc(100vh - (var(--topbar-height) + var(--nav-height) + env(safe-area-inset-top)))',
        overflowY: 'auto',
        zIndex: 2050,
      }
    : undefined;

  return (
    <>
      {/* TOPBAR */}
      <div className={`topbar ${showTopbar ? 'visible' : 'hidden'}`}>
        <div className="wrap topbar-wrap">
          <div className="contacts">
            <a href="tel:+918688242655" className="phone">
              +91 86882 42655
            </a>

            <span className="separator">|</span>

            <a href="tel:+917382120015" className="phone">
              +91 73821 20015
            </a>

            <span className="separator">|</span>

            <a
              href="mailto:ashok.risefinance@gmail.com"
              className="email"
            >
              ashok.risefinance@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <nav className="nav wrap">

          {/* LOGO */}
          <a className="brand" href="#home">
            <img
              className="brand-logo"
              src="/assets/rise-financial-services-logo.png"
              alt="Rise Financial Services Logo"
              decoding="async"
              loading="eager"
            />
          </a>

          {/* NAV LINKS */}
          <div
            className="navlinks"
            id="navlinks"
            style={mobileMenuStyle}
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>Why Us</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#network" onClick={closeMenu}>Network</a>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="nav-cta">
            <a
              className="btn btn-outline"
              href="tel:+918688242655"
              role="button"
            >
              Call Us
            </a>

            <a
              className="btn btn-gold"
              href="#apply"
              role="button"
            >
              Apply Now
            </a>
          </div>

          {/* MOBILE MENU */}
          <button
            className="hamburger"
            id="hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </nav>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`nav-overlay ${open ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!open}
      />
    </>
  );
}
