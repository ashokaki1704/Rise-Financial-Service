import React from 'react';

export default function FloatingButtons() {
  return (
    <>
      <a className="dial-fab" href="tel:+918688242655" aria-label="Call us" title="Call us on +91 86882 42655">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
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
