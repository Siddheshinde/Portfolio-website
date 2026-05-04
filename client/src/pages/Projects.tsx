import { motion } from 'motion/react';
import { useApi } from '@/hooks/useApi';
import { fetchProjects } from '@/api';
import ProjectCard from '@/components/ui/ProjectCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import type { Project } from '@/types';

const STATIC_PROJECTS: Project[] = [
  {
    _id: '1',
    slug: 'nutrilens',
    title: 'NutriLens',
    tagline: 'AI system that recognizes Indian food and tracks nutrition with 89.4% accuracy.',
    description: 'End-to-end computer vision product that identifies Indian dishes from photos and returns nutritional breakdowns automatically.',
    tech: ['Python', 'YOLOv8', 'Flask', 'React', 'TensorFlow'],
    problem: 'Tracking nutrition for Indian cuisine is hard — no good automated tools exist.',
    solution: 'Trained a custom YOLOv8 model on a curated dataset of 50+ Indian dishes.',
    architecture: 'React frontend → Flask REST API → YOLOv8 inference → Nutrition DB lookup',
    features: ['Real-time food detection', 'Nutrition breakdown', 'Meal history tracking'],
    challenges: ['Dataset curation', 'Class imbalance', 'Inference latency optimization'],
    learnings: ['Custom dataset pipelines', 'Model optimization', 'Flask API design'],
    status: 'completed',
    order: 1,
    githubUrl: 'https://github.com/siddheshshinde',
  },
  {
    _id: '2',
    slug: 'citation-detection',
    title: 'Citation Detection System',
    tagline: 'Backend pipeline for web scraping and citation extraction from AI responses.',
    description: 'Node.js service that crawls web pages, extracts structured citations, and maps AI-generated responses back to their source documents.',
    tech: ['Node.js', 'Cheerio', 'SQLite', 'Express', 'Next.js'],
    problem: 'AI responses lack verifiable citation trails, making fact-checking difficult.',
    solution: 'Built a scraping pipeline that crawls pages and maps response fragments to sources.',
    architecture: 'Express API → Cheerio crawler → Citation parser → SQLite storage',
    features: ['Web scraping', 'Citation extraction', 'Source mapping', 'REST API'],
    challenges: ['Rate limiting', 'DOM variance across sites', 'Citation disambiguation'],
    learnings: ['Data pipeline design', 'Web scraping patterns', 'SQLite query optimization'],
    status: 'completed',
    order: 2,
    githubUrl: 'https://github.com/siddheshshinde',
  },
];

export default function Projects() {
  const { data, loading, error } = useApi(fetchProjects, []);
  const projects = data ?? STATIC_PROJECTS;

  return (
    <div style={{ paddingTop: 68, backgroundColor: '#1d1b18' }}>
      <section style={{ padding: '5rem 2rem 3rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: '0.78rem', color: '#aa8517', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            My work
          </p>
          <h1 style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Projects
          </h1>
          <div style={{ width: 56, height: 4, backgroundColor: '#aa8517', borderRadius: 999, marginBottom: '1.5rem' }} />
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '1rem', color: '#fff4ca', lineHeight: 1.7, opacity: 0.85, maxWidth: 560 }}>
            Scalable systems, AI products, and creative digital experiences — built end to end.
          </p>
        </motion.div>
      </section>

      <section style={{ padding: '2rem 2rem 6rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {loading && !data && <LoadingSpinner fullPage />}
          {error && !data && <ErrorMessage message="Could not load projects — showing cached data." />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
