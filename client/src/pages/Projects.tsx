import { motion } from 'motion/react';
import { useApi } from '@/hooks/useApi';
import { fetchProjects } from '@/api';
import ProjectCard from '@/components/ui/ProjectCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import type { Project } from '@/types';

const STATIC_PROJECTS: Project[] = [
    {
    _id: '4',
    slug: 'animated-icecream',
    title: 'Animated Ice Cream Website',
    tagline: 'UX/UI case study — designing an immersive, flavour-first ice cream brand experience.',
    description:
      'A complete UX/UI design project for a premium animated ice cream brand website. Covers the full design process from research and personas through wireframes, design system, and high-fidelity Figma prototype.',
    tech: ['Figma', 'UX Research', 'Interaction Design', 'Prototyping', 'Design Systems'],
    problem:
      'Most ice cream brand websites are static and generic, failing to evoke the sensory delight of the product.',
    solution:
      'Designed a flavour-led, animation-first website where each flavour has its own full-screen immersive scene with typographic overlays and smooth transitions.',
    architecture:
      'Discover → Define → Design → Deliver. Full UX process: research, personas, IA, user flow, wireframes, design system, hi-fi Figma prototype.',
    features: [
      'Full-screen immersive flavour scenes with animated ingredient particles',
      'Typographic overlay system — giant flavour names behind product imagery',
      'Smooth cross-fade transitions between flavour scenes on scroll',
      'Flavour-specific colour theming per scene',
      'Responsive layout optimised for mobile touch',
      'Complete Figma component library with interactive prototype',
      'Full design system: colour tokens, typography scale, components',
    ],
    challenges: [
      'Balancing heavy animation with accessible contrast ratios',
      'Designing scroll-triggered experiences that work on mobile and desktop',
      'Maintaining brand consistency across completely different colour themes per scene',
      'Keeping large flavour name overlays legible over full-bleed imagery',
    ],
    learnings: [
      'Immersive design works when visual hierarchy is maintained — emotion first, information second',
      'A design system built early prevents inconsistency when scaling across scenes',
      'Sensory language in copywriting is as important as the visuals themselves',
      'Mobile-first constraints improved layout discipline across the desktop version too',
    ],
    status: 'completed',
    order: 4,
    thumbnail: '/icecream-images/icecream-1.png',
    liveUrl:
      'https://www.figma.com/proto/xSIv0wXO9s6sLFZd3yXd1l/Animated_icecream-webpage?node-id=6-74&p=f&t=GsjMg3NHOp663gWK-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
  },
  {
    
    _id: '1',
    slug: 'nutrilens',
    title: 'NutriLens',
    tagline: 'Computer vision system that recognizes Indian food and tracks nutrition with 89.4% mAP@50 accuracy.',
    description:
      'End-to-end AI product that identifies Indian dishes from a photo and returns a full nutritional breakdown automatically. Trained on 1,100+ curated images with Roboflow augmentation.',
    tech: ['Python', 'YOLOv8', 'Flask', 'React Native', 'Firebase', 'Roboflow', 'Google OAuth'],
    problem:
      'Tracking nutrition for Indian cuisine is hard — no reliable automated tool existed. Most apps require tedious manual search, causing users to abandon tracking entirely.',
    solution:
      'Trained a custom YOLOv8 model on 1,100+ Indian food images using Roboflow. Achieved 89.4% mAP@50. Integrated with a Flask REST backend and React Native mobile frontend.',
    architecture:
      'React Native camera → Flask REST API → YOLOv8 inference → Nutrition DB lookup → Firebase Firestore → Response with full macro/micro breakdown sent to mobile UI',
    features: [
      'Custom YOLOv8 model — 89.4% mAP@50 on 50+ Indian dishes',
      '1,100+ image dataset with Roboflow augmentation pipeline',
      'Transfer learning from COCO pretrained weights',
      'Real-time food detection from mobile camera',
      'Firebase Firestore for meal history and streak tracking',
      'Google OAuth 2.0 authentication',
      'Analytics dashboard showing weekly nutrition trends',
    ],
    challenges: [
      'Sourcing a diverse, balanced dataset covering regional Indian cuisine variety',
      'Preventing misclassification between visually similar dishes',
      'Reducing inference latency to under 1.5s on mobile-class hardware',
      'Designing a clean data pipeline from raw image to displayed nutrition card',
    ],
    learnings: [
      'Dataset quality and diversity matters more than model architecture choice',
      'Augmentation dramatically improves real-world generalization',
      'API latency requires careful design — async inference + response caching',
      'Mobile ML integration forces you to think about failure states from day one',
    ],
    status: 'completed',
    order: 1,
    thumbnail: '/nutrilens-images/nutrilens-1.png',
    githubUrl: 'https://github.com/Siddheshinde/NutriLens',
  },

  {
    _id: '3',
    slug: 'ai-image-catalog',
    title: 'AI Image Catalog Processing System',
    tagline: 'Scalable AI pipeline for automated bulk image classification, tagging, and semantic retrieval.',
    description:
      'A production-grade garment catalog automation system that processes large image datasets using computer vision for automated classification, attribute tagging, and semantic similarity search.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
    problem:
      'Fashion teams managing thousands of product images face a scaling crisis — manual classification is unsustainable. Keyword search misses semantic similarity.',
    solution:
      'Built a distributed pipeline: Redis ingestion queue → CNN inference workers → pgvector PostgreSQL → FastAPI for classification and semantic search. Docker Compose orchestrates everything.',
    architecture:
      'Image upload → Redis ingestion queue → Worker: CNN inference + feature extraction → pgvector PostgreSQL → FastAPI: GET /classify, GET /search → Redis cache',
    features: [
      'Bulk image ingestion via REST API and filesystem watcher',
      'Fine-tuned CNN for multi-label garment attribute classification',
      'pgvector cosine similarity search for semantic retrieval',
      'Redis async queue ensuring zero message loss under load',
      'FastAPI with async endpoints and OpenAPI documentation',
      'Docker Compose single-command deployment',
    ],
    challenges: [
      'Designing a horizontal ingestion pipeline without message loss',
      'Balancing CNN accuracy against processing throughput',
      'Implementing semantic search with pgvector without a dedicated vector DB',
    ],
    learnings: [
      'Architecture decisions constrain production performance more than model accuracy',
      'pgvector is a practical alternative to Pinecone/Weaviate at moderate scale',
      'Async queue patterns solve backpressure problems synchronous pipelines cannot',
    ],
    status: 'in-progress',
    order: 3,
    thumbnail: '/catalog-images/catalog-1.png',
    githubUrl: 'https://github.com/Siddheshinde/garment-catalog-automation',
  },
    {
    _id: '2',
    slug: 'citation-detection',
    title: 'Citation Detection & Web Scraping System',
    tagline: 'Node.js backend pipeline for web scraping, citation extraction, and source verification.',
    description:
      'A backend system built with Node.js and Express that crawls web pages using Cheerio, detects and extracts citation patterns using regex, and maps AI-generated content to verified source URLs stored in SQLite.',
    tech: ['Node.js', 'Express.js', 'Cheerio', 'SQLite', 'Regex Parsing', 'REST API'],
    problem:
      'AI-generated content lacks verifiable citation trails. Fact-checking requires manually tracing sources, which does not scale.',
    solution:
      'Built a scraping pipeline that fetches web pages with Cheerio, runs a regex engine across 12 citation pattern types, and stores source-citation mappings in SQLite.',
    architecture:
      'POST /scrape → Cheerio HTTP fetch + HTML parse → Regex citation engine → URL normalization → SQLite INSERT → GET /citations exposes full-text search',
    features: [
      'Express.js REST API (GET /citations, POST /scrape, POST /batch)',
      'Cheerio HTML scraping with configurable CSS selectors',
      'Regex engine covering 12 citation pattern formats',
      'SQLite with FTS5 full-text search',
      'Batch endpoint for scraping multiple URLs',
      'Source URL normalization and deduplication',
    ],
    challenges: [
      'HTML structure varies drastically across websites',
      'Designing regex patterns without false positives',
      'SQLite FTS5 schema for insert speed vs query performance',
    ],
    learnings: [
      'Web scrapers must be defensive — always assume malformed HTML',
      'Backend architecture is about data flow clarity, not endpoint count',
      'SQLite FTS5 is powerful and underrated for text search at small-medium scale',
    ],
    status: 'completed',
    order: 2,
    githubUrl: 'https://github.com/Siddheshinde/Citation-Detection-Web-Scraping-System',
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