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
    githubUrl: 'https://github.com/Siddheshinde/NutriLens',
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
    githubUrl: 'https://github.com/Siddheshinde/Citation-Detection-Web-Scraping-System',
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
    _id: '6',
    slug: 'animated-icecream',
    title: 'Animated Ice Cream Website',
    tagline: 'Immersive UX/UI design case study — flavour-first brand experience through storytelling and motion.',
    description: 'A premium Figma-prototyped ice cream brand website featuring three distinct flavour worlds, scroll-based transitions, and immersive visual storytelling.',
    tech: ['Figma', 'Prototyping', 'Interaction Design', 'Visual Design'],
    problem: 'Most ice cream websites rely on static menus and product listings with no emotional connection to the flavours.',
    solution: 'Designed an immersive flavour experience where each scroll section triggers a distinct emotional response through colour, typography, and visual storytelling.',
    architecture: 'Figma prototype → Three flavour worlds (Chocolate, Vanilla, Strawberry) → Scroll-based transitions → Full-screen immersive sections',
    features: ['Three distinct flavour worlds', 'Scroll-based colour transitions', 'Floating ingredient animations', 'Full-screen immersive sections', 'Cohesive design system'],
    challenges: ['Balancing visuals and readability', 'Creating unique identities per flavour', 'Maintaining design consistency', 'Managing visual hierarchy'],
    learnings: ['Colour psychology drives emotional response', 'Typography as visual hierarchy', 'Motion adds perceived quality', 'Immersive design increases engagement'],
    status: 'completed',
    order: 6,
    liveUrl: 'https://www.figma.com/proto/xSIv0wXO9s6sLFZd3yXd1l/Animated_icecream-webpage?node-id=6-74&p=f&t=GsjMg3NHOp663gWK-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    thumbnail: '/icecream-images/icecream-1.png',
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
    githubUrl: 'https://github.com/Siddheshinde/garment-catalog-automation',
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

// ─── Animated Ice Cream: Premium UX/UI Case Study ───────────────────────────

function IceCreamCaseStudy({ project }: { project: Project }) {
  const accent = '#FF6B9D';
  const gold = '#F5C842';
  const choc = '#6B3A2A';
  const cream = '#FFF8F0';
  const dark = '#1A0F0A';
  const mid = '#2A1810';

  const sectionStyle: React.CSSProperties = {
    padding: '5rem 2rem',
    maxWidth: 1100,
    margin: '0 auto',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: accent,
    marginBottom: '0.75rem',
  };

  const h2Style: React.CSSProperties = {
    fontFamily: "'Russo One', sans-serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    color: cream,
    margin: '0 0 1rem',
    lineHeight: 1.15,
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Public Sans', sans-serif",
    color: '#E8D5C8',
    fontSize: '1rem',
    lineHeight: 1.8,
    opacity: 0.9,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: mid,
    border: `1px solid rgba(245,200,66,0.15)`,
    borderRadius: 16,
    padding: '1.75rem',
  };

  const flavours = [
    {
      name: 'Chocolate',
      emoji: '🍫',
      bg: 'linear-gradient(135deg, #3B1C0C 0%, #6B3A2A 50%, #8B4513 100%)',
      accent: '#C4703A',
      palette: ['#3B1C0C', '#6B3A2A', '#8B4513', '#C4703A', '#F5DEB3'],
      paletteNames: ['Dark Cacao', 'Milk Choc', 'Warm Brown', 'Caramel', 'Cream'],
      desc: 'Deep, rich browns that evoke indulgence. The palette pairs dark cacao with caramel highlights to trigger emotional warmth and craving.',
      visual: (
        <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #3B1C0C, #6B3A2A)' }}>
          <img src="/icecream-images/image-2.png" alt="Chocolate flavour screen" style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: 280 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(59,28,12,0.7) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
            <span style={{ backgroundColor: 'rgba(107,58,42,0.85)', border: '1px solid rgba(196,112,58,0.5)', color: '#F5DEB3', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.08em' }}>🍫 Chocolate World</span>
          </div>
        </div>
      ),
    },
    {
      name: 'Vanilla',
      emoji: '🌿',
      bg: 'linear-gradient(135deg, #2D2200 0%, #7A6420 50%, #C9A84C 100%)',
      accent: '#F5C842',
      palette: ['#2D2200', '#7A6420', '#C9A84C', '#F5C842', '#FFFBE6'],
      paletteNames: ['Deep Gold', 'Amber', 'Harvest', 'Vanilla Gold', 'Cream'],
      desc: 'Warm golds and ambers communicate luxury and premium quality. Vanilla becomes aspirational — not plain, but sophisticated.',
      visual: (
        <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #2D2200, #7A6420)' }}>
          <img src="/icecream-images/image-1.png" alt="Vanilla flavour screen" style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: 280 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(45,34,0,0.7) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
            <span style={{ backgroundColor: 'rgba(122,100,32,0.85)', border: '1px solid rgba(245,200,66,0.5)', color: '#FFFBE6', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.08em' }}>🌿 Vanilla World</span>
          </div>
        </div>
      ),
    },
    {
      name: 'Strawberry',
      emoji: '🍓',
      bg: 'linear-gradient(135deg, #4A0018 0%, #A0002A 50%, #FF6B9D 100%)',
      accent: '#FF6B9D',
      palette: ['#4A0018', '#A0002A', '#D63868', '#FF6B9D', '#FFD6E7'],
      paletteNames: ['Deep Berry', 'Crimson', 'Rose', 'Strawberry', 'Blush'],
      desc: 'Vibrant berry pinks from deep crimson to soft blush. This palette feels fresh, playful, and irresistibly summery.',
      visual: (
        <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #4A0018, #A0002A)' }}>
          <img src="/icecream-images/image-3.png" alt="Strawberry flavour screen" style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: 280 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(74,0,24,0.7) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
            <span style={{ backgroundColor: 'rgba(160,0,42,0.85)', border: '1px solid rgba(255,107,157,0.5)', color: '#FFD6E7', fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.08em' }}>🍓 Strawberry World</span>
          </div>
        </div>
      ),
    },
  ];

  const journeySteps = [
    { icon: '🔍', label: 'Discover', desc: 'Brand awareness through visual impact' },
    { icon: '🎨', label: 'Explore', desc: 'Flavour-first navigation & storytelling' },
    { icon: '💡', label: 'Engage', desc: 'Immersive full-screen sections' },
    { icon: '✨', label: 'Experience', desc: 'Motion & colour psychology in action' },
    { icon: '❤️', label: 'Connect', desc: 'Emotional brand loyalty built through design' },
  ];

  const processSteps = [
    { label: 'Research', color: '#6B3A2A' },
    { label: 'Define', color: '#8B4513' },
    { label: 'Ideate', color: '#C4703A' },
    { label: 'Design', color: '#F5C842' },
    { label: 'Prototype', color: '#FF6B9D' },
    { label: 'Refine', color: '#E8A87C' },
  ];

  const insightCards = [
    { icon: '👁️', title: 'Visual Appeal', desc: 'Users decide emotional connection within 2–3 seconds of landing. Imagery must dominate the fold.' },
    { icon: '📖', title: 'Product Storytelling', desc: 'Flavours need personality. Generic product names fail to trigger cravings — stories do.' },
    { icon: '🎨', title: 'Colour Psychology', desc: 'Brown = warmth & indulgence. Gold = luxury. Pink = freshness. Each colour carries emotional weight.' },
    { icon: '⚡', title: 'Motion & Interaction', desc: 'Subtle scroll-based transitions increase dwell time and perceived product quality.' },
  ];

  const decisionCards = [
    { q: 'Why brown for Chocolate?', a: 'Brown triggers warmth and indulgence neurologically. Dark tones with caramel contrast create depth without losing appetite appeal.' },
    { q: 'Why gold for Vanilla?', a: 'Gold reframes vanilla as premium rather than plain. It signals craftsmanship and natural ingredients.' },
    { q: 'Why pink for Strawberry?', a: 'Berry pinks feel fresh and seasonal. The gradient from deep crimson to blush creates a dynamic, summery energy.' },
    { q: 'Why large typography?', a: 'Typography as visual hierarchy guides emotional journey. Big type demands attention before detail.' },
    { q: 'Why centered product placement?', a: 'Centre-stage framing mirrors luxury product photography — the ice cream becomes the hero.' },
    { q: 'Why minimal navigation?', a: 'Less chrome = more immersion. Navigation disappears to let the product experience breathe.' },
  ];

  return (
    <div style={{ backgroundColor: dark, minHeight: '100vh', fontFamily: "'Public Sans', sans-serif" }}>

      {/* ── 1. HERO ── */}
      <div style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: `linear-gradient(160deg, #1A0F0A 0%, #2A1810 40%, #3B1C18 70%, #1A0F0A 100%)` }}>
        {/* Ambient orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '20%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(196,112,58,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Floating emojis */}
        {['🍦', '🍓', '🍫', '🌿', '✨', '🧁'].map((e, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: `${1.5 + (i % 3) * 0.6}rem`,
            opacity: 0.15 + (i % 4) * 0.04,
            top: `${10 + i * 13}%`,
            left: i % 2 === 0 ? `${5 + i * 4}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            pointerEvents: 'none',
            filter: 'blur(0.5px)',
          }}>{e}</div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 760, padding: '2rem', position: 'relative', zIndex: 1 }}
        >
          <p style={{ ...labelStyle, marginBottom: '1.5rem', fontSize: '0.75rem' }}>UX / UI Design Case Study</p>
          <h1 style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.0,
            margin: '0 0 1.5rem',
            background: `linear-gradient(135deg, ${cream} 0%, ${gold} 50%, ${accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Animated<br />Ice Cream
          </h1>
          <p style={{ ...bodyStyle, fontSize: '1.15rem', maxWidth: 560, margin: '0 auto 2.5rem', opacity: 0.85 }}>
            Designing a flavour-first immersive ice cream brand experience through storytelling, visual hierarchy, and motion.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Figma', 'Prototyping', 'Interaction Design', 'Visual Design'].map((t) => (
              <span key={t} style={{ backgroundColor: 'rgba(245,200,66,0.1)', border: `1px solid rgba(245,200,66,0.3)`, color: gold, fontSize: '0.82rem', fontWeight: 600, padding: '6px 18px', borderRadius: 999, letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
          {/* Hero CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: accent, color: '#1A0F0A',
                fontWeight: 700, padding: '0.85rem 2rem', borderRadius: 999,
                fontSize: '0.95rem', textDecoration: 'none', letterSpacing: '0.02em',
                fontFamily: "'Public Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: '1rem' }}>▶</span> View Figma Prototype
            </a>
            <Link
              to="/projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: gold, fontWeight: 600, padding: '0.85rem 2rem',
                borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none',
                border: `1px solid rgba(245,200,66,0.35)`,
                fontFamily: "'Public Sans', sans-serif",
              }}
            >
              ← All Projects
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.4 }}>
          <span style={{ fontSize: '0.72rem', color: cream, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${cream}, transparent)` }} />
        </div>
      </div>

      {/* ── FIGMA SCREENSHOT ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem 0' }}
      >
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(245,200,66,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
          {/* Browser chrome bar */}
          <div style={{ backgroundColor: '#1A1008', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />)}
            </div>
            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '0.3rem 1rem', marginLeft: '0.75rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', fontFamily: 'monospace' }}>figma.com/proto/Animated_icecream-webpage</span>
            </div>
          </div>
          <img
            src="/icecream-images/icecream-1.png"
            alt="Animated Ice Cream Website — Figma Prototype"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
          {/* Overlay CTA */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(26,15,10,0.95) 0%, transparent 100%)', padding: '3rem 2rem 2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: '#A08878', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Figma Prototype</p>
              <p style={{ color: '#FFF8F0', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Interactive Design — Click to explore</p>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#FF6B9D', color: '#1A0F0A', fontWeight: 700, padding: '0.75rem 1.75rem', borderRadius: 999, fontSize: '0.9rem', textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: "'Public Sans', sans-serif" }}
            >
              Open in Figma ↗
            </a>
          </div>
        </div>
      </motion.div>

            {/* ── 2. PROJECT OVERVIEW ── */}
      <section style={sectionStyle}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p style={labelStyle}>Overview</p>
          <h2 style={h2Style}>Project at a Glance</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ ...cardStyle }}
          >
            <h3 style={{ fontFamily: "'Russo One', sans-serif", color: gold, fontSize: '1rem', margin: '0 0 1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(245,200,66,0.15)' }}>Project Info</h3>
            {[
              { label: 'Role', value: 'UX/UI Designer' },
              { label: 'Duration', value: '4 Weeks' },
              { label: 'Tools', value: 'Figma, Prototyping' },
              { label: 'Platform', value: 'Web (Desktop + Mobile)' },
              { label: 'Type', value: 'Visual & Interaction Design' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#A08878', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>
                <span style={{ color: cream, fontSize: '0.9rem', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {[
              { icon: '🎯', label: 'Problem', text: 'Most ice cream websites are static catalogues. They list products but fail to make users feel anything — there is no emotional connection to the flavours.' },
              { icon: '💡', label: 'Goal', text: 'Design an immersive flavour experience where each scroll section triggers a distinct emotional response through colour, typography, and visual storytelling.' },
              { icon: '🏆', label: 'Outcome', text: 'A premium, Figma-prototyped case study with full interaction design — three flavour worlds, scroll-based transitions, and a cohesive design system.' },
            ].map(({ icon, label, text }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <p style={{ color: gold, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ ...bodyStyle, fontSize: '0.9rem', margin: 0 }}>{text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. DESIGN CHALLENGE ── */}
      <div style={{ background: `linear-gradient(135deg, ${mid} 0%, #1F1208 50%, ${mid} 100%)`, padding: '5rem 2rem', borderTop: '1px solid rgba(245,200,66,0.08)', borderBottom: '1px solid rgba(245,200,66,0.08)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ ...labelStyle, textAlign: 'center' }}>Design Challenge</p>
            <h2 style={{ ...h2Style, textAlign: 'center', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
              Making Flavours<br />
              <span style={{ color: accent }}>Feel Something</span>
            </h2>
            <div style={{ width: 48, height: 3, background: `linear-gradient(to right, ${accent}, ${gold})`, borderRadius: 999, margin: '1.5rem auto' }} />
            <p style={{ ...bodyStyle, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 2rem' }}>
              Most ice cream websites rely on static menus and product listings. The challenge was creating an immersive flavour experience where users emotionally connect with each flavour through visuals, colour, and storytelling.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Static → Immersive', 'Catalogue → Story', 'Product → Experience'].map((s) => (
                <span key={s} style={{ backgroundColor: 'rgba(255,107,157,0.08)', border: `1px solid rgba(255,107,157,0.25)`, color: accent, fontSize: '0.85rem', fontWeight: 600, padding: '8px 20px', borderRadius: 999 }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 4. RESEARCH INSIGHTS ── */}
      <section style={sectionStyle}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={labelStyle}>Research</p>
          <h2 style={h2Style}>Key Insights</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginTop: '2.5rem' }}>
          {insightCards.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ ...cardStyle, borderTop: `3px solid ${[accent, gold, '#C4703A', '#6BBFFF'][i]}` }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
              <h3 style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '1rem', margin: '0 0 0.6rem' }}>{title}</h3>
              <p style={{ ...bodyStyle, fontSize: '0.875rem', margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. USER PERSONAS ── */}
      <section style={{ ...sectionStyle, paddingTop: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={labelStyle}>User Research</p>
          <h2 style={h2Style}>User Personas</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          {[
            {
              avatar: '🧑‍🎓',
              name: 'Priya, 21',
              type: 'Dessert-Loving Student',
              color: accent,
              goals: ['Quick decision-making on-the-go', 'Visually shareable content (Instagram-worthy)', 'Affordable indulgence'],
              motivations: ['Treats as self-reward after exams', 'Food aesthetics matter as much as taste'],
              frustrations: ['Bland product pages with no personality', 'Slow-loading image-heavy websites'],
              devices: ['Mobile-first', 'Instagram, Swiggy power user'],
            },
            {
              avatar: '👩‍💼',
              name: 'Aryan, 28',
              type: 'Premium Food Enthusiast',
              color: gold,
              goals: ['Discover artisanal / premium brands', 'Understand ingredient quality & story', 'Gift-worthy presentation'],
              motivations: ['Food as an experience, not just fuel', 'Willing to pay premium for authenticity'],
              frustrations: ['Generic corporate-looking food sites', 'No storytelling around ingredients or craft'],
              devices: ['Desktop + Mobile', 'Behance, Zomato, food blogs'],
            },
          ].map(({ avatar, name, type, color, goals, motivations, frustrations, devices }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              style={{ ...cardStyle, borderTop: `3px solid ${color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: `${color}20`, border: `2px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{avatar}</div>
                <div>
                  <h3 style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '1.1rem', margin: '0 0 0.2rem' }}>{name}</h3>
                  <p style={{ color, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{type}</p>
                </div>
              </div>
              {[
                { label: 'Goals', items: goals },
                { label: 'Motivations', items: motivations },
                { label: 'Frustrations', items: frustrations },
              ].map(({ label, items }) => (
                <div key={label} style={{ marginBottom: '1rem' }}>
                  <p style={{ color, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>{label}</p>
                  {items.map((item) => (
                    <p key={item} style={{ ...bodyStyle, fontSize: '0.85rem', margin: '0 0 0.2rem', display: 'flex', gap: '0.4rem' }}>
                      <span style={{ color, opacity: 0.7 }}>·</span> {item}
                    </p>
                  ))}
                </div>
              ))}
              <div>
                <p style={{ color, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Devices</p>
                <p style={{ ...bodyStyle, fontSize: '0.85rem', margin: 0 }}>{devices.join(' · ')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. USER JOURNEY ── */}
      <div style={{ background: `linear-gradient(to right, ${dark}, ${mid}, ${dark})`, padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ ...labelStyle, textAlign: 'center' }}>UX Flow</p>
            <h2 style={{ ...h2Style, textAlign: 'center' }}>User Journey</h2>
          </motion.div>
          <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0, flexWrap: 'wrap', position: 'relative' }}>
            {journeySteps.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 0 }}
              >
                <div style={{ textAlign: 'center', padding: '1.5rem 1.25rem', backgroundColor: mid, border: `1px solid rgba(245,200,66,0.12)`, borderRadius: 16, minWidth: 140, maxWidth: 175 }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}20, ${gold}20)`, border: `1px solid ${gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 0.75rem' }}>{icon}</div>
                  <div style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ color: '#A08878', fontSize: '0.78rem', lineHeight: 1.5 }}>{desc}</div>
                </div>
                {i < journeySteps.length - 1 && (
                  <div style={{ width: 32, height: 2, background: `linear-gradient(to right, ${gold}40, ${accent}40)`, flexShrink: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', color: gold, fontSize: '0.7rem', opacity: 0.7 }}>▶</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. IA + 8. PROCESS ── */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>Structure</p>
            <h3 style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '1.2rem', margin: '0 0 1.25rem' }}>Information Architecture</h3>
            <pre style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem', color: gold, lineHeight: 2, margin: 0, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '1rem', border: '1px solid rgba(245,200,66,0.1)', overflowX: 'auto', whiteSpace: 'pre' }}>{`Home
├── 🍫 Flavours
│   ├── Chocolate
│   ├── Vanilla
│   └── Strawberry
├── 🌟 About
│   └── Our Story
└── 📬 Contact`}</pre>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} style={cardStyle}>
            <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>Workflow</p>
            <h3 style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '1.2rem', margin: '0 0 1.5rem' }}>Design Process</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {processSteps.map(({ label, color }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A0F0A', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1, height: 36, backgroundColor: `${color}18`, border: `1px solid ${color}30`, borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                    <span style={{ color: cream, fontSize: '0.88rem', fontWeight: 600 }}>{label}</span>
                  </div>
                  {i < processSteps.length - 1 && <div style={{ position: 'absolute', marginLeft: 13, marginTop: 44, width: 2, height: 12, backgroundColor: `${color}40` }} />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. FLAVOUR SHOWCASE ── */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '3rem' }}>
            <p style={labelStyle}>Visual Design</p>
            <h2 style={h2Style}>Flavour Showcase</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {flavours.map(({ name, visual, palette, paletteNames, desc, accent: fAccent }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center',
                  ...(i % 2 !== 0 ? { direction: 'rtl' } : {}),
                }}
              >
                <div style={{ direction: 'ltr' }}>
                  {visual}
                </div>
                <div style={{ direction: 'ltr' }}>
                  <p style={{ ...labelStyle, color: fAccent }}>{name}</p>
                  <h3 style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: '0 0 1rem', lineHeight: 1.2 }}>{name} World</h3>
                  <p style={{ ...bodyStyle, marginBottom: '2rem' }}>{desc}</p>
                  <div>
                    <p style={{ color: '#A08878', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Colour Palette</p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                      {palette.map((c, ci) => (
                        <div key={c} style={{ textAlign: 'center', flex: 1 }}>
                          <div style={{ height: `${28 + ci * 4}px`, backgroundColor: c, borderRadius: 6, marginBottom: '0.4rem', border: '1px solid rgba(255,255,255,0.08)' }} />
                          <p style={{ color: '#A08878', fontSize: '0.6rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{paletteNames[ci]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. DESIGN SYSTEM ── */}
      <div style={{ background: mid, padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '2.5rem' }}>
            <p style={labelStyle}>Design System</p>
            <h2 style={h2Style}>Visual Language</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ backgroundColor: dark, borderRadius: 16, padding: '2rem', border: '1px solid rgba(245,200,66,0.1)' }}>
              <p style={{ ...labelStyle, marginBottom: '1.25rem' }}>Typography</p>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#A08878', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>Heading</p>
                <p style={{ fontFamily: "'Russo One', sans-serif", color: cream, fontSize: '2rem', margin: 0, lineHeight: 1 }}>Russo One</p>
                <p style={{ color: '#A08878', fontSize: '0.8rem', marginTop: '0.3rem' }}>Bold · Display · Impact</p>
              </div>
              <div>
                <p style={{ color: '#A08878', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>Body</p>
                <p style={{ fontFamily: "'Public Sans', sans-serif", color: '#E8D5C8', fontSize: '1rem', margin: 0, lineHeight: 1.7 }}>Public Sans — Clean, modern, readable at all sizes for product descriptions and UI copy.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ backgroundColor: dark, borderRadius: 16, padding: '2rem', border: '1px solid rgba(245,200,66,0.1)' }}>
              <p style={{ ...labelStyle, marginBottom: '1.25rem' }}>Colour Palette</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { name: 'Chocolate Brown', hex: '#6B3A2A', swatch: '#6B3A2A' },
                  { name: 'Vanilla Gold', hex: '#F5C842', swatch: '#F5C842' },
                  { name: 'Strawberry Pink', hex: '#FF6B9D', swatch: '#FF6B9D' },
                  { name: 'Cream White', hex: '#FFF8F0', swatch: '#FFF8F0' },
                  { name: 'Dark Background', hex: '#1A0F0A', swatch: '#1A0F0A', border: '1px solid rgba(255,255,255,0.15)' },
                ].map(({ name, hex, swatch, border }) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: swatch, flexShrink: 0, border: border || 'none' }} />
                    <div>
                      <p style={{ color: cream, fontSize: '0.88rem', fontWeight: 600, margin: '0 0 0.1rem' }}>{name}</p>
                      <p style={{ color: '#A08878', fontSize: '0.75rem', fontFamily: 'monospace', margin: 0 }}>{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 11. DESIGN DECISIONS ── */}
      <section style={sectionStyle}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '2.5rem' }}>
          <p style={labelStyle}>Rationale</p>
          <h2 style={h2Style}>Design Decisions</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {decisionCards.map(({ q, a }, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ ...cardStyle, borderLeft: `3px solid ${[accent, gold, '#C4703A', accent, gold, '#C4703A'][i]}` }}
            >
              <p style={{ color: [accent, gold, '#C4703A', accent, gold, '#C4703A'][i], fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Decision</p>
              <h4 style={{ fontFamily: "'Public Sans', sans-serif", color: cream, fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.6rem', lineHeight: 1.4 }}>{q}</h4>
              <p style={{ ...bodyStyle, fontSize: '0.875rem', margin: 0 }}>{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 12. INTERACTION + 13. ACCESSIBILITY ── */}
      <div style={{ background: mid, padding: '5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={labelStyle}>Motion</p>
            <h2 style={{ ...h2Style, fontSize: '1.6rem', marginBottom: '1.5rem' }}>Interaction Design</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '🔄', title: 'Scroll-Based Transitions', desc: 'Full-screen flavour sections shift with scroll, changing background colour and atmosphere.' },
                { icon: '🫧', title: 'Floating Ingredients', desc: 'Ingredient illustrations float subtly, reinforcing flavour identity on each screen.' },
                { icon: '📱', title: 'Immersive Sections', desc: 'No partial views — each flavour owns the full viewport for maximum impact.' },
                { icon: '🎭', title: 'Visual Storytelling', desc: 'Typography and imagery combine to tell each flavour\'s personality without words.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', backgroundColor: dark, borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <p style={{ color: cream, fontWeight: 700, fontSize: '0.9rem', margin: '0 0 0.25rem' }}>{title}</p>
                    <p style={{ ...bodyStyle, fontSize: '0.83rem', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={labelStyle}>Inclusion</p>
            <h2 style={{ ...h2Style, fontSize: '1.6rem', marginBottom: '1.5rem' }}>Accessibility</h2>
            <div style={{ backgroundColor: dark, borderRadius: 16, padding: '1.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                'Sufficient colour contrast on all text elements',
                'Large typography reducing cognitive load',
                'Generous spacing and padding throughout',
                'Consistent navigation structure',
                'Responsive layout for mobile & desktop',
                'Clear visual hierarchy at every scroll point',
                'Readable fonts at all viewport sizes',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#4ADE80', fontWeight: 700, flexShrink: 0, fontSize: '0.95rem' }}>✓</span>
                  <span style={{ ...bodyStyle, fontSize: '0.9rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 15. FINAL OUTCOME ── */}
      <div style={{ position: 'relative', padding: '7rem 2rem', textAlign: 'center', overflow: 'hidden', background: `linear-gradient(160deg, ${dark} 0%, ${mid} 40%, #3B1820 70%, ${dark} 100%)` }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,107,157,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ ...labelStyle, textAlign: 'center' }}>Final Outcome</p>
            <h2 style={{ fontFamily: "'Russo One', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '0 0 1.5rem', background: `linear-gradient(135deg, ${cream} 0%, ${gold} 50%, ${accent} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Design that<br />Makes You Crave
            </h2>
            <p style={{ ...bodyStyle, fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 3rem' }}>
              A premium Figma prototype delivering three distinct flavour worlds — each with its own emotional identity, colour system, and immersive storytelling experience.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { icon: '📖', label: 'Storytelling', detail: 'Each flavour has its own narrative arc' },
                { icon: '🎨', label: 'Premium Branding', detail: 'Luxury visual language throughout' },
                { icon: '🍦', label: 'Flavour Identity', detail: '3 distinct design worlds' },
                { icon: '✨', label: 'Immersive UX', detail: 'Full-screen scroll experience' },
              ].map(({ icon, label, detail }) => (
                <div key={label} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1.25rem 1rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <p style={{ color: cream, fontWeight: 700, fontSize: '0.9rem', margin: '0 0 0.3rem' }}>{label}</p>
                  <p style={{ color: '#A08878', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>{detail}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: accent, color: '#1A0F0A', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', letterSpacing: '0.02em' }}>
                  View Prototype ↗
                </a>
              )}
              <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: gold, fontWeight: 600, padding: '0.85rem 2rem', borderRadius: 999, fontSize: '0.95rem', textDecoration: 'none', border: `1px solid rgba(245,200,66,0.35)` }}>
                ← All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── End Ice Cream Case Study ────────────────────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: apiProject,
    loading,
    error,
  } = useApi(() => fetchProjectBySlug(slug!), [slug]);

  const project: Project | undefined =
    apiProject ?? fallbackProjects.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Siddhesh Shinde`;
    } else {
      document.title = 'Project | Siddhesh Shinde';
    }
  }, [project]);

  if (loading) return <LoadingSpinner fullPage />;

  if (project && project.slug === 'animated-icecream') {
    return <IceCreamCaseStudy project={project} />;
  }

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
              margin: '0 0 1rem',
              lineHeight: 1.65,
              opacity: 0.9,
            }}
          >
            {project.tagline}
          </p>
          <p
            style={{
              color: '#d4c4b0',
              fontSize: '0.97rem',
              margin: '0 0 1.5rem',
              lineHeight: 1.75,
              opacity: 0.75,
              maxWidth: 640,
            }}
          >
            {project.description}
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
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#1d1b18',
                  backgroundColor: '#aa8517',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.3rem',
                  borderRadius: 8,
                  letterSpacing: '0.02em',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ff9500',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(255,149,0,0.35)',
                  padding: '0.55rem 1.3rem',
                  borderRadius: 8,
                }}
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Screenshot — NutriLens */}
        {project.slug === 'nutrilens' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(170,133,23,0.2)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ backgroundColor: '#1a1a18', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c }} />)}
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '0.25rem 0.85rem', marginLeft: '0.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', fontFamily: 'monospace' }}>github.com/Siddheshinde/NutriLens</span>
                </div>
              </div>
              <img src="/nutrilens-images/nutrilens-1.png" alt="NutriLens screenshot" style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>
        )}

        {/* Project Screenshot — AI Image Catalog */}
        {project.slug === 'ai-image-catalog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ marginBottom: '2rem' }}
          >
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(170,133,23,0.2)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ backgroundColor: '#1a1a18', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c }} />)}
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '0.25rem 0.85rem', marginLeft: '0.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', fontFamily: 'monospace' }}>github.com/Siddheshinde/garment-catalog-automation</span>
                </div>
              </div>
              <img src="/catalog-images/catalog-1.png.png" alt="AI Image Catalog screenshot" style={{ width: '100%', display: 'block' }} />
            </div>
          </motion.div>
        )}

        {/* Quick Stats — NutriLens */}
        {project.slug === 'nutrilens' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2.5rem' }}
          >
            {[
              { label: 'Model Accuracy', value: '89.4%' },
              { label: 'Training Images', value: '1,100+' },
              { label: 'Food Classes', value: '50+' },
              { label: 'Model', value: 'YOLOv8' },
            ].map(({ label, value }) => (
              <div key={label} style={{ backgroundColor: '#282621', border: '1px solid rgba(170,133,23,0.15)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: '1.15rem', margin: '0 0 0.3rem' }}>{value}</p>
                <p style={{ color: '#aa8517', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Quick Stats — Citation Detection */}
        {project.slug === 'citation-detection' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2.5rem' }}
          >
            {[
              { label: 'Citation Patterns', value: '12' },
              { label: 'API Type', value: 'REST' },
              { label: 'Storage', value: 'SQLite' },
              { label: 'Scraper', value: 'Cheerio' },
            ].map(({ label, value }) => (
              <div key={label} style={{ backgroundColor: '#282621', border: '1px solid rgba(170,133,23,0.15)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: '1.15rem', margin: '0 0 0.3rem' }}>{value}</p>
                <p style={{ color: '#aa8517', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Quick Stats — AI Image Catalog */}
        {project.slug === 'ai-image-catalog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2.5rem' }}
          >
            {[
              { label: 'Pipeline', value: 'Async' },
              { label: 'Search', value: 'pgvector' },
              { label: 'Queue', value: 'Redis' },
              { label: 'Deploy', value: 'Docker' },
            ].map(({ label, value }) => (
              <div key={label} style={{ backgroundColor: '#282621', border: '1px solid rgba(170,133,23,0.15)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontFamily: "'Russo One', sans-serif", color: '#ff9500', fontSize: '1.15rem', margin: '0 0 0.3rem' }}>{value}</p>
                <p style={{ color: '#aa8517', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        )}

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