import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const activeLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#ff9500' : '#f3e8d8',
    fontWeight: 600,
    fontSize: 14,
    textDecoration: 'none',
    fontFamily: "'Public Sans', sans-serif",
    transition: 'color 0.2s',
  } as React.CSSProperties);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          background: scrolled ? 'rgba(13,12,10,0.92)' : 'rgba(13,12,10,0.75)',
          borderBottom: '1px solid rgba(170,133,23,0.1)',
          transition: 'background 0.3s',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, background: '#aa8517', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Russo One', sans-serif", color: '#fff', fontSize: 16, fontWeight: 900,
            }}>
              S
            </div>
            <span style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 900, color: '#ff9500', fontSize: 16, letterSpacing: '-0.3px' }}>
              Siddhesh Shinde
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={activeLinkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                onMouseOut={(e) => {
                  const active = e.currentTarget.getAttribute('aria-current') === 'page';
                  e.currentTarget.style.color = active ? '#ff9500' : '#f3e8d8';
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="#"
              style={{
                background: '#aa8517',
                color: '#fff',
                padding: '7px 20px',
                borderRadius: 4,
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
                letterSpacing: '0.5px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#8a6a12')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#aa8517')}
            >
              RESUME
            </a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="show-mobile"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              display: 'none',
            }}
          >
            <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', height: 2, background: '#ff9500', borderRadius: 2 }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', height: 2, background: '#ff9500', borderRadius: 2 }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', height: 2, background: '#ff9500', borderRadius: 2 }} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: '#1d1b18', zIndex: 99,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
            }}
          >
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: '#ff9500', fontSize: 28, cursor: 'pointer' }}>✕</button>
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? '#ff9500' : '#f3e8d8',
                    fontFamily: "'Russo One', sans-serif",
                    fontSize: 28,
                    textDecoration: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div style={{ height: 64 }} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
