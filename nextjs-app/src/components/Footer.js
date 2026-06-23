'use client';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="logo"><img src="/logo-footer.png" alt="Strive Ads" /></a>
            <p>
              30 Years of Culture-Shaping, Volume I.<br/>
               We've spent three decades tracking the pulse of global hubs from NY to Mumbai and Dubai.
              We don't just build campaigns; we curate a living library of human experiences, turning the rhythm of the city into the voice of your brand. 
            </p>
          </div>
          <div className="foot-col">
            <h5>The Archives</h5>
            <a href="#services">Media Buying &amp; OOH/DOOH</a>
            <a href="#services">Social &amp; Performance</a>
            <a href="#services">PR &amp; Ad Production</a>
            <a href="#services">Event Management</a>
          </div>
          <div className="foot-col">
            <h5>The Library</h5>
            <a href="#about">The Catalog</a>
            <a href="#compare">The Authors</a>
            <a href="#work">How We Write</a>
            <a href="#testimonials">Reader Reviews</a>
            <a href="#contact">Inquiries</a>
            <a
              href="#"
              className="open-careers"
              style={{ color: 'var(--amber)' }}
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined' && window.__openCareersModal) {
                  window.__openCareersModal();
                }
              }}
            >
              Careers
            </a>
          </div>
          <div className="foot-col">
            <h5>Get in touch</h5>
            <a href="tel:+971509231354">+971 509 231 354</a>
            <a href="mailto:info@thestriveads.com">info@thestriveads.com</a>
            <a href="#">Business Bay, Dubai, UAE</a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.328718265432!2d55.28208297521118!3d25.192134677714254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f694e22e03097%3A0x4a74fd25b55289b6!2sEmpire%20Heights%20Business%20Centre!5e0!3m2!1sen!2sin!4v1781540956258!5m2!1sen!2sin"
              style={{ width: '100%', height: '120px', border: 0, borderRadius: '12px', marginTop: '14px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2025 TheStriveAds. All rights reserved.</span>
          <span>
            <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
