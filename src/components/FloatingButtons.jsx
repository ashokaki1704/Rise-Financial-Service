import React from 'react';

export default function FloatingButtons() {
  return (
    <>
      <a className="dial-fab" href="tel:+918688242655" aria-label="Call us" title="Call us on +91 86882 42655">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#FFFFFF" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      <a className="whatsapp-fab" href="https://wa.me/918688242655" aria-label="WhatsApp us" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#FFFFFF" d="M17.507 14.307l-2.88-.514a1.5 1.5 0 0 0-1.528.706l-.693 1.053c-1.332-.738-2.85-2.256-3.588-3.588l1.052-.693a1.5 1.5 0 0 0 .707-1.528l-.514-2.88a1.5 1.5 0 0 0-1.473-1.177H6.5a1.5 1.5 0 0 0-1.492 1.635c.963 7.274 6.588 12.899 13.862 13.862a1.5 1.5 0 0 0 1.635-1.492v-1.531a1.5 1.5 0 0 0-1.177-1.473z"/>
        </svg>
      </a>
    </>
  );
}
