'use client';

import { useState } from 'react';

export default function CareersModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Expose open function globally for footer link
  if (typeof window !== 'undefined') {
    window.__openCareersModal = () => setIsOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/submit.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Application submitted! We will be in touch.' });
        e.target.reset();
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus({ type: '', message: '' });
        }, 3000);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.message || 'Something went wrong. Please ensure your endpoint is correct.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="modal-sub">Tell us about your story and where you fit in.</div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="formType" id="careersFormType" value="Careers Application" />
          <div className="f-row">
            <div className="field">
              <label htmlFor="careersFullName">Full Name</label>
              <input type="text" name="fullName" id="careersFullName" placeholder="John Doe" required />
            </div>
            <div className="field">
              <label htmlFor="careersEmail">Email</label>
              <input type="email" name="email" id="careersEmail" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="f-row">
            <div className="field">
              <label htmlFor="careersPhone">Phone</label>
              <input type="tel" name="phone" id="careersPhone" placeholder="+971 50 123 4567" required />
            </div>
            <div className="field">
              <label htmlFor="careersRole">Role / Position</label>
              <input type="text" name="role" id="careersRole" placeholder="e.g. Media Buyer" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="careersPortfolio">Portfolio URL</label>
            <input type="url" name="portfolio" id="careersPortfolio" placeholder="https://..." />
          </div>
          <div className="field">
            <label htmlFor="careersResume">Upload Resume/CV <span style={{ fontSize: '11px', color: 'var(--paper-dim)', marginLeft: '6px' }}>(Max 5 MB)</span></label>
            <input 
              type="file" 
              name="resume"
              id="careersResume"
              accept=".pdf,.doc,.docx" 
              required 
              style={{ paddingTop: '10px' }} 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  alert('File size exceeds the 5 MB limit. Please select a smaller file.');
                  e.target.value = ''; // Clear the input
                }
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="careersCoverLetter">Why TheStriveAds?</label>
            <textarea name="coverLetter" id="careersCoverLetter" placeholder="Write a short cover letter..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}{' '}
            {!isSubmitting && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
          {submitStatus.message && (
            <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', fontSize: '14px', backgroundColor: submitStatus.type === 'success' ? 'rgba(107, 16, 201, 0.1)' : 'rgba(255, 0, 0, 0.1)', color: submitStatus.type === 'success' ? 'var(--lime)' : '#ff4444', border: `1px solid ${submitStatus.type === 'success' ? 'var(--lime)' : '#ff4444'}` }}>
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
