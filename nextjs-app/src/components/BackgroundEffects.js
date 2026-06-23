'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const curRef = useRef(null);
  const glowARef = useRef(null);
  const glowBRef = useRef(null);

  useEffect(() => {
    const cur = curRef.current;
    let curX = 0, curY = 0, actualX = 0, actualY = 0;
    let animId;

    function onMouseMove(e) {
      curX = e.clientX;
      curY = e.clientY;
    }

    function animateCursor() {
      actualX += (curX - actualX) * 0.12;
      actualY += (curY - actualY) * 0.12;
      if (cur) {
        cur.style.left = actualX + 'px';
        cur.style.top = actualY + 'px';
      }
      animId = requestAnimationFrame(animateCursor);
    }

    window.addEventListener('mousemove', onMouseMove);
    animateCursor();

    const onLeave = () => { if (cur) cur.style.opacity = 0; };
    const onEnter = () => { if (cur) cur.style.opacity = 1; };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Parallax glows
    const isMobile = window.matchMedia('(max-width: 980px)').matches;
    function onScroll() {
      if (!isMobile) {
        const sy = window.scrollY;
        if (glowARef.current) glowARef.current.style.transform = `translateY(${sy * 0.15}px)`;
        if (glowBRef.current) glowBRef.current.style.transform = `translateY(${sy * -0.1}px)`;
      }
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="bg-fx">
        <div className="glow a" id="glowA" ref={glowARef}></div>
        <div className="glow b" id="glowB" ref={glowBRef}></div>
      </div>
      <div className="grain"></div>
      <div className="cursor" id="cursor" ref={curRef}></div>
    </>
  );
}
