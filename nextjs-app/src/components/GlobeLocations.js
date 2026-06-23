'use client';
import { useState, useEffect } from 'react';

const locationsData = [
  {
    id: 'uk',
    name: 'United Kingdom',
    top: '18.3%',
    left: '5.5%',
    width: '11%',
    height: '7%',
    address: 'Office No 4 St James House, 27-43 Eastern Road,\nRomford, United Kingdom, RM1 3NH'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    top: '26%',
    left: '50%',
    width: '14%',
    height: '8%',
    address: 'Soğanlı Mahallesi İstanbul Caddesi no:333/1-105 Osmangazi, Bursa-Turkiye'
  },
  {
    id: 'india',
    name: 'India',
    top: '39%',
    left: '81%',
    width: '13%',
    height: '11%',
    address: 'New BEL Rd, R.M.V. 2nd Stage, Bengaluru, Karnataka 560094, India'
  },
  {
    id: 'ksa',
    name: 'KSA',
    top: '58.5%',
    left: '33%',
    width: '12%',
    height: '8%',
    address: 'Almunjazat street, district- Al Nahda,\nJeddah, KSA, 23523'
  },
  {
    id: 'uae',
    name: 'UAE',
    top: '59%',
    left: '59%',
    width: '12%',
    height: '8%',
    address: 'Empire Heights Business Centre,\nBusiness Bay — Dubai, UAE'
  }
];

export default function GlobeLocations() {
  const [activeLocation, setActiveLocation] = useState(locationsData[4]); // Default UAE

  useEffect(() => {
    // Re-trigger intersection observer for newly added reveal elements if needed
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('#global-locations .reveal, #global-locations .reveal-left, #global-locations .reveal-right').forEach((el) => io.observe(el));
    
    return () => io.disconnect();
  }, []);

  return (
    <section id="global-locations" style={{ padding: '72px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Global Footprint</div>
          <h2 className="h-sec">Our Global Locations</h2>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div className="reveal-left" style={{ flex: 1, minWidth: '320px' }}>
            <style>{`
              @keyframes floatGlobe {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
                100% { transform: translateY(0px); }
              }
            `}</style>
            <div style={{ position: 'relative', animation: 'floatGlobe 6s ease-in-out infinite' }}>
              <img src="/globe-locations.png" alt="Globe Locations" style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
              
              {/* Hotspots */}
              {locationsData.map((loc) => (
                <div 
                  key={loc.id}
                  onMouseEnter={() => setActiveLocation(loc)}
                  style={{
                    position: 'absolute',
                    top: loc.top,
                    left: loc.left,
                    width: loc.width,
                    height: loc.height,
                    cursor: 'pointer',
                    zIndex: 10,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: activeLocation.id === loc.id ? '0 0 25px rgba(138, 79, 255, 0.9), inset 0 0 15px rgba(138, 79, 255, 0.5)' : 'none',
                    backgroundColor: activeLocation.id === loc.id ? 'rgba(138, 79, 255, 0.2)' : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="reveal-right" style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--line)', 
              borderRadius: 'var(--r-lg)', 
              padding: '40px',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, var(--lime) 0%, transparent 70%)',
                opacity: 0.1,
                pointerEvents: 'none'
              }}></div>
              <h3 style={{ color: 'var(--lime)', fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>{activeLocation.name}</h3>
              <p style={{ fontSize: '18px', color: 'var(--paper)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {activeLocation.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
