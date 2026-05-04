import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useApi } from '@/hooks/useApi';
import { fetchAboutData } from '@/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { Experience as ExperienceType } from '@/types';

const fallbackExperience: ExperienceType[] = [
  {
    _id: '1',
    title: 'Festival Director',
    organization: 'Oculus — SPIT Cultural Festival',
    period: '2023 – 2024',
    type: 'leadership',
    description:
      "Led the full organization of Oculus, SPIT's largest annual cultural festival. Coordinated 100+ member team across technical, creative, logistics, and PR divisions. Responsible for end-to-end event planning, sponsor coordination, budget management, and live execution.",
    impact: [
      '3,000+ attendees across 3 days',
      '100+ member cross-functional team',
      'Complete festival brand identity',
      'Sponsor acquisition and coordination',
      'Zero critical incidents',
    ],
    order: 1,
  },
  {
    _id: '2',
    title: 'B.Tech Computer Science Engineering',
    organization: 'Sardar Patel Institute of Technology, Mumbai',
    period: '2021 – 2025',
    type: 'academic',
    description:
      'Bachelor of Technology in Computer Science. Focus: DSA, Machine Learning, Database Management Systems, Operating Systems, Computer Networks, Web Technologies.',
    impact: [
      '270+ DSA problems solved',
      'ML specialization with real deployments',
      'Full-stack development proficiency',
      'Strong OS, DBMS, CN fundamentals',
    ],
    order: 2,
  },
  {
    _id: '3',
    title: 'Creative Director',
    organization: 'SPIT Design & Media Cell',
    period: '2022 – 2024',
    type: 'creative',
    description:
      'Headed creative and visual direction for college events and the Oculus festival. Produced complete brand systems from typography and color palettes to motion graphics and 3D assets.',
    impact: [
      'Festival branding for 2023-24 events',
      'Poster suite for 10+ events',
      'Blender 3D renders for promotional content',
      'Motion graphics for social media',
    ],
    order: 3,
  },
];

const typeBadgeColor: Record<ExperienceType['type'], string> = {
  leadership: '#aa8517',
  academic: '#ff9500',
  creative: '#c084fc',
  technical: '#34d399',
};

const typeLabel: Record<ExperienceType['type'], string> = {
  leadership: 'Leadership',
  academic: 'Academic',
  creative: 'Creative',
  technical: 'Technical',
};

const improvingItems = [
  'Backend system design',
  'Clean, scalable API design',
  'DSA execution speed',
  'System design fundamentals',
  'DBMS and CN depth',
];

export default function Experience() {
  const { data, loading, error } = useApi(() => fetchAboutData(), []);

  useEffect(() => {
    document.title = 'Experience | Siddhesh Shinde';
  }, []);

  const experience: ExperienceType[] =
    data?.experience ?? fallbackExperience;

  const sorted = [...experience].sort((a, b) => a.order - b.order);

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div
      style={{
        backgroundColor: '#1d1b18',
        minHeight: '100vh',
        padding: '4rem 1.5rem 5rem',
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '1rem', textAlign: 'center' }}
        >
          <h1
            style={{
              fontFamily: "'Russo One', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#ff9500',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Experience & Achievements
          </h1>
          {/* Gold underline */}
          <div
            style={{
              width: 80,
              height: 3,
              backgroundColor: '#aa8517',
              margin: '1rem auto 0',
              borderRadius: 2,
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            color: '#f3e8d8',
            fontSize: '1rem',
            textAlign: 'center',
            lineHeight: 1.7,
            marginTop: '1.25rem',
            marginBottom: '4rem',
            opacity: 0.8,
          }}
        >
          From leading festival teams to training ML models — every role has shaped how I
          think about systems and people.
        </motion.p>

        {error && (
          <p
            style={{
              color: '#aa8517',
              fontSize: '0.8rem',
              textAlign: 'center',
              marginBottom: '2rem',
              opacity: 0.65,
            }}
          >
            Demo mode — showing local data
          </p>
        )}

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical gold line */}
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 8,
              bottom: 8,
              width: 2,
              backgroundColor: 'rgba(170,133,23,0.3)',
              borderRadius: 1,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sorted.map((item, index) => (
              <TimelineEntry key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* DSA Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '4rem',
            backgroundColor: '#282621',
            border: '1px solid rgba(255,193,7,0.2)',
            borderRadius: 12,
            padding: '2rem',
          }}
        >
          <h2
            style={{
              fontFamily: "'Russo One', sans-serif",
              color: '#ff9500',
              fontSize: '1.4rem',
              margin: '0 0 1.25rem',
            }}
          >
            Problem Solving & DSA
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: '3rem',
                color: '#aa8517',
                lineHeight: 1,
              }}
            >
              270+
            </span>
            <span style={{ color: '#f3e8d8', fontSize: '1rem', opacity: 0.8 }}>
              problems solved
            </span>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <p
              style={{
                color: '#f3e8d8',
                fontSize: '0.85rem',
                margin: '0 0 0.75rem',
                opacity: 0.65,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
            >
              Topics
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'Arrays',
                'Binary Search',
                'Hashing',
                'Trees',
                'Sliding Window',
                'Sorting',
              ].map((topic) => (
                <span
                  key={topic}
                  style={{
                    backgroundColor: 'rgba(170,133,23,0.12)',
                    border: '1px solid rgba(170,133,23,0.35)',
                    color: '#aa8517',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    padding: '3px 12px',
                    borderRadius: 999,
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <p
            style={{
              color: '#ff9500',
              fontSize: '0.88rem',
              fontStyle: 'italic',
              margin: 0,
              opacity: 0.85,
            }}
          >
            Focus: Pattern recognition over quantity
          </p>
        </motion.div>

        {/* Currently Improving */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '2.5rem' }}
        >
          <h2
            style={{
              fontFamily: "'Russo One', sans-serif",
              color: '#ff9500',
              fontSize: '1.4rem',
              margin: '0 0 1.5rem',
            }}
          >
            Currently Improving
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '0.85rem',
            }}
          >
            {improvingItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  backgroundColor: '#282621',
                  border: '1px solid rgba(255,193,7,0.2)',
                  borderRadius: 8,
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                }}
              >
                <span style={{ color: '#aa8517', fontWeight: 700, flexShrink: 0 }}>
                  &rarr;
                </span>
                <span style={{ color: '#f3e8d8', fontSize: '0.9rem', lineHeight: 1.4 }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TimelineEntry({
  item,
  index,
}: {
  item: ExperienceType;
  index: number;
}) {
  const isLeadership = item.type === 'leadership';
  const badgeColor = typeBadgeColor[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ position: 'relative' }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: -32,
          top: 8,
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: isLeadership ? '#aa8517' : '#282621',
          border: `2px solid ${isLeadership ? '#aa8517' : 'rgba(170,133,23,0.5)'}`,
          boxShadow: isLeadership ? '0 0 12px rgba(170,133,23,0.5)' : 'none',
          zIndex: 1,
        }}
      />

      {/* Card */}
      <div
        style={{
          backgroundColor: isLeadership ? 'rgba(40,38,33,1)' : '#282621',
          border: isLeadership
            ? '1px solid rgba(170,133,23,0.5)'
            : '1px solid rgba(255,193,7,0.2)',
          borderLeft: isLeadership ? '3px solid #aa8517' : '1px solid rgba(255,193,7,0.2)',
          borderRadius: 12,
          padding: isLeadership ? '1.75rem' : '1.5rem',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}
        >
          {/* Period badge */}
          <span
            style={{
              backgroundColor: 'rgba(170,133,23,0.15)',
              border: '1px solid rgba(170,133,23,0.35)',
              color: '#aa8517',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '2px 10px',
              borderRadius: 999,
              letterSpacing: '0.04em',
            }}
          >
            {item.period}
          </span>
          {/* Type badge */}
          <span
            style={{
              backgroundColor: `${badgeColor}18`,
              border: `1px solid ${badgeColor}55`,
              color: badgeColor,
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 10px',
              borderRadius: 999,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {typeLabel[item.type]}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            color: '#ff9500',
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 700,
            fontSize: isLeadership ? '1.2rem' : '1.05rem',
            margin: '0 0 0.2rem',
          }}
        >
          {item.title}
        </h3>

        {/* Organization */}
        <p
          style={{
            color: '#aa8517',
            fontSize: '0.9rem',
            fontWeight: 600,
            margin: '0 0 0.85rem',
          }}
        >
          {item.organization}
        </p>

        {/* Description */}
        <p
          style={{
            color: '#f3e8d8',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            margin: '0 0 1rem',
            opacity: 0.85,
          }}
        >
          {item.description}
        </p>

        {/* Impact list */}
        {item.impact.length > 0 && (
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {item.impact.map((imp, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  alignItems: 'flex-start',
                  color: '#f3e8d8',
                  fontSize: '0.875rem',
                  opacity: 0.85,
                }}
              >
                <span style={{ color: '#aa8517', fontWeight: 700, flexShrink: 0 }}>
                  ✓
                </span>
                {imp}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
