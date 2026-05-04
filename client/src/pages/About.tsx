import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useApi } from '@/hooks/useApi';
import { fetchAboutData } from '@/api';
import SkillBar from '@/components/ui/SkillBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { SkillCategories } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const FALLBACK_SKILLS: SkillCategories = {
  languages: [
    { name: 'Python', level: 90 }, { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 }, { name: 'C++', level: 70 },
    { name: 'PHP', level: 65 }, { name: 'SQL', level: 82 },
  ],
  backend: [
    { name: 'Node.js', level: 85 }, { name: 'Express.js', level: 85 },
    { name: 'Flask', level: 80 }, { name: 'REST API Design', level: 90 },
    { name: 'FastAPI', level: 70 },
  ],
  ml: [
    { name: 'YOLOv8 / Computer Vision', level: 85 }, { name: 'TensorFlow / PyTorch', level: 75 },
    { name: 'Scikit-learn', level: 82 }, { name: 'Feature Engineering', level: 80 },
    { name: 'Data Processing', level: 88 },
  ],
  frontend: [
    { name: 'React', level: 85 }, { name: 'React Native', level: 75 },
    { name: 'Tailwind CSS', level: 90 }, { name: 'Framer Motion', level: 80 },
    { name: 'Next.js', level: 75 },
  ],
  databases: [
    { name: 'MongoDB', level: 82 }, { name: 'MySQL / PostgreSQL', level: 80 },
    { name: 'SQLite', level: 75 }, { name: 'Firebase', level: 80 },
    { name: 'Redis', level: 65 },
  ],
  tools: [
    { name: 'Git / GitHub', level: 92 }, { name: 'Docker', level: 70 },
    { name: 'Roboflow', level: 85 }, { name: 'Streamlit', level: 82 },
    { name: 'Vercel / Render', level: 80 },
  ],
};

const SKILL_CATEGORY_LABELS: Record<keyof SkillCategories, string> = {
  languages: 'Languages',
  backend: 'Backend',
  ml: 'ML / AI',
  frontend: 'Frontend',
  databases: 'Databases',
  tools: 'Tools & DevOps',
};

const JOURNEY = [
  { year: '2021', event: 'Joined SPIT CS', detail: 'Discovered a passion for building systems through DSA. Started with C++, moved to web.' },
  { year: '2022', event: 'Citation Detection System', detail: 'First real backend project. Learned that good architecture is about data flow, not just endpoints.' },
  { year: '2023', event: 'NutriLens — First ML Product', detail: 'Trained YOLOv8 on Indian food, built Flask API, integrated with React Native. 89.4% mAP@50.' },
  { year: '2024', event: 'Oculus Festival Director', detail: 'Led 100+ member team, 3,000+ attendees. Learned that leadership is systems design for people.' },
];

const CURRENTLY_FOCUSED = [
  'Backend system design & clean API architecture',
  'DSA execution speed & pattern recognition',
  'System design fundamentals (distributed systems)',
  'DBMS and Computer Networks depth',
  'Building production-grade ML pipelines',
];

type TabKey = keyof SkillCategories;

export default function About() {
  const [activeTab, setActiveTab] = useState<TabKey>('languages');
  const { data, loading } = useApi(() => fetchAboutData(), []);

  const skills: SkillCategories = data?.skills ?? FALLBACK_SKILLS;

  useEffect(() => {
    document.title = 'About — Siddhesh Shinde';
  }, []);

  return (
    <div style={{ background: '#1d1b18', paddingBottom: '6rem' }}>
      {/* Header */}
      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <h1 style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 12 }}>About Me</h1>
          <div style={{ width: 64, height: 3, background: '#aa8517', borderRadius: 4, margin: '0 auto 1.5rem' }} />
          <p style={{ color: '#f3e8d8', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            Engineer by craft, creative by nature. I build things that work and things that matter.
          </p>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 2rem' }}>
        {/* Who I Am */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} style={{ marginBottom: '5rem' }}>
          <motion.div variants={fadeUp} style={{ background: '#282621', border: '1px solid rgba(255,193,7,0.12)', borderRadius: 12, padding: '2.5rem' }}>
            <h2 style={{ color: '#ff9500', fontWeight: 900, fontSize: 22, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#aa8517' }}>01.</span> Who I Am
            </h2>
            <p style={{ color: '#fff4ca', fontSize: 16, lineHeight: 1.85, marginBottom: '1rem' }}>
              I'm <strong style={{ color: '#ff9500' }}>Siddhesh Shinde</strong>, a Computer Science student at Sardar Patel Institute of Technology, Mumbai (Graduating 2025). I build at the intersection of backend engineering, machine learning, and creative technology.
            </p>
            <p style={{ color: '#fff4ca', fontSize: 16, lineHeight: 1.85 }}>
              My work spans from training custom computer vision models and designing REST APIs, to building festival brand identities and leading 100+ member cross-functional teams. I believe the best engineers understand both systems and people — and that every technical decision has a human impact.
            </p>
          </motion.div>
        </motion.section>

        {/* My Journey */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: '5rem' }}>
          <motion.h2 variants={fadeUp} style={{ color: '#ff9500', fontWeight: 900, fontSize: 22, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#aa8517' }}>02.</span> My Journey
          </motion.h2>
          <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, background: 'rgba(170,133,23,0.2)' }} />
            {JOURNEY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ position: 'relative', paddingBottom: i < JOURNEY.length - 1 ? '2rem' : 0 }}
              >
                <div style={{ position: 'absolute', left: -29, top: 4, width: 12, height: 12, borderRadius: '50%', background: '#aa8517', border: '3px solid #1d1b18', boxShadow: '0 0 10px rgba(170,133,23,0.5)' }} />
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(255,149,0,0.12)', color: '#ff9500', border: '1px solid rgba(255,149,0,0.3)', borderRadius: 20, padding: '2px 12px', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{item.year}</span>
                  <div>
                    <p style={{ color: '#ff9500', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{item.event}</p>
                    <p style={{ color: '#f3e8d8', fontSize: 14, lineHeight: 1.65 }}>{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }} style={{ marginBottom: '5rem' }}>
          <motion.h2 variants={fadeUp} style={{ color: '#ff9500', fontWeight: 900, fontSize: 22, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#aa8517' }}>03.</span> Skills
            {loading && <LoadingSpinner size="sm" />}
          </motion.h2>

          {/* Tabs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
            {(Object.keys(SKILL_CATEGORY_LABELS) as TabKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  background: activeTab === key ? '#aa8517' : '#282621',
                  color: activeTab === key ? '#fff' : '#f3e8d8',
                  border: `1px solid ${activeTab === key ? '#aa8517' : 'rgba(255,193,7,0.2)'}`,
                  borderRadius: 20,
                  padding: '6px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Public Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { if (activeTab !== key) e.currentTarget.style.borderColor = '#aa8517'; }}
                onMouseOut={(e) => { if (activeTab !== key) e.currentTarget.style.borderColor = 'rgba(255,193,7,0.2)'; }}
              >
                {SKILL_CATEGORY_LABELS[key]}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: '#282621', border: '1px solid rgba(255,193,7,0.12)', borderRadius: 12, padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0 3rem' }}
          >
            {(skills[activeTab] ?? []).map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </motion.div>
        </motion.section>

        {/* Currently Focused */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}>
          <motion.h2 variants={fadeUp} style={{ color: '#ff9500', fontWeight: 900, fontSize: 22, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#aa8517' }}>04.</span> What I'm Currently Improving
          </motion.h2>
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {CURRENTLY_FOCUSED.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ background: '#282621', border: '1px solid rgba(255,193,7,0.12)', borderLeft: '3px solid #aa8517', borderRadius: 8, padding: '1rem 1.25rem', display: 'flex', gap: 10, alignItems: 'flex-start' }}
              >
                <span style={{ color: '#ff9500', fontSize: 16, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ color: '#fff4ca', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
