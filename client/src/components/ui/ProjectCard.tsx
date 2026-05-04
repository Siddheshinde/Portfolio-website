import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { Project } from '@/types';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(170,133,23,0.25)' }}
      transition={{ duration: 0.25 }}
      style={{
        background: '#282621',
        border: '1px solid rgba(255,193,7,0.15)',
        borderRadius: 12,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gold top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #aa8517, transparent)' }} />

      {/* Status badge */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <span style={{
          background: project.status === 'in-progress' ? 'rgba(255,149,0,0.15)' : 'rgba(170,133,23,0.15)',
          color: project.status === 'in-progress' ? '#ff9500' : '#aa8517',
          border: `1px solid ${project.status === 'in-progress' ? 'rgba(255,149,0,0.3)' : 'rgba(170,133,23,0.3)'}`,
          borderRadius: 20,
          padding: '2px 12px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          {project.status === 'in-progress' ? 'In Progress' : 'Completed'}
        </span>
      </div>

      <h3 style={{ color: '#ff9500', fontWeight: 900, fontSize: 20, marginBottom: 8, fontFamily: "'Public Sans', sans-serif", lineHeight: 1.3 }}>
        {project.title}
      </h3>
      <p style={{ color: '#f3e8d8', fontSize: 14, lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
        {project.tagline}
      </p>

      {/* Tech badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} style={{
            background: '#1d1b18',
            border: '1px solid rgba(255,193,7,0.2)',
            color: '#ff9500',
            borderRadius: 6,
            padding: '2px 10px',
            fontSize: 12,
            fontWeight: 700,
          }}>
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span style={{ color: '#aa8517', fontSize: 12, alignSelf: 'center' }}>+{project.tech.length - 4} more</span>
        )}
      </div>

      <Link
        to={`/projects/${project.slug}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#aa8517',
          fontWeight: 700,
          fontSize: 14,
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#ff9500')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#aa8517')}
      >
        View Case Study →
      </Link>
    </motion.div>
  );
}
