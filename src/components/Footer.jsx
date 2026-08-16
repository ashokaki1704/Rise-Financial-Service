import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">Why Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#network">Our Network</a></li>
              <li><a href="#process">Our Process</a></li>
            </ul>
          </div>

          <div>
            <h4>Popular Services</h4>
            <ul>
              <li><a href="#apply">Home Loans</a></li>
              <li><a href="#apply">Property Loans</a></li>
              <li><a href="#apply">Business Loans</a></li>
              <li><a href="#apply">Educational Loans</a></li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="tel:+918688242655">+91 86882 42655</a></li>
              <li><a href="tel:+917382120015">+91 73821 20015</a></li>
              <li><a href="mailto:ashok.risefinance@gmail.com">ashok.risefinance@gmail.com</a></li>
              <li>73-7-4, Ward No 11, Donka Road, Patamata, Vijayawada, Andhra Pradesh</li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Rise Financial Services. All rights reserved.</span>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
