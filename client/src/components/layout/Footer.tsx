import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer style={{ background: '#13120f', borderTop: '1px solid rgba(170,133,23,0.12)', padding: '3rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
              <div style={{ width: 30, height: 30, background: '#aa8517', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Russo One', sans-serif", fontWeight: 900, fontSize: 15 }}>S</div>
              <span style={{ color: '#aa8517', fontWeight: 900, fontSize: 16, fontFamily: "'Public Sans', sans-serif" }}>Siddhesh Shinde</span>
            </div>
            <p style={{ color: '#fff4ca', fontSize: 13, lineHeight: 1.7, maxWidth: 240 }}>
              Creative Technologist · AI Engineer · Backend Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ff9500', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/experience', 'Experience'], ['/contact', 'Contact']].map(([to, label]) => (
                <Link key={to} to={to} style={{ color: '#f3e8d8', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#f3e8d8')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ color: '#ff9500', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:siddhesh.shinde23@spit.ac.in" style={{ color: '#aa8517', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#aa8517')}
              >
                siddhesh.shinde23@spit.ac.in
              </a>
              <div style={{ display: 'flex', gap: 12 }}>
                {/* GitHub */}
                <motion.a whileHover={{ y: -2 }} href="https://github.com/siddheshshinde" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#f3e8d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#f3e8d8')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </motion.a>
                {/* LinkedIn */}
                <motion.a whileHover={{ y: -2 }} href="https://linkedin.com/in/siddhesh-shinde" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#f3e8d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#f3e8d8')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(170,133,23,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: '#f3e8d8', fontSize: 13 }}>© 2025 Siddhesh Shinde. All rights reserved.</p>
          <p style={{ color: '#aa8517', fontSize: 13 }}>Designed with Precision · Built with Passion</p>
        </div>
      </div>
    </footer>
  );
}
