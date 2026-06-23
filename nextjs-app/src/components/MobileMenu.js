'use client';

import { useEffect } from 'react';

export default function MobileMenu() {
  useEffect(() => {
    const overlay = document.getElementById('mobileOverlay');
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');

    function closeMobileMenu() {
      if (hamburger) hamburger.classList.remove('active');
      if (menu) menu.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (overlay) overlay.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.mobile-menu a').forEach((a) => {
      a.addEventListener('click', closeMobileMenu);
    });

    return () => {
      if (overlay) overlay.removeEventListener('click', closeMobileMenu);
    };
  }, []);

  return (
    <>
      <div className="mobile-overlay" id="mobileOverlay"></div>
      <div className="mobile-menu" id="mobileMenu">
        <a href="#about">The Catalog</a>
        <a href="#services">The Archives</a>
        <a href="#why">The Critique</a>
        <a href="#team">The Co-Authors</a>
        <a href="#borrowing-history">The Index</a>
        <a href="#testimonials">Reader Reviews</a>
        <a href="#contact">Inquiries</a>
      </div>
    </>
  );
}
