import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isUXProject = project.tech.includes('Figma');

  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px rgba(170,133,23,0.25)',
      }}
      transition={{ duration: 0.25 }}
      style={{
        backgroundColor: '#282621',
        border: '1px solid rgba(255,193,7,0.2)',
        borderRadius: 10,
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
      }}
    >
      {/* Badges row */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.2rem 0.7rem',
            borderRadius: 999,
            fontSize: '0.7rem',
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.06em',
            backgroundColor:
              project.status === 'completed'
                ? 'rgba(170,133,23,0.18)'
                : 'rgba(255,149,0,0.15)',
            color: project.status === 'completed' ? '#aa8517' : '#ff9500',
            border: `1px solid ${
              project.status === 'completed'
                ? 'rgba(170,133,23,0.35)'
                : 'rgba(255,149,0,0.3)'
            }`,
          }}
        >
          {project.status === 'completed' ? 'Completed' : 'In Progress'}
        </span>

        {/* UX/UI badge — only for Figma / design projects */}
        {isUXProject && (
          <span
            style={{
              display: 'inline-block',
              padding: '0.2rem 0.7rem',
              borderRadius: 999,
              fontSize: '0.68rem',
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: '0.06em',
              backgroundColor: 'rgba(255,149,0,0.12)',
              color: '#ff9500',
              border: '1px solid rgba(255,149,0,0.3)',
            }}
          >
            UX/UI
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 900,
          fontSize: '1.25rem',
          color: '#ff9500',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: '0.9rem',
          color: '#fff4ca',
          lineHeight: 1.65,
          margin: 0,
          flex: 1,
        }}
      >
        {project.tagline}
      </p>

      {/* Tech badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              fontSize: '0.7rem',
              color: '#aa8517',
              border: '1px solid rgba(170,133,23,0.35)',
              backgroundColor: 'rgba(170,133,23,0.08)',
              padding: '0.15rem 0.55rem',
              borderRadius: 4,
              letterSpacing: '0.03em',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={`/projects/${project.slug}`}
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#aa8517',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          transition: 'color 0.2s',
          marginTop: '0.25rem',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ff9500')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#aa8517')}
      >
        {isUXProject ? 'View UX Case Study →' : 'View Case Study →'}
      </Link>
    </motion.div>
  );
}