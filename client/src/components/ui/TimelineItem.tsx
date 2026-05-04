import { motion } from 'motion/react';
import type { Experience } from '@/types';

interface Props {
  experience: Experience;
  isLast?: boolean;
}

const typeColors: Record<string, string> = {
  leadership: '#ff9500',
  academic: '#aa8517',
  creative: '#c67c2a',
  technical: '#7cb5aa',
};

const typeLabels: Record<string, string> = {
  leadership: 'Leadership',
  academic: 'Education',
  creative: 'Creative',
  technical: 'Technical',
};

export default function TimelineItem({ experience, isLast = false }: Props) {
  const accent = typeColors[experience.type] || '#aa8517';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}
    >
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: accent,
          border: `3px solid #1d1b18`,
          boxShadow: `0 0 12px ${accent}80`,
          zIndex: 1,
          marginTop: 4,
          flexShrink: 0,
        }} />
        {!isLast && (
          <div style={{ width: 2, flex: 1, background: 'rgba(170,133,23,0.25)', marginTop: 4, minHeight: 40 }} />
        )}
      </div>

      {/* Content */}
      <div style={{
        background: '#282621',
        border: `1px solid rgba(255,193,7,0.15)`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: isLast ? 0 : '2rem',
        flex: 1,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              background: `${accent}20`,
              color: accent,
              border: `1px solid ${accent}50`,
              borderRadius: 20,
              padding: '2px 10px',
              fontSize: 12,
              fontWeight: 700,
            }}>
              {typeLabels[experience.type] || experience.type}
            </span>
          </div>
          <span style={{
            background: 'rgba(255,193,7,0.12)',
            color: '#aa8517',
            borderRadius: 20,
            padding: '2px 12px',
            fontSize: 13,
            fontWeight: 700,
          }}>
            {experience.period}
          </span>
        </div>

        <h3 style={{ color: '#ff9500', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{experience.title}</h3>
        <p style={{ color: '#aa8517', fontWeight: 600, fontSize: 14, marginBottom: '0.75rem' }}>{experience.organization}</p>
        <p style={{ color: '#fff4ca', lineHeight: 1.7, fontSize: 15, marginBottom: '1rem' }}>{experience.description}</p>

        {experience.impact.length > 0 && (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {experience.impact.map((item, i) => (
              <li key={i} style={{ color: '#f3e8d8', fontSize: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: accent, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
