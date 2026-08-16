import React, { useState } from 'react';
import useReveal from '../useReveal.js';
import { loanOptions, timeOptions } from '../data.js';

const initialForm = {
  name: '', mobile: '', email: '', city: '', loan: '', time: '', details: '',
};

export default function Apply() {
  const [infoRef, infoIn] = useReveal();
  const [formRef, formIn] = useReveal();

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting', message: '' });

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setStatus({
        state: 'success',
        message: 'Thank you. Your requirement has been saved to our records and our team will contact you shortly.',
      });

      setTimeout(() => {
        setForm(initialForm);
        setStatus({ state: 'idle', message: '' });
      }, 3000);
    } catch (err) {
      setStatus({
        state: 'error',
        message: `Sorry, something went wrong (${err.message}). Please try again or call us directly.`,
      });
    }
  };

  const submitting = status.state === 'submitting';
  const success = status.state === 'success';

  return (
    <section className="apply" id="apply">
      <div className="wrap apply-grid">
        <div className={`apply-info${infoIn ? ' in' : ''}`} ref={infoRef}>
          <div className="eyebrow">Apply Now</div>
          <h2>Let's make your next financial decision a confident one.</h2>
          <p>Complete this short form and our team will review your requirement and get back to you within 24 business hours.</p>

          <div className="contact-block" id="contact">
            <div className="row">
              <span className="icon-sm">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M3 5h4l2 5-2.5 1.5a11 11 0 0 0 5 5L13 14l5 2v4a2 2 0 0 1-2 2C8.5 22 2 15.5 2 7a2 2 0 0 1 2-2z" /></svg>
              </span>
              <div><strong>Call our office</strong><span>+91 86882 42655, +91 73821 20015</span></div>
            </div>
            <div className="row">
              <span className="icon-sm">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3 6l9 7 9-7" /></svg>
              </span>
              <div><strong>Email us</strong><span>ashok.risefinance@gmail.com</span></div>
            </div>
            <div className="row">
              <span className="icon-sm">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>
              </span>
              <div><strong>Visit us</strong><span>73-7-4, Ward No 11, Donka Road, Patamata, Vijayawada, Andhra Pradesh</span></div>
            </div>
          </div>
        </div>

        <form className={`form-card${formIn ? ' in' : ''}`} id="loanForm" ref={formRef} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" required placeholder="Your full name" value={form.name} onChange={update('name')} />
            </div>
            <div className="field">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" name="mobile" type="tel" required pattern="[0-9+\-\s]{10,15}" placeholder="10-digit mobile number" value={form.mobile} onChange={update('mobile')} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="email">Email ID</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} />
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" placeholder="Your city" value={form.city} onChange={update('city')} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label htmlFor="loan">Required Loan</label>
              <select id="loan" name="loan" required value={form.loan} onChange={update('loan')}>
                <option value="">Select a product</option>
                {loanOptions.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="time">Preferred Call Time</label>
              <select id="time" name="time" value={form.time} onChange={update('time')}>
                <option value="">Select preferred time</option>
                {timeOptions.map((opt) => <option key={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="field full">
              <label htmlFor="details">Additional Details (optional)</label>
              <textarea id="details" name="details" rows="3" placeholder="Tell us a bit about your requirement" value={form.details} onChange={update('details')} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-gold"
            id="submitBtn"
            disabled={submitting}
            style={success ? { background: 'var(--gold-light)' } : undefined}
          >
            {submitting ? 'Submitting...' : success ? '✓ Requirement Submitted' : 'Submit Your Requirement →'}
          </button>
          <p className="form-note">🔒 Used only for your enquiry and permitted processing. No obligation to proceed.</p>
          <p id="formStatus" className="form-note" aria-live="polite">{status.message}</p>
        </form>
      </div>
    </section>
  );
}
