'use client';

import { useEffect, useRef } from 'react';
import ReadingProgress from '@/components/ReadingProgress';
import BookmarkNav from '@/components/BookmarkNav';
import BackgroundEffects from '@/components/BackgroundEffects';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import MobileMenu from '@/components/MobileMenu';
import ChapterDivider from '@/components/ChapterDivider';
import Footer from '@/components/Footer';
import CareersModal from '@/components/CareersModal';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import GlobeLocations from '@/components/GlobeLocations';

/* ===== DATA ===== */
const brandsRow1 = [
  'Al Madina Group', 'Talal Group', 'O Gold',
  'Al Amin Opticals', 'AB Mauri', 'Bharat Petroleum', 'Canon',
  'Cadbury', 'Dulux', 'SKR Building Contracting',
];
const brandsRow2 = [
  'Tajvi Jewellers', 'Zaiba Jewellers', 'Bismi Wholesale',
  'The Hindu', 'Ericsson', 'Sun Group', 'Britannia', 'Cafe Coffee Day',
  'Refyne', 'Shaz Software',
];

const countryOptions = [
  { code: 'AE', value: '971', label: '🇦🇪 +971' },
  { code: 'SA', value: '966', label: '🇸🇦 +966' },
  { code: 'BH', value: '973', label: '🇧🇭 +973' },
  { code: 'QA', value: '974', label: '🇶🇦 +974' },
  { code: 'OM', value: '968', label: '🇴🇲 +968' },
  { code: 'KW', value: '965', label: '🇰🇼 +965' },
  { code: 'IN', value: '91', label: '🇮🇳 +91' },
  { code: 'GB', value: '44', label: '🇬🇧 +44' },
  { code: 'US', value: '1', label: '🇺🇸 +1' },
];

const otherCountries = [
  ['DZ', '213', 'Algeria'], ['AD', '376', 'Andorra'], ['AO', '244', 'Angola'], ['AI', '1264', 'Anguilla'], ['AG', '1268', 'Antigua & Barbuda'], ['AR', '54', 'Argentina'], ['AM', '374', 'Armenia'], ['AW', '297', 'Aruba'], ['AU', '61', 'Australia'], ['AT', '43', 'Austria'], ['AZ', '994', 'Azerbaijan'], ['BS', '1242', 'Bahamas'], ['BD', '880', 'Bangladesh'], ['BB', '1246', 'Barbados'], ['BY', '375', 'Belarus'], ['BE', '32', 'Belgium'], ['BZ', '501', 'Belize'], ['BJ', '229', 'Benin'], ['BM', '1441', 'Bermuda'], ['BT', '975', 'Bhutan'], ['BO', '591', 'Bolivia'], ['BA', '387', 'Bosnia Herzegovina'], ['BW', '267', 'Botswana'], ['BR', '55', 'Brazil'], ['BN', '673', 'Brunei'], ['BG', '359', 'Bulgaria'], ['BF', '226', 'Burkina Faso'], ['BI', '257', 'Burundi'], ['KH', '855', 'Cambodia'], ['CM', '237', 'Cameroon'], ['CA', '1', 'Canada'], ['CV', '238', 'Cape Verde Islands'], ['KY', '1345', 'Cayman Islands'], ['CF', '236', 'Central African Republic'], ['CL', '56', 'Chile'], ['CN', '86', 'China'], ['CO', '57', 'Colombia'], ['KM', '269', 'Comoros'], ['CG', '242', 'Congo'], ['CK', '682', 'Cook Islands'], ['CR', '506', 'Costa Rica'], ['HR', '385', 'Croatia'], ['CU', '53', 'Cuba'], ['CY', '90392', 'Cyprus North'], ['CY', '357', 'Cyprus South'], ['CZ', '42', 'Czech Republic'], ['DK', '45', 'Denmark'], ['DJ', '253', 'Djibouti'], ['DM', '1809', 'Dominica'], ['DO', '1809', 'Dominican Republic'], ['EC', '593', 'Ecuador'], ['EG', '20', 'Egypt'], ['SV', '503', 'El Salvador'], ['GQ', '240', 'Equatorial Guinea'], ['ER', '291', 'Eritrea'], ['EE', '372', 'Estonia'], ['ET', '251', 'Ethiopia'], ['FK', '500', 'Falkland Islands'], ['FO', '298', 'Faroe Islands'], ['FJ', '679', 'Fiji'], ['FI', '358', 'Finland'], ['FR', '33', 'France'], ['GF', '594', 'French Guiana'], ['PF', '689', 'French Polynesia'], ['GA', '241', 'Gabon'], ['GM', '220', 'Gambia'], ['GE', '7880', 'Georgia'], ['DE', '49', 'Germany'], ['GH', '233', 'Ghana'], ['GI', '350', 'Gibraltar'], ['GR', '30', 'Greece'], ['GL', '299', 'Greenland'], ['GD', '1473', 'Grenada'], ['GP', '590', 'Guadeloupe'], ['GU', '671', 'Guam'], ['GT', '502', 'Guatemala'], ['GN', '224', 'Guinea'], ['GW', '245', 'Guinea - Bissau'], ['GY', '592', 'Guyana'], ['HT', '509', 'Haiti'], ['HN', '504', 'Honduras'], ['HK', '852', 'Hong Kong'], ['HU', '36', 'Hungary'], ['IS', '354', 'Iceland'], ['ID', '62', 'Indonesia'], ['IR', '98', 'Iran'], ['IQ', '964', 'Iraq'], ['IE', '353', 'Ireland'], ['IL', '972', 'Israel'], ['IT', '39', 'Italy'], ['JM', '1876', 'Jamaica'], ['JP', '81', 'Japan'], ['JO', '962', 'Jordan'], ['KZ', '7', 'Kazakhstan'], ['KE', '254', 'Kenya'], ['KI', '686', 'Kiribati'], ['KP', '850', 'Korea North'], ['KR', '82', 'Korea South'], ['KG', '996', 'Kyrgyzstan'], ['LA', '856', 'Laos'], ['LV', '371', 'Latvia'], ['LB', '961', 'Lebanon'], ['LS', '266', 'Lesotho'], ['LR', '231', 'Liberia'], ['LY', '218', 'Libya'], ['LI', '417', 'Liechtenstein'], ['LT', '370', 'Lithuania'], ['LU', '352', 'Luxembourg'], ['MO', '853', 'Macao'], ['MK', '389', 'Macedonia'], ['MG', '261', 'Madagascar'], ['MW', '265', 'Malawi'], ['MY', '60', 'Malaysia'], ['MV', '960', 'Maldives'], ['ML', '223', 'Mali'], ['MT', '356', 'Malta'], ['MH', '692', 'Marshall Islands'], ['MQ', '596', 'Martinique'], ['MR', '222', 'Mauritania'], ['YT', '269', 'Mayotte'], ['MX', '52', 'Mexico'], ['FM', '691', 'Micronesia'], ['MD', '373', 'Moldova'], ['MC', '377', 'Monaco'], ['MN', '976', 'Mongolia'], ['MS', '1664', 'Montserrat'], ['MA', '212', 'Morocco'], ['MZ', '258', 'Mozambique'], ['MM', '95', 'Myanmar'], ['NA', '264', 'Namibia'], ['NR', '674', 'Nauru'], ['NP', '977', 'Nepal'], ['NL', '31', 'Netherlands'], ['NC', '687', 'New Caledonia'], ['NZ', '64', 'New Zealand'], ['NI', '505', 'Nicaragua'], ['NE', '227', 'Niger'], ['NG', '234', 'Nigeria'], ['NU', '683', 'Niue'], ['NF', '672', 'Norfolk Islands'], ['NP2', '670', 'Northern Marianas'], ['NO', '47', 'Norway'], ['PW', '680', 'Palau'], ['PA', '507', 'Panama'], ['PG', '675', 'Papua New Guinea'], ['PY', '595', 'Paraguay'], ['PE', '51', 'Peru'], ['PH', '63', 'Philippines'], ['PL', '48', 'Poland'], ['PT', '351', 'Portugal'], ['PR', '1787', 'Puerto Rico'], ['RE', '262', 'Reunion'], ['RO', '40', 'Romania'], ['RU', '7', 'Russia'], ['RW', '250', 'Rwanda'], ['SM', '378', 'San Marino'], ['ST', '239', 'Sao Tome & Principe'], ['SN', '221', 'Senegal'], ['CS', '381', 'Serbia'], ['SC', '248', 'Seychelles'], ['SL', '232', 'Sierra Leone'], ['SG', '65', 'Singapore'], ['SK', '421', 'Slovak Republic'], ['SI', '386', 'Slovenia'], ['SB', '677', 'Solomon Islands'], ['SO', '252', 'Somalia'], ['ZA', '27', 'South Africa'], ['ES', '34', 'Spain'], ['LK', '94', 'Sri Lanka'], ['SH', '290', 'St. Helena'], ['KN', '1869', 'St. Kitts'], ['LC', '1758', 'St. Lucia'], ['SD', '249', 'Sudan'], ['SR', '597', 'Suriname'], ['SZ', '268', 'Swaziland'], ['SE', '46', 'Sweden'], ['CH', '41', 'Switzerland'], ['SY', '963', 'Syria'], ['TW', '886', 'Taiwan'], ['TJ', '7', 'Tajikstan'], ['TH', '66', 'Thailand'], ['TG', '228', 'Togo'], ['TO', '676', 'Tonga'], ['TT', '1868', 'Trinidad & Tobago'], ['TN', '216', 'Tunisia'], ['TR', '90', 'Turkey'], ['TM', '993', 'Turkmenistan'], ['TC', '1649', 'Turks & Caicos Islands'], ['TV', '688', 'Tuvalu'], ['UG', '256', 'Uganda'], ['UA', '380', 'Ukraine'], ['UY', '598', 'Uruguay'], ['UZ', '7', 'Uzbekistan'], ['VU', '678', 'Vanuatu'], ['VA', '379', 'Vatican City'], ['VE', '58', 'Venezuela'], ['VN', '84', 'Vietnam'], ['VG', '1284', 'Virgin Islands - British'], ['VI', '1340', 'Virgin Islands - US'], ['WF', '681', 'Wallis & Futuna'], ['YE', '969', 'Yemen (North)'], ['YE2', '967', 'Yemen (South)'], ['ZM', '260', 'Zambia'], ['ZW', '263', 'Zimbabwe']
];

const teamMembers = [
  { name: 'Aamir Khan', role: 'Founder & Strategist', img: '/Team1.png', delay: '0s' },
  { name: 'Najmus Sakuib Khan', role: 'Co-Founder & Media', img: '/Team2.png', delay: '0.06s' },
  { name: 'Vinayraj', role: 'Chief Business Officer', img: '/Team3.png', delay: '0.12s' },
  { name: 'Saad Hashim', role: 'Lead - Sales', img: '/Team4.png', delay: '0.18s' },
  { name: 'Monazir Khan', role: 'Ad-Operations', img: '/Team5.png', delay: '0.24s' },
  { name: 'Arshid Diyan', role: 'Lead - Tech', img: '/Team6.png', delay: '0.3s' },
  { name: 'Jishnu Prakash', role: 'Lead - Digital', img: '/Team7.png', delay: '0.3s' },
  { name: 'Esha', role: 'Graphic Designer', img: '/Team8.png', delay: '0.3s' },
  { name: 'Madeeha Firdose', role: 'Specialist - Digital', img: '/Team9.png', delay: '0.3s' },
];

export default function Home() {
  const canvasRef = useRef(null);
  const marqueeRef = useRef(null);
  const marquee2Ref = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    /* ===== CANVAS PARTICLES ===== */
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w, h;
      const resize = () => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      class Particle {
        constructor(init = false) { this.reset(init); }
        reset(init) {
          this.x = Math.random() * w;
          this.y = init ? Math.random() * h : h + 50;
          this.z = Math.random() * 0.8 + 0.2;
          this.vx = (Math.random() - 0.5) * 1.5 * this.z;
          this.vy = -(Math.random() * 1.5 + 1.0) * this.z;
          this.width = (Math.random() * 12 + 8) * this.z;
          this.height = this.width * 1.4;
          this.angle = Math.random() * Math.PI * 2;
          this.va = (Math.random() - 0.5) * 0.05;
          this.alpha = (Math.random() * 0.5 + 0.1) * this.z;
          this.isLime = Math.random() > 0.5;
        }
        update() {
          this.x += this.vx + Math.sin(this.y * 0.01) * 0.5 * this.z;
          this.y += this.vy;
          this.angle += this.va;
          if (this.y < -50 || this.x < -50 || this.x > w + 50) this.reset(false);
        }
        draw(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          const grad = ctx.createLinearGradient(-this.width / 2, -this.height / 2, this.width / 2, this.height / 2);
          if (this.isLime) {
            grad.addColorStop(0, `rgba(107, 16, 201, ${this.alpha})`);
            grad.addColorStop(1, `rgba(138, 79, 255, ${this.alpha * 0.5})`);
          } else {
            grad.addColorStop(0, `rgba(138, 79, 255, ${this.alpha})`);
            grad.addColorStop(1, `rgba(107, 16, 201, ${this.alpha * 0.5})`);
          }
          ctx.fillStyle = grad;
          ctx.strokeStyle = `rgba(138, 79, 255, ${this.alpha * 1.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, [2, 6, 2, 2]);
          } else {
            ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
          }
          ctx.fill(); ctx.stroke();
          ctx.restore();
        }
      }

      const particles = Array.from({ length: 45 }, () => new Particle(true));
      let animId;
      function anim() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        animId = requestAnimationFrame(anim);
      }
      anim();

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
      };
    }
  }, []);

  useEffect(() => {
    /* ===== MARQUEE ===== */
    const makeBrandHTML = (arr) => arr.map((b) => `<span class="brand">${b}</span><span class="brand-sep">◆</span>`).join('');
    if (marqueeRef.current) marqueeRef.current.innerHTML = makeBrandHTML(brandsRow1) + makeBrandHTML(brandsRow1);
    if (marquee2Ref.current) marquee2Ref.current.innerHTML = makeBrandHTML(brandsRow2) + makeBrandHTML(brandsRow2);

    /* ===== TESTIMONIALS INFINITE SCROLL ===== */
    if (trackRef.current) {
      const content = trackRef.current.innerHTML;
      trackRef.current.innerHTML = content.repeat(8);
    }

    /* ===== REVEAL ON SCROLL ===== */
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => io.observe(el));

    /* ===== COUNT UP WITH EASING ===== */
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
    function runCount(el) {
      const target = +el.dataset.count;
      const suf = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        el.textContent = Math.floor(eased * target) + suf;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
    const cio = new IntersectionObserver(
      (es) => {
        es.forEach((en) => {
          if (en.isIntersecting) {
            runCount(en.target);
            cio.unobserve(en.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));

    /* ===== SERVICE CARD 3D TILT + SPOTLIGHT ===== */
    const isMobile = window.matchMedia('(max-width: 980px)').matches;
    document.querySelectorAll('.svc').forEach((c) => {
      c.addEventListener('mousemove', (e) => {
        const r = c.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px');
        c.style.setProperty('--my', y + 'px');
        if (!isMobile) {
          const centerX = r.width / 2;
          const centerY = r.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;
          c.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      });
      c.addEventListener('mouseleave', () => { c.style.transform = ''; });
    });

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSvcVideoEnter = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) video.play();
  };
  const handleSvcVideoLeave = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) { video.pause(); video.currentTime = 0; }
  };

  return (
    <>
      <ReadingProgress />
      <BookmarkNav />
      <BackgroundEffects />
      <Topbar />
      <Navbar />
      <MobileMenu />

      <main>
        {/* ===== HERO ===== */}
        <section className="hero" id="hero-section">
          <canvas id="heroCanvas" ref={canvasRef}></canvas>
          <div className="wrap hero-grid">
            <div className="reveal">
              <div className="hero-badge">
                <span className="pill">360°</span> A new agency. Thirty years of stories on the shelves.
              </div>
              <h1>
                <span className="word"><em style={{ color: 'var(--lime)' }}>Marketing</em> Isn&apos;t a </span>
                <span className="word">Game of Chance.</span>{' '}
                <span className="word">We Just Make It </span>
                <span className="word" style={{ color: 'var(--lime)' }}>Look Easy.</span>
              </h1>
              <p className="lead">
                <strong>30 years of global precision, packed into one powerhouse UAE agency.</strong><br /><br />
                Most agencies throw ideas at the wall to see what sticks. We don&apos;t guess—we aim, we launch, and we hook the target. With three decades of international expertise, we turn complex 360° marketing into a series of flawless, calculated wins for your brand.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={scrollToContact}>
                  Take the Perfect Shot{' '}
                  <span className="btn-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="hstat">
                  <div className="num" data-count="30" data-suffix="+">0</div>
                  <div className="lbl">Years</div>
                </div>
                <div className="hstat">
                  <div className="num" data-count="100" data-suffix="+">0</div>
                  <div className="lbl">Brands</div>
                </div>
                <div className="hstat">
                  <div className="num" data-count="5" data-suffix="">0</div>
                  <div className="lbl">Continents of chapters</div>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="device">
                <div className="screen">
                  <div className="glin"></div>
                  {/* Service Hotspots */}
                  <div className="hotspot callout-left" style={{ left: '-7.5%', top: '48%', width: '22%', height: '5%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">Media Buying | Global Connectivity</div>
                      <div className="callout-desc">We don&apos;t just buy space; we dominate geography. Leveraging a 30-year global network to position your brand on the world&apos;s most lucrative stages at unmatched rates.</div>
                    </div>
                  </div>
                  <div className="hotspot" style={{ left: '6%', top: '25%', width: '20%', height: '5%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">Social Media | Digital Storytelling</div>
                      <div className="callout-desc">Cultivating communities, stop-scrolling aesthetics, and culture-shaping content. We transform digital noise into meaningful, loyal brand equity.</div>
                    </div>
                  </div>
                  <div className="hotspot" style={{ left: '18%', top: '8%', width: '22%', height: '7%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">Performance Marketing | Data Debut</div>
                      <div className="callout-desc">Hyper-targeted, conversion-obsessed, and ruthlessly optimized. We track the metrics that actually matter to turn your ad spend into pure ROI.</div>
                    </div>
                  </div>
                  <div className="hotspot" style={{ left: '34%', bottom: '17%', width: '20%', height: '5%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">Ad Production | Cinematic Craft</div>
                      <div className="callout-desc">Visuals that command attention. From high-octane commercial productions to thumb-stopping digital assets, we build the premium lens your brand deserves.</div>
                    </div>
                  </div>
                  <div className="hotspot" style={{ left: '65%', bottom: '38%', width: '18%', height: '5%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">Event &amp; OOH | Real-World Brilliance</div>
                      <div className="callout-desc">Immersive brand experiences that break the physical mold. From massive, jaw-dropping outdoor displays across the UAE skyline to premium experiential pop-ups.</div>
                    </div>
                  </div>
                  <div className="hotspot callout-right" style={{ left: '44%', bottom: '52%', width: '28%', height: '5%' }}>
                    <div className="hotspot-zone"></div>
                    <div className="callout">
                      <div className="callout-title">PR &amp; Communication | Public Amplification</div>
                      <div className="callout-desc">Shaping narratives, commanding headlines, and managing reputations. We bridge the gap between your brand and the region&apos;s most influential media voices.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider number="I" />

        {/* ===== ABOUT ===== */}
        <section id="about">
          <div className="wrap about-grid">
            <div className="reveal-left">
              <div className="eyebrow">Vol. 31 · The Catalog</div>
              <h2 className="h-sec">The Spine Is Fresh.<br />The Pages Are <em style={{ fontStyle: 'normal', color: 'var(--lime)' }}>Well-Read.</em></h2>
              <p className="sub">
                We are a 360-degree marketing agency, but we prefer the term &quot;Anthology.&quot; We brought together a league of seasoned industry veterans who grew tired of rigid agency corporate speak.<br /><br />
                For 30+ years, our team members have been the ghostwriters behind some of the biggest brand success stories from New York to Mumbai, and right here in the UAE. We&apos;ve managed the budgets, faced the crisis, and celebrated the launches. Now, we&apos;ve pooled that collective genius under one roof. We&apos;ve read the industry front to back. Let&apos;s write your next chapter.
              </p>
              <blockquote className="lit-quote">
                &quot;Tomorrow is the first blank page of a 365-page book. Write a good one.&quot;
                <span className="cite">— Brad Paisley</span>
              </blockquote>
              <div className="about-pills">
                <div className="about-pill">
                  <div className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg></div>
                  <div className="t">Well-Read</div>
                  <div className="d">30 years of experience, witnessed!</div>
                </div>
                <div className="about-pill">
                  <div className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" /><path d="M16 8 2 22" /><path d="M17.5 15H9" /></svg></div>
                  <div className="t">Original</div>
                  <div className="d">No templates, personalised!</div>
                </div>
                <div className="about-pill">
                  <div className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg></div>
                  <div className="t">Non-Fiction</div>
                  <div className="d">Every penny accountable</div>
                </div>
                <div className="about-pill">
                  <div className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg></div>
                  <div className="t">The Whole Plot</div>
                  <div className="d">Online + real-world, cover to cover</div>
                </div>
              </div>
            </div>
            <div className="reveal-right about-visual" style={{ transitionDelay: '0.12s' }}>
              <div style={{ aspectRatio: '5/4', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--line)' }}>
                <img src="/agency-team.png" alt="TheStriveAds creative team at work" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="est"><small>Collective experience</small><b>30+ yrs</b></div>
            </div>
          </div>
          <div className="footnote reveal" style={{ fontSize: '22px', letterSpacing: '0.08em', color: 'var(--paper-dim)', marginBottom: '10px', fontFamily: 'var(--font-q)', fontStyle: 'italic' }}>
            Penny Wise! Pound Wise!
          </div>
        </section>

        <ChapterDivider number="II" />

        {/* ===== SERVICES ===== */}
        <section id="services">
          <div className="wrap">
            <div className="reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>The Archives</div>
              <h2 className="h-sec">All the Wisdom, <br />Under One Roof.</h2>
              <blockquote className="lit-quote center">
                &quot;The world is full of obvious things which nobody by any chance ever observes.&quot;
                <span className="cite">— Arthur Conan Doyle</span>
              </blockquote>
            </div>
            <h3 className="h-sec reveal" style={{ textAlign: 'center', marginTop: '48px', marginBottom: '8px', fontSize: 'clamp(22px, 3vw, 32px)' }}>Digital Library</h3>
            <div className="bento">
              {/* Service 1 */}
              <div className="svc big reveal-left" onMouseEnter={handleSvcVideoEnter} onMouseLeave={handleSvcVideoLeave} style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}>
                <video src="/service-1.webm" muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'luminosity' }}></video>
                <span className="ribbon"></span>
                <span className="num">SEC. 01</span>
                <div className="page-corner"></div>
                <div className="ico">🛣️</div>
                <div className="shelf">The Bestsellers Section</div>
                <h3>Media Buying &amp; OOH / DOOH</h3>
                <p className="hook">&quot;You can&apos;t judge a book by its cover — but you can judge a brand by its billboard.&quot;</p>
                <p className="sd">From classic outdoor spaces to cutting-edge digital screens across the Emirates, we place your story where the world can&apos;t look away. We buy smart, negotiate hard, and put your brand where it gets the highest readership.</p>
                <div className="chips">
                  <span>DOOH</span><span>Billboards</span><span>Lobby Screens</span><span>Transit</span><span>Media Buying</span><span>Hoardings</span><span>Community branding</span><span>Taxi &amp; Bus branding</span><span>Bus shelters</span><span>Radio</span><span>Newspaper</span><span>Television</span>
                </div>
              </div>
              {/* Service 2 */}
              <div className="svc sm reveal-right" onMouseEnter={handleSvcVideoEnter} onMouseLeave={handleSvcVideoLeave} style={{ transitionDelay: '0.05s', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
                <video src="/service-02.webm" muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'luminosity' }}></video>
                <span className="ribbon"></span>
                <span className="num">SEC. 02</span>
                <div className="page-corner"></div>
                <div className="ico">🚀</div>
                <div className="shelf">The Sci-Fi &amp; Data Wing</div>
                <h3>Social &amp; Performance Marketing</h3>
                <p className="sd">We don&apos;t chase &quot;likes&quot; — that&apos;s fiction. We hunt conversions and ROI — that&apos;s biography. Data-decoded targeting that turns scrolls into sales.</p>
                <div className="chips">
                  <span>Meta</span><span>Google</span><span>SEO</span><span>CRO</span><span>PPC</span><span>SMM</span><span>Performance marketing</span><span>Content marketing</span><span>Social media platforms</span><span>Brand identity</span><span>UI/UX design</span><span>Graphic design</span><span>Video production</span><span>Motion graphics</span>
                </div>
              </div>
              {/* Service 3 */}
              <div className="svc half reveal-left" onMouseEnter={handleSvcVideoEnter} onMouseLeave={handleSvcVideoLeave} style={{ transitionDelay: '0.05s', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
                <video src="/service-3.webm" muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'luminosity' }}></video>
                <span className="ribbon"></span>
                <span className="num">SEC. 03</span>
                <div className="page-corner"></div>
                <div className="ico">🎬</div>
                <div className="shelf">The Drama &amp; Poetry Aisles</div>
                <h3>PR &amp; Ad Production</h3>
                <p className="hook">&quot;There is no greater agony than bearing an untold story inside you.&quot; — Maya Angelou</p>
                <p className="sd">The narrative and the visuals, handled. High-octane video production that stops people in their tracks, and pitches that land your brand with the GCC&apos;s top editors.</p>
                <div className="chips">
                  <span>PR</span><span>Video</span><span>Brand Films</span><span>Influencer</span><span>Media relations</span><span>Influencer marketing</span><span>Reputation management</span>
                </div>
              </div>
              {/* Service 4 */}
              <div className="svc half reveal-right" onMouseEnter={handleSvcVideoEnter} onMouseLeave={handleSvcVideoLeave} style={{ transitionDelay: '0.1s', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
                <video src="/service-4.webm" muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1, opacity: 0.3, pointerEvents: 'none', mixBlendMode: 'luminosity' }}></video>
                <span className="ribbon"></span>
                <span className="num">SEC. 04</span>
                <div className="page-corner"></div>
                <div className="ico">🎤</div>
                <div className="shelf">The Pop-Up Book Section</div>
                <h3>Event Management</h3>
                <p className="hook">&quot;We do not remember days, we remember moments.&quot; — Cesare Pavese</p>
                <p className="sd">Stories brought off the page and into the real world. Immersive corporate launches, MICE, concerts and experiential pop-ups across Dubai and Abu Dhabi — logistics, drama and details handled.</p>
                <div className="chips">
                  <span>Launches</span><span>MICE</span><span>Concerts</span><span>Activations</span><span>Corporate events &amp; Conferences</span><span>Product launches</span><span>Exhibitions &amp; Trade shows</span><span>Gala dinners &amp; award ceremonies</span><span>Activations &amp; roadshows</span><span> MICE</span><span>Sports events</span><span>Concerts</span><span>DJ parties</span><span>Club management</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider number="III" />

        {/* ===== WHY US ===== */}
        <section id="why">
          <div className="wrap">
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
              <div className="reveal" style={{ flex: 1, minWidth: '300px', maxWidth: '760px' }}>
                <div className="eyebrow">The Critique</div>
                <h2 className="h-sec">Why This Book Will<br />Change Your Life.</h2>
                <p className="sub" style={{ maxWidth: '680px' }}>
                  Why work with a new agency? Because the spine may be fresh, but the pages have been written across global networks for three decades. Here&apos;s the honest review.
                </p>
                <blockquote className="lit-quote">
                  &quot;The only thing you absolutely have to know, is the location of the library.&quot;
                  <span className="cite">— Albert Einstein</span>
                </blockquote>
              </div>
              <div className="reveal-right" style={{ flex: 1, minWidth: '300px' }}>
                <img src="/the-critique.png" alt="The Critique" style={{ width: '100%', borderRadius: 'var(--r-md)', border: '1px solid var(--line)', objectFit: 'cover', aspectRatio: '16/9' }} />
              </div>
            </div>
            <div className="why-grid">
              <div className="why reveal">
                <div className="n">I</div>
                <h4>No Rookie Mistakes</h4>
                <p>We&apos;ve already made them — and learned from them — years ago, on someone else&apos;s dime. Your budget funds wins, not lessons.</p>
              </div>
              <div className="why reveal" style={{ transitionDelay: '0.05s' }}>
                <div className="n">II</div>
                <h4>Zero Bureaucracy</h4>
                <p>You talk directly to the authors, not junior account managers. Decisions in hours, not approval chains.</p>
              </div>
              <div className="why reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="n">III</div>
                <h4>The 360° Advantage</h4>
                <p>We don&apos;t just read one page of your business; we study the whole plot — screens, socials, stages and everything between.</p>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider number="IV" />

        {/* ===== BORROWING HISTORY ===== */}
        <section id="borrowing-history" style={{ padding: '72px 0' }}>
          <div className="wrap">
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap' }}>
              <div className="reveal" style={{ flex: 1, minWidth: '300px', maxWidth: '680px' }}>
                <div className="eyebrow">The Index · Borrowing History</div>
                <h2 className="h-sec">Already in Your<br />Daily <em style={{ fontStyle: 'normal', color: 'var(--lime)' }}>Life.</em></h2>
                <p className="sub">
                  Our agency name might be new to your vendor list, but our work is already in your daily life. Over the past 30 years, our team members have designed, managed, and accelerated campaigns for some of the world&apos;s most iconic names.
                </p>
                <blockquote className="lit-quote">
                  &quot;I have partaken of the seafood and went boundlessly impressed.&quot;
                  <span className="cite">— A Meta-Quote on Great Experiences</span>
                </blockquote>
              </div>
              <div className="reveal-right" style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                <img src="/clients.png" alt="Our Clients" style={{ width: '100%', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
          <div className="ticker reveal" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="lbl">The Pages We&apos;ve Written For</div>
            <div className="marquee" id="marquee" ref={marqueeRef}></div>
          </div>
          <div className="ticker reveal" style={{ borderTop: 'none', paddingTop: '12px' }}>
            <div className="marquee marquee-reverse" id="marquee2" ref={marquee2Ref}></div>
            <div className="footnote">
              *Experience gained by our collective team members over 30 years of global agency practice.
            </div>
          </div>

        </section>

        <ChapterDivider number="V" />

        {/* ===== TEAM ===== */}
        <section id="team">
          <div className="wrap">
            <div className="authors-grid reveal">
              <div className="authors-image" style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                <img src="/the-founders.png" alt="The Co-Authors" style={{ width: '100%', display: 'block', objectFit: 'cover', borderRadius: 'var(--r-lg)' }} />
              </div>
              <div className="authors-content">
                <div className="eyebrow" style={{ color: 'var(--amber)' }}>The Co-Authors</div>
                <h2 className="h-sec" style={{ maxWidth: '600px' }}>
                  Meet the Writers<br />Behind the <em style={{ fontStyle: 'normal', color: 'var(--lime)' }}>Wins.</em>
                </h2>
                <p className="sub" style={{ maxWidth: '580px', marginTop: '14px' }}>
                  We aren&apos;t fresh graduates practicing on your budget. Our core team is a collective of seasoned strategists, creative directors, and data nerds who have worked across global networks. We&apos;ve come together because we believe marketing should be less about corporate jargon and more about undeniable impact.
                </p>
              </div>
            </div>
            <div className="reveal" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
              <blockquote className="lit-quote center">
                &quot;Good friends, good books, and a sleepy conscience: this is the ideal life.&quot;
                <span className="cite">— Mark Twain</span>
              </blockquote>
            </div>
            <div className="team-spines" style={{ marginTop: '80px' }}>
              {teamMembers.map((member, i) => {
                const carriImg = member.img.replace('.png', '-carri.png');
                return (
                  <div key={i} className="spine-card reveal" style={{ transitionDelay: member.delay }}>
                    <div className="spine-inner">
                      <div className="spine-front" style={{ border: 'none', padding: '16px' }}>
                        <div className="spine-bg-default" style={{ backgroundImage: `url('${carriImg}')` }}></div>
                        <div className="spine-bg-hover" style={{ backgroundImage: `url('${member.img}')` }}></div>
                        <div className="spine-label">
                          <span className="spine-name">{member.name}</span>
                          <span className="spine-role">{member.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <ChapterDivider number="VI" />

        {/* ===== TESTIMONIALS ===== */}
        <section id="testimonials">
          <div className="wrap">
            <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Reader Reviews</div>
              <h2 className="h-sec">Notes Left in<br />the Margins.</h2>
            </div>
            <div className="marquee-wrapper reveal" style={{ marginTop: '50px' }}>
              <div className="marquee-track" ref={trackRef}>
                <div className="tcard">
                  <div className="stars">★★★★★</div>
                  <div className="quote">&quot;The StriveAds LLC delivered exceptional marketing results for SKR Building Contracting. Their team is professional, highly responsive, and truly understands our industry. We highly recommend their services.&quot;</div>
                  <div className="who">
                    <div className="av">S</div>
                    <div><div className="nm">Saud Khan</div><div className="ro">Procurement Manager, SKR building contracting LLC</div></div>
                  </div>
                </div>
                <div className="tcard">
                  <div className="stars">★★★★★</div>
                  <div className="quote">&quot;The team understands the UAE market deeply. Their <b>DOOH placements</b> gave us visibility we never had before.&quot;</div>
                  <div className="who">
                    <div className="av">R</div>
                    <div><div className="nm">Rajat Pal Singh</div><div className="ro">Growth Manager · Refyne</div></div>
                  </div>
                </div>
                <div className="tcard">
                  <div className="stars">★★★★★</div>
                  <div className="quote">&quot;From branding to performance ads — they handle everything and <b>deliver every time.</b> Truly a one-agency solution.&quot;</div>
                  <div className="who">
                    <div className="av">N</div>
                    <div><div className="nm">Nomair Khan</div><div className="ro">Founder · Shaz Software</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider number="VII" />

        <GlobeLocations />

        <ChapterDivider number="VIII" />

        {/* ===== CONTACT ===== */}
        <section id="contact">
          <div className="wrap">

            <div className="contact-grid">
              <div className="contact-info reveal-left">

                <div className="reveal" style={{ maxWidth: '600px' }}>
                  <div className="eyebrow">The Book Return</div>
                  <h2 className="h-sec">Let's Talk</h2>
                  <blockquote className="lit-quote">
                    &quot;Call me Ishmael.&quot;
                    <span className="cite">— Herman Melville, Moby Dick</span>
                  </blockquote>
                </div>

                <div className="ci">
                  <div className="ic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="t">The Red Telephone</div>
                    <div className="v"><a href="tel:+971509231354" style={{ color: 'inherit', textDecoration: 'none' }}>+971 50 923 1354</a></div>
                  </div>
                </div>
                <div className="ci">
                  <div className="ic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div className="t">Drop a note in the slot</div>
                    <div className="v"><a href="mailto:info@thestriveads.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@thestriveads.com</a></div>
                  </div>
                </div>
                <div className="socials">
                  <a href="https://www.linkedin.com/company/thestriveads/" target="_blank" rel="noopener noreferrer">in</a>
                  <a href="https://www.instagram.com/thestriveads/" target="_blank" rel="noopener noreferrer">ig</a>
                  <a href="https://www.facebook.com/profile.php?id=61589316515631" target="_blank" rel="noopener noreferrer">fb</a>
                  <a href="https://www.youtube.com/channel/UC3Ma4iNkWr78-F_qKfwx7GQ" target="_blank" rel="noopener noreferrer">yt</a>
                </div>
              </div>
              <div className="form reveal-right" style={{ transitionDelay: '0.1s' }}>
                <div className="f-row">
                  <div className="field"><label>Full name</label><input type="text" placeholder="Your name" /></div>
                  <div className="field"><label>Email</label><input type="email" placeholder="you@company.com" /></div>
                </div>
                <div className="f-row">
                  <div className="field">
                    <label>Phone</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select style={{ width: '130px', cursor: 'pointer' }}>
                        {countryOptions.map((c) => (
                          <option key={c.code} data-countrycode={c.code} value={c.value}>{c.label}</option>
                        ))}
                        <optgroup label="Other countries">
                          {otherCountries.map(([code, val, name], idx) => (
                            <option key={`${code}-${idx}`} data-countrycode={code} value={val}>{name} (+{val})</option>
                          ))}
                        </optgroup>
                      </select>
                      <input type="tel" placeholder="050 123 4567" style={{ flex: 1 }} />
                    </div>
                  </div>
                  <div className="field"><label>Company</label><input type="text" placeholder="Brand / company" /></div>
                </div>
                <div className="field">
                  <label>Which section of the archives?</label>
                  <select>
                    <option>Select a section…</option>
                    <option>Media Buying &amp; OOH / DOOH</option>
                    <option>Social &amp; Performance Marketing</option>
                    <option>PR &amp; Ad Production</option>
                    <option>Event Management</option>
                    <option>The whole anthology (360°)</option>
                  </select>
                </div>
                <div className="field"><label>Your story so far</label><textarea placeholder="Tell us about your brand and goals…"></textarea></div>
                <button className="btn btn-primary">
                  Send message{' '}
                  <span className="btn-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CareersModal />
      <WhatsAppFloat />
    </>
  );
}
