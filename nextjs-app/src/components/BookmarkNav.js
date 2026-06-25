'use client';

import { useEffect, useState, useRef } from 'react';

const sections = [
  'hero-section', 'about', 'services', 'why',
  'borrowing-history', 'team', 'testimonials', 'contact'
];

const labels = [
  'Front Desk', 'The Catalog', 'The Archives', 'The Critique',
  'The Index', 'The Co-Authors', 'Reviews', 'Inquiries'
];

export default function BookmarkNav() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    function updateBookmarks() {
      let currentIdx = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentIdx = i;
          }
        }
      });
      setActiveIdx(currentIdx);
    }
    window.addEventListener('scroll', updateBookmarks);
    return () => window.removeEventListener('scroll', updateBookmarks);
  }, []);

  return (
    <nav className="bookmark-nav" id="bookmarkNav">
      {sections.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className={`bm${i === activeIdx ? ' active' : ''}`}
          data-section={id}
        >
          {labels[i]}
        </a>
      ))}
      <div className="page-ind" id="pageInd">
        Page {activeIdx + 1} of {sections.length}
      </div>
    </nav>
  );
}
