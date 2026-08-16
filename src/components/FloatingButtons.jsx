import React from 'react';

export default function FloatingButtons() {
  return (
    <>
      <a className="dial-fab" href="tel:+918688242655" aria-label="Call us" title="Call us on +91 86882 42655">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      <a className="whatsapp-fab" href="https://wa.me/918688242655" aria-label="WhatsApp us" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16.02 2.667c-7.36 0-13.35 5.99-13.35 13.35 0 2.355.62 4.657 1.795 6.68L2.667 29.33l6.79-1.78a13.29 13.29 0 0 0 6.56 1.72h.006c7.36 0 13.35-5.99 13.35-13.35 0-3.567-1.39-6.92-3.[...]"/>
        </svg>
      </a>
    </>
  );
}
