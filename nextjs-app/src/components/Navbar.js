'use client';

import { useEffect, useRef } from 'react';

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 30);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav" id="nav" ref={navRef}>
      <div className="wrap nav-inner">
        <a href="#" className="logo">
          <img src="/logo-header.png" alt="Strive Ads" />
        </a>
        <button className="btn btn-primary" onClick={scrollToContact}>
          <span className="btn-label">Start Your Next Chapter</span>
          <span className="btn-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </span>
        </button>
        <div className="hamburger" id="hamburger" onClick={() => {
          const menu = document.getElementById('mobileMenu');
          const overlay = document.getElementById('mobileOverlay');
          const hamburger = document.getElementById('hamburger');
          if (menu.classList.contains('open')) {
            hamburger.classList.remove('active');
            menu.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
          } else {
            hamburger.classList.add('active');
            menu.classList.add('open');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
          }
        }}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
}
