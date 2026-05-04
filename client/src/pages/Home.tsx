import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = { animate: { transition: { staggerChildren: 0.12 } } };

const FEATURED_PROJECTS = [
  {
    slug: 'nutrilens',
    title: 'NutriLens',
    tagline: 'AI system that recognizes Indian food and tracks nutrition with 89.4% accuracy.',
    tech: ['Python', 'YOLOv8', 'Flask'],
    status: 'completed' as const,
  },
  {
    slug: 'citation-detection',
    title: 'Citation Detection System',
    tagline: 'Backend pipeline for web scraping and citation extraction from AI responses.',
    tech: ['Node.js', 'Cheerio', 'SQLite'],
    status: 'completed' as const,
  },
  {
    slug: 'ai-image-catalog',
    title: 'AI Image Catalog',
    tagline: 'Scalable AI pipeline for bulk image classification and semantic retrieval.',
    tech: ['Python', 'TensorFlow', 'FastAPI'],
    status: 'in-progress' as const,
  },
];

const WHAT_I_BUILD = [
  {
    title: 'Full-Stack Platforms',
    description: 'Scalable web and mobile systems using React, Node.js, MongoDB, and REST APIs. From architecture to deployment.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aa8517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'AI Applications',
    description: 'Computer vision pipelines, ML models, and intelligent systems. YOLOv8, TensorFlow, Flask, feature engineering.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aa8517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Creative Experiences',
    description: 'Digital brand identities, Blender 3D renders, motion graphics, and festival-scale event production.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aa8517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function Home() {
  useEffect(() => {
    document.title = 'Siddhesh Shinde — Creative Technologist & AI Engineer';
  }, []);

  return (
    <div style={{ background: '#1d1b18' }}>
      {/* ── Hero ── */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(170,133,23,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          style={{ maxWidth: 900, width: '100%', position: 'relative', zIndex: 1 }}
        >
          <motion.p variants={fadeUp} style={{ color: '#aa8517', fontWeight: 700, fontSize: 13, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Creative Technologist / AI Engineer / Backend Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Russo One', sans-serif",
              color: '#ff9500',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '1.5rem',
            }}
          >
            I build scalable systems,<br />
            AI-driven products, and<br />
            meaningful digital experiences.
          </motion.h1>

          <motion.p variants={fadeUp} style={{ color: '#fff4ca', fontSize: 18, lineHeight: 1.75, maxWidth: 560, marginBottom: '2.5rem' }}>
            Full Stack Developer based in Mumbai — crafting everything from computer vision pipelines to interactive web experiences that scale.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(170,133,23,0.4)' }} whileTap={{ scale: 0.96 }}>
              <Link to="/projects" style={{
                display: 'inline-block',
                background: '#aa8517',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 4,
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 900,
                fontSize: 14,
                textDecoration: 'none',
                letterSpacing: '0.5px',
                transition: 'background 0.2s',
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#8a6a12')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#aa8517')}
              >
                VIEW PROJECTS →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contact" style={{
                display: 'inline-block',
                border: '2px solid rgba(255,149,0,0.35)',
                color: '#ff9500',
                padding: '12px 32px',
                borderRadius: 4,
                fontFamily: "'Public Sans', sans-serif",
                fontWeight: 900,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s',
              }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,149,0,0.08)'; e.currentTarget.style.borderColor = '#ff9500'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,149,0,0.35)'; }}
              >
                CONTACT ME
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ background: '#282621', borderTop: '1px solid rgba(170,133,23,0.1)', borderBottom: '1px solid rgba(170,133,23,0.1)', padding: '1.5rem 2rem' }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
          {[['5', 'Projects Built'], ['270+', 'DSA Problems Solved'], ['3,000+', 'Festival Attendees Led']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: 28 }}>{num}</div>
              <div style={{ color: '#f3e8d8', fontSize: 13, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── What I Build ── */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1060, margin: '0 auto' }}>
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 900, color: '#ff9500', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textTransform: 'uppercase', marginBottom: 12 }}>
              What I Build
            </h2>
            <div style={{ width: 64, height: 3, background: '#aa8517', borderRadius: 4, margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {WHAT_I_BUILD.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(170,133,23,0.2)' }}
                style={{
                  background: '#282621',
                  border: '1px solid rgba(255,193,7,0.12)',
                  borderRadius: 12,
                  padding: '2rem',
                  cursor: 'default',
                  transition: 'border-color 0.2s',
                }}
                onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,193,7,0.3)')}
                onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,193,7,0.12)')}
              >
                <div style={{ width: 52, height: 52, background: 'rgba(170,133,23,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ color: '#ff9500', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#fff4ca', fontSize: 14, lineHeight: 1.7 }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Featured Projects ── */}
      <section style={{ background: 'rgba(97,85,50,0.05)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: '3rem' }}>
              <div>
                <h2 style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 900, color: '#ff9500', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textTransform: 'uppercase' }}>Featured Work</h2>
                <p style={{ color: '#fff4ca', marginTop: 6 }}>Turning complex problems into elegant systems.</p>
              </div>
              <Link to="/projects" style={{ color: '#aa8517', fontWeight: 700, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#aa8517')}
              >
                ALL PROJECTS →
              </Link>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {FEATURED_PROJECTS.map((p, i) => (
                <motion.div
                  key={p.slug}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(170,133,23,0.22)' }}
                  style={{ background: '#282621', border: '1px solid rgba(255,193,7,0.15)', borderRadius: 12, padding: '1.75rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #aa8517, transparent)' }} />
                  <span style={{ alignSelf: 'flex-end', background: p.status === 'in-progress' ? 'rgba(255,149,0,0.12)' : 'rgba(170,133,23,0.12)', color: p.status === 'in-progress' ? '#ff9500' : '#aa8517', border: `1px solid ${p.status === 'in-progress' ? 'rgba(255,149,0,0.3)' : 'rgba(170,133,23,0.3)'}`, borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
                    {p.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                  <h3 style={{ color: '#ff9500', fontWeight: 900, fontSize: 19, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#f3e8d8', fontSize: 14, lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{p.tagline}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ background: '#1d1b18', border: '1px solid rgba(255,193,7,0.2)', color: '#ff9500', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{t}</span>
                    ))}
                  </div>
                  <Link to={`/projects/${p.slug}`} style={{ color: '#aa8517', fontWeight: 700, fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#aa8517')}
                  >
                    View Case Study →
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Current Focus ── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ background: '#282621', border: '1px solid rgba(255,193,7,0.15)', borderLeft: '4px solid #aa8517', borderRadius: 12, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <p style={{ color: '#aa8517', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>Currently Building</p>
                <h3 style={{ color: '#ff9500', fontWeight: 900, fontSize: 22 }}>AI Image Catalog Processing System</h3>
                <p style={{ color: '#fff4ca', marginTop: 8, lineHeight: 1.7 }}>A production-grade pipeline that processes large image datasets using AI for classification, organization, and semantic retrieval at scale.</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Docker'].map((t) => (
                  <span key={t} style={{ background: '#1d1b18', border: '1px solid rgba(255,193,7,0.2)', color: '#ff9500', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 24, paddingTop: '0.5rem', borderTop: '1px solid rgba(255,193,7,0.1)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9500', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  <span style={{ color: '#f3e8d8', fontSize: 13 }}>Active development</span>
                </div>
                <div style={{ color: '#aa8517', fontSize: 13, fontWeight: 600 }}>270+ DSA problems solved — always sharpening</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
