'use client';

import { useState } from 'react';

export default function CareersModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Expose open function globally for footer link
  if (typeof window !== 'undefined') {
    window.__openCareersModal = () => setIsOpen(true);
  }

  return (
    <div
      className={`modal-overlay${isOpen ? ' show' : ''}`}
      id="careersModal"
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="modal-title">Join The Authors</div>
        <div className="modal-sub">Tell us about your story and where you fit in our library.</div>
        <form
          className="form contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Application submitted! We will be in touch.');
            e.target.reset();
            setIsOpen(false);
          }}
        >
          <div className="f-row">
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="f-row">
            <div className="field">
              <label>Role / Position</label>
              <input type="text" placeholder="e.g. Media Buyer" required />
            </div>
            <div className="field">
              <label>Portfolio URL</label>
              <input type="url" placeholder="https://..." />
            </div>
          </div>
          <div className="field">
            <label>Why TheStriveAds?</label>
            <textarea placeholder="Write a short cover letter..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Submit Application{' '}
            <span className="btn-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
