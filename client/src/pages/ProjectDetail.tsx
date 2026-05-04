import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { useApi } from '@/hooks/useApi';
import { fetchProjectBySlug } from '@/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { Project } from '@/types';

const fallbackProjects: Project[] = [
  {
    _id: '1',
    slug: 'nutrilens',
    title: 'NutriLens',
    tagline: 'AI-powered food recognition and nutrition tracker for Indian cuisine',
    description:
      'A mobile application that uses computer vision to detect Indian food items from images and automatically estimate their nutritional content, eliminating manual calorie tracking.',
    tech: ['Python', 'YOLOv8', 'Flask', 'React Native', 'Firebase', 'Roboflow', 'Google OAuth'],
    problem:
      'Most calorie-tracking apps rely on manual input, which is time-consuming and error-prone. For Indian food specifically, no reliable automated solution existed — users abandon tracking because of the friction involved.',
    solution:
      'Built a custom YOLOv8 computer vision model trained on 1100+ Indian food images using Roboflow with augmentation. Achieved 89.4% mAP@50 accuracy. Integrated with a Flask backend and React Native mobile frontend.',
    architecture:
      'User captures image via React Native app → Image sent to Flask backend → YOLOv8 inference → Detected items matched to nutritional database → Results stored in Firebase → Response returned with nutrition breakdown',
    features: [
      'Custom YOLOv8 model with 89.4% mAP@50 accuracy',
      'Dataset of 1100+ Indian food images with Roboflow augmentation',
      'Transfer learning from COCO pretrained weights',
      'Real-time food detection via mobile camera',
      'Firebase Firestore for data persistence',
      'Google OAuth 2.0 authentication',
      'Streak tracking system',
      'Analytics dashboard',
    ],
    challenges: [
      'Sourcing a diverse dataset representative of Indian food variety',
      'Balancing model accuracy against inference speed on mobile',
      'Handling similar-looking foods without misclassification',
      'Designing clean data pipeline from image to nutrition display',
    ],
    learnings: [
      'Data quality matters more than model architecture choice',
      'Real-world ML accuracy requires iterative tuning',
      'ML model integration requires careful API design for latency',
      'Augmentation techniques significantly improve generalization',
    ],
    status: 'completed',
    order: 1,
    githubUrl: 'https://github.com/siddheshshinde',
  },
  {
    _id: '2',
    slug: 'citation-detection',
    title: 'Citation Detection & Web Scraping System',
    tagline: 'Backend system for extracting and verifying citations from web content',
    description:
      'A Node.js backend system that scrapes web content using Cheerio, detects citation patterns, and maps them to verified source URLs stored in SQLite.',
    tech: ['Node.js', 'Express.js', 'Cheerio', 'SQLite', 'REST API', 'Regex Parsing'],
    problem:
      'With the rise of AI-generated content, verifying sources has become critical. No structured system existed to extract citations from responses, match them to actual source documents, and store them for retrieval.',
    solution:
      'Built a backend pipeline that crawls web pages with Cheerio, extracts structured content, runs regex-based citation detection, and stores source-citation mappings in SQLite for fast querying via REST endpoints.',
    architecture:
      'Input URL → Cheerio HTTP fetch + HTML parse → Content block extraction → Regex citation pattern matching → Source URL normalization → SQLite INSERT → REST API exposes GET /citations and POST /scrape',
    features: [
      'Express.js REST API with clean endpoint design',
      'Cheerio-based HTML scraping with configurable selectors',
      'Regex engine for 12 citation pattern types',
      'SQLite database with indexed tables',
      'Full-text search across citation references',
      'Batch scrape endpoint for multiple URLs',
    ],
    challenges: [
      'HTML structures vary drastically across websites requiring adaptive logic',
      'Designing regex patterns to catch varied citation formats without false positives',
      'Efficient schema design for fast full-text search',
    ],
    learnings: [
      'Web scraping must be defensive — always expect malformed HTML',
      'Backend architecture is about data flow clarity, not just endpoint count',
      'SQLite FTS5 dramatically improves query performance over LIKE operators',
    ],
    status: 'completed',
    order: 2,
    githubUrl: 'https://github.com/siddheshshinde',
  },
  {
    _id: '3',
    slug: 'franchise-management',
    title: 'Enterprise Franchise Management System',
    tagline: 'Full-stack operations platform for franchise inventory, staff, and sales',
    description:
      'A PHP/MySQL full-stack web application providing centralized management for franchise operations including inventory, staff management, sales monitoring, and role-based access control.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'RBAC', 'MVC Architecture'],
    problem:
      'Franchise businesses struggle with disconnected systems. Managers use spreadsheets, access is uncontrolled, and there is no single source of truth for business operations.',
    solution:
      'Designed a PHP MVC application with a normalized MySQL schema. RBAC so Admins, Managers, and Staff see only relevant modules. A centralized dashboard aggregates real-time data.',
    architecture:
      'PHP MVC: controllers handle HTTP → models execute SQL via PDO → views render with template partials. MySQL normalized to 3NF. Sessions manage authentication. RBAC middleware checks role on every protected route.',
    features: [
      'Role-based access control: Admin, Manager, Staff tiers',
      'Inventory module with low-stock alerts',
      'Sales recording with report generation',
      'Staff management with scheduling',
      'Real-time monitoring dashboard',
      'Bcrypt password hashing',
      'SQL injection prevention via prepared statements',
    ],
    challenges: [
      'Normalized schema design that supports complex reporting without degradation',
      "Extensible RBAC middleware that doesn't require changes to every route",
      'Real-time-feeling dashboard without WebSockets',
    ],
    learnings: [
      'Database normalization is prerequisite for scalable reporting',
      'Security cannot be retrofitted — design it in from day one',
      'Internal tools still need good UX to prevent data corruption workarounds',
    ],
    status: 'completed',
    order: 3,
    githubUrl: 'https://github.com/siddheshshinde',
  },
  {
    _id: '4',
    slug: 'crypto-prediction',
    title: 'Cryptocurrency Prediction & Analysis System',
    tagline: 'Random Forest ML model for Bitcoin trend prediction with visual analytics',
    description:
      'A Python ML system predicting Bitcoin trends using Random Forest with extensive feature engineering, served through Streamlit and Tkinter dashboards with 20+ visualizations.',
    tech: ['Python', 'Random Forest', 'Streamlit', 'Tkinter', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    problem:
      'Crypto markets are volatile. Most tools are too complex or show raw data without insights. There was need for a system that both predicts trends and explains patterns visually.',
    solution:
      'Engineered 30+ technical indicators as features (RSI, MACD, Bollinger Bands). Trained Random Forest on historical BTC OHLCV data. Built interactive dashboards in Streamlit (web) and Tkinter (desktop).',
    architecture:
      'Historical OHLCV data → Pandas feature engineering (30+ indicators) → Train/test split → Random Forest + GridSearchCV → Joblib serialization → Streamlit web UI + Tkinter desktop UI load saved model',
    features: [
      'Random Forest with GridSearchCV tuning',
      '30+ engineered features: RSI, MACD, Bollinger Bands',
      '20+ interactive visualizations',
      'Time-series aware train/test split',
      'Streamlit web dashboard',
      'Tkinter desktop application',
      'Full model performance metrics',
    ],
    challenges: [
      'Preventing data leakage from future price data into features',
      'Selecting features that are genuinely predictive vs spuriously correlated',
      'Designing visualizations that communicate model confidence alongside predictions',
    ],
    learnings: [
      'Feature selection is more impactful than model choice for financial data',
      'Time-series cross-validation is essential — random splits give deceptively high accuracy',
      'Visualizations must communicate uncertainty, not just point predictions',
    ],
    status: 'completed',
    order: 4,
    githubUrl: 'https://github.com/siddheshshinde',
  },
  {
    _id: '5',
    slug: 'ai-image-catalog',
    title: 'AI Image Catalog Processing System',
    tagline: 'Scalable AI pipeline for intelligent bulk image classification and retrieval',
    description:
      'A production-grade system in active development that processes large image datasets using computer vision for automated classification, tagging, and semantic retrieval at scale.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Computer Vision'],
    problem:
      'Organizations managing large image libraries face a fundamental scaling problem: manual classification breaks down beyond thousands of images. Search is keyword-dependent and misses semantic similarity.',
    solution:
      'Building a distributed pipeline that ingests bulk images, runs AI classification through a fine-tuned CNN, extracts feature vectors for semantic similarity, and serves results via FastAPI with Redis caching.',
    architecture:
      'Image ingestion queue (Redis) → Worker processes run CNN inference → Feature vectors stored in pgvector PostgreSQL → FastAPI serves results + semantic search → Docker Compose orchestrates all services',
    features: [
      'Bulk image ingestion via REST API or filesystem watch',
      'Fine-tuned CNN for multi-label classification',
      'Feature vector extraction for semantic search',
      'pgvector cosine similarity search in PostgreSQL',
      'Redis queue for scalable async processing',
      'FastAPI with async endpoints',
      'Docker Compose deployment',
    ],
    challenges: [
      'Designing an ingestion pipeline that scales horizontally without message loss',
      'Balancing classification accuracy with throughput',
      'Implementing semantic search without a dedicated vector database',
    ],
    learnings: [
      'Architecture decisions constrain performance more than model choice in production',
      'Production ML requires monitoring for distribution shift',
      'pgvector is a practical alternative to dedicated vector databases at moderate scale',
    ],
    status: 'in-progress',
    order: 5,
    githubUrl: 'https://github.com/siddheshshinde',
  },
];

const bodyTextStyle: React.CSSProperties = {
  color: '#f3e8d8',
  fontSize: '0.97rem',
  lineHeight: 1.75,
  margin: 0,
  opacity: 0.9,
};

function ContentSection({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      style={{
        backgroundColor: '#282621',
        border: '1px solid rgba(255,193,7,0.2)',
        borderRadius: 12,
        padding: '1.75rem',
      }}
    >
      <h2
        style={{
          fontFamily: "'Russo One', sans-serif",
          color: '#ff9500',
          fontSize: '1.2rem',
          margin: '0 0 1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid rgba(255,193,7,0.15)',
        }}
      >
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: apiProject,
    loading,
    error,
  } = useApi(() => fetchProjectBySlug(slug!), [slug]);

  const project: Project | undefined =
    apiProject ?? (error ? fallbackProjects.find((p) => p.slug === slug) : undefined);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Siddhesh Shinde`;
    } else {
      document.title = 'Project | Siddhesh Shinde';
    }
  }, [project]);

  if (loading) return <LoadingSpinner fullPage />;

  if (!project) {
    return (
      <div
        style={{
          backgroundColor: '#1d1b18',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Public Sans', sans-serif",
          padding: '2rem',
          textAlign: 'center',
          gap: '1.5rem',
        }}
      >
        <h1
          style={{
            fontFamily: "'Russo One', sans-serif",
            color: '#ff9500',
            fontSize: '3rem',
            margin: 0,
          }}
        >
          404
        </h1>
        <p style={{ color: '#f3e8d8', fontSize: '1.1rem', margin: 0 }}>
          Project not found
        </p>
        <Link
          to="/projects"
          style={{
            color: '#aa8517',
            fontWeight: 600,
            textDecoration: 'none',
            border: '1px solid #aa8517',
            padding: '0.6rem 1.5rem',
            borderRadius: 8,
          }}
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#1d1b18',
        minHeight: '100vh',
        padding: '3rem 1.5rem 5rem',
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2rem' }}
        >
          <Link
            to="/projects"
            style={{
              color: '#aa8517',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '3rem' }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                backgroundColor: project.status === 'completed' ? '#aa8517' : '#ff9500',
                color: '#1d1b18',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '3px 12px',
                borderRadius: 999,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
            <span
              style={{
                color: '#aa8517',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              Case Study
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Russo One', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#ff9500',
              margin: '0 0 1rem',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              color: '#f3e8d8',
              fontSize: '1.15rem',
              margin: '0 0 1.5rem',
              lineHeight: 1.65,
              opacity: 0.9,
            }}
          >
            {project.tagline}
          </p>

          {/* Tech badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  backgroundColor: '#282621',
                  border: '1px solid #aa8517',
                  color: '#ff9500',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '4px 14px',
                  borderRadius: 999,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#aa8517',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(170,133,23,0.4)',
                padding: '0.45rem 1.1rem',
                borderRadius: 8,
              }}
            >
              GitHub
            </a>
          )}
        </motion.div>

        {/* Content Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ContentSection title="The Problem" delay={0.1}>
            <p style={bodyTextStyle}>{project.problem}</p>
          </ContentSection>

          <ContentSection title="The Solution" delay={0.15}>
            <p style={bodyTextStyle}>{project.solution}</p>
          </ContentSection>

          <ContentSection title="Architecture" delay={0.2}>
            <div
              style={{
                backgroundColor: '#1a1a18',
                borderLeft: '3px solid #aa8517',
                borderRadius: '0 8px 8px 0',
                padding: '1.25rem 1.5rem',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.88rem',
                color: '#fff4ca',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {project.architecture}
            </div>
          </ContentSection>

          {project.features.length > 0 && (
            <ContentSection title="Key Features" delay={0.25}>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                {project.features.map((f, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        color: '#aa8517',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      ✓
                    </span>
                    <span style={bodyTextStyle}>{f}</span>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

          {project.challenges.length > 0 && (
            <ContentSection title="Challenges" delay={0.3}>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                {project.challenges.map((c, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        color: '#ff9500',
                        fontWeight: 700,
                        flexShrink: 0,
                        fontSize: '1.1rem',
                        lineHeight: 1.4,
                      }}
                    >
                      &rsaquo;
                    </span>
                    <span style={bodyTextStyle}>{c}</span>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}

          {project.learnings.length > 0 && (
            <ContentSection title="What I Learned" delay={0.35}>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                {project.learnings.map((l, i) => (
                  <li
                    key={i}
                    style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
                  >
                    <span
                      style={{ color: '#aa8517', fontWeight: 700, flexShrink: 0, marginTop: 2 }}
                    >
                      &rarr;
                    </span>
                    <span style={bodyTextStyle}>{l}</span>
                  </li>
                ))}
              </ul>
            </ContentSection>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '3.5rem' }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#aa8517',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(170,133,23,0.4)',
              padding: '0.65rem 1.5rem',
              borderRadius: 8,
              fontSize: '0.95rem',
            }}
          >
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
