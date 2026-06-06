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
    tagline: 'Computer vision system that recognizes Indian food and tracks nutrition with 89.4% mAP@50 accuracy.',
    description:
      'End-to-end AI product that identifies Indian dishes from a photo and returns a full nutritional breakdown automatically. Trained on 1,100+ curated images with Roboflow augmentation.',
    tech: ['Python', 'YOLOv8', 'Flask', 'React Native', 'Firebase', 'Roboflow', 'Google OAuth'],
    problem:
      'Tracking nutrition for Indian cuisine is hard — no reliable automated tool existed. Most apps require tedious manual search, causing users to abandon tracking entirely.',
    solution:
      'Trained a custom YOLOv8 model on 1,100+ Indian food images using Roboflow. Achieved 89.4% mAP@50. Integrated with a Flask REST backend and React Native mobile frontend with Firebase auth and persistence.',
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
      'Preventing misclassification between visually similar dishes (e.g. dal vs kadhi)',
      'Reducing inference latency to under 1.5s on mobile-class hardware',
      'Designing a clean data pipeline from raw image to displayed nutrition card',
    ],
    learnings: [
      'Dataset quality and diversity matters more than model architecture choice',
      'Augmentation (flip, rotate, brightness shift) dramatically improves real-world generalization',
      'API latency requires careful design — async inference + response caching',
      'Mobile ML integration forces you to think about failure states from day one',
    ],
    status: 'completed',
    order: 1,
    thumbnail: '/nutrilens-images/nutrilens-1.png',
    githubUrl: 'https://github.com/Siddheshinde/NutriLens',
  },
  {
    _id: '2',
    slug: 'citation-detection',
    title: 'Citation Detection & Web Scraping System',
    tagline: 'Node.js backend pipeline for web scraping, citation extraction, and source verification.',
    description:
      'A backend system built with Node.js and Express that crawls web pages using Cheerio, detects and extracts citation patterns using regex, and maps AI-generated content fragments to their verified source URLs stored in SQLite.',
    tech: ['Node.js', 'Express.js', 'Cheerio', 'SQLite', 'Regex Parsing', 'REST API'],
    problem:
      'AI-generated content lacks verifiable citation trails. Fact-checking requires manually tracing sources, which does not scale. No structured backend existed to extract and store this mapping automatically.',
    solution:
      'Built a scraping pipeline that fetches web pages with Cheerio, parses structured content blocks, runs a regex engine across 12 citation pattern types, and stores source-citation mappings in SQLite. REST endpoints expose search and batch scrape.',
    architecture:
      'POST /scrape (URL input) → Cheerio HTTP fetch + HTML parse → Content block extraction → Regex citation engine (12 patterns) → URL normalization → SQLite INSERT → GET /citations exposes full-text search results',
    features: [
      'Express.js REST API with clean endpoint design (GET /citations, POST /scrape, POST /batch)',
      'Cheerio HTML scraping with configurable CSS selectors',
      'Regex engine covering 12 citation pattern formats',
      'SQLite with FTS5 full-text search for fast citation retrieval',
      'Batch endpoint for scraping multiple URLs in one request',
      'Source URL normalization and deduplication logic',
    ],
    challenges: [
      'HTML structure varies drastically across websites — required adaptive selector logic',
      'Designing regex patterns that catch varied citation formats without false positives',
      'SQLite FTS5 schema design to balance insert speed with query performance',
    ],
    learnings: [
      'Web scrapers must be defensive — always assume malformed or incomplete HTML',
      'Backend architecture is about data flow clarity, not endpoint count',
      'SQLite FTS5 is a powerful and underrated tool for text search at small-medium scale',
    ],
    status: 'completed',
    order: 2,
    githubUrl: 'https://github.com/Siddheshinde/Citation-Detection-Web-Scraping-System',
  },
  {
    _id: '3',
    slug: 'ai-image-catalog',
    title: 'AI Image Catalog Processing System',
    tagline: 'Scalable AI pipeline for automated bulk image classification, tagging, and semantic retrieval.',
    description:
      'A production-grade garment catalog automation system that processes large image datasets using computer vision for automated classification, attribute tagging, and semantic similarity search — eliminating manual cataloguing workflows.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis', 'Docker'],
    problem:
      'Fashion and e-commerce teams managing thousands of product images face a scaling crisis — manual classification and tagging is unsustainable. Keyword search misses semantic similarity between visually related items.',
    solution:
      'Built a distributed pipeline: Redis ingestion queue → worker processes run CNN inference → feature vectors stored in pgvector PostgreSQL → FastAPI serves classification results and semantic similarity search. Docker Compose orchestrates everything.',
    architecture:
      'Image upload → Redis ingestion queue → Worker: CNN inference + feature extraction → pgvector PostgreSQL (cosine similarity index) → FastAPI: GET /classify, GET /search?query → Redis cache for repeated lookups',
    features: [
      'Bulk image ingestion via REST API and filesystem watcher',
      'Fine-tuned CNN for multi-label garment attribute classification',
      'pgvector cosine similarity search for semantic product retrieval',
      'Redis async queue ensuring zero message loss during traffic spikes',
      'FastAPI with async endpoints and automatic OpenAPI documentation',
      'Docker Compose single-command deployment',
    ],
    challenges: [
      'Designing a horizontal ingestion pipeline that does not lose messages under load',
      'Balancing CNN classification accuracy against processing throughput per worker',
      'Implementing semantic search with pgvector without a dedicated vector database',
    ],
    learnings: [
      'Architecture decisions constrain production performance more than model accuracy',
      'pgvector is a practical, cost-effective alternative to Pinecone/Weaviate at moderate scale',
      'Async queue patterns solve backpressure problems that synchronous pipelines cannot',
    ],
    status: 'in-progress',
    order: 3,
    thumbnail: '/catalog-images/catalog-1.png',
    githubUrl: 'https://github.com/Siddheshinde/garment-catalog-automation',
  },
  {
    _id: '4',
    slug: 'animated-icecream',
    title: 'Animated Ice Cream Website',
    tagline: 'UX/UI case study — designing an immersive, flavour-first ice cream brand experience.',
    description:
      'A complete UX/UI design project for a premium animated ice cream brand website. Covers the full design process from research and personas through wireframes, design system, and high-fidelity Figma prototype with immersive flavour-led scenes.',
    tech: ['Figma', 'UX Research', 'Interaction Design', 'Prototyping', 'Design Systems'],
    problem:
      'Most ice cream brand websites are static, generic, and fail to evoke the sensory delight of the product. Users browsing for a premium treat want to feel immersed in the brand — not just read a menu.',
    solution:
      'Designed a flavour-led, animation-first website where each flavour has its own full-screen immersive scene. The scroll experience mirrors unwrapping an ice cream — full-bleed visuals, ambient typographic overlays, and smooth flavour transitions keep users engaged.',
    architecture:
`UX PROCESS OVERVIEW
──────────────────────────────────────────────────────
[1. Discover]  User research → Competitor audit → Affinity map
[2. Define]    Problem statement → Personas → User journey map
[3. Design]    IA → User flow → Lo-fi wireframes → Design system
[4. Deliver]   Hi-fi Figma prototype → Accessibility review → Handoff
──────────────────────────────────────────────────────

INFORMATION ARCHITECTURE
Home
├── Hero — full-screen flavour carousel (auto-play)
├── Flavours
│   ├── Frosted Velvet (Vanilla)
│   ├── Dark Desire (Chocolate)
│   └── [Additional seasonal flavours]
├── About — brand story & premium ingredients
└── Contact — store locator + enquiries

USER FLOW
User lands on site
    ↓
Full-screen animated hero loads (auto-play flavour carousel)
    ↓
User scrolls → flavour name appears as giant typographic overlay
    ↓
User clicks flavour → immersive scene (full-bleed bg + floating ingredients)
    ↓
Reads flavour description + sensory copywriting
    ↓
CTA: "Explore All Flavours" → Flavours grid page
    ↓
Contact / Store Locator

USER JOURNEY MAP
Phase        │ Action                           │ Feeling       │ Opportunity
─────────────┼──────────────────────────────────┼───────────────┼────────────────────
Discovery    │ Sees brand link on social media  │ Curious       │ Bold visual hook
Landing      │ Arrives on animated homepage     │ Wow / Delight │ Immersive hero
Exploration  │ Scrolls through flavour scenes   │ Delighted     │ Smooth transitions
Decision     │ Reads flavour name + description │ Craving grows │ Sensory copywriting
Intent       │ Looks for where to buy           │ Motivated     │ Clear CTA placement
Exit         │ Shares or bookmarks the site     │ Brand loyalty │ Easy social sharing

AFFINITY MAP — RESEARCH THEMES
┌──────────────────┬──────────────────┬───────────────────┬──────────────────────┐
│ Sensory Craving  │ Navigation       │ Brand Trust       │ Mobile Experience    │
├──────────────────┼──────────────────┼───────────────────┼──────────────────────┤
│ Wants to feel    │ Wants fast path  │ Wants to know     │ Expects touch-       │
│ the flavour      │ to specific      │ ingredient        │ friendly scroll and  │
│ before buying    │ flavour page     │ quality upfront   │ responsive layout    │
│                  │                  │                   │                      │
│ Animation makes  │ Hidden nav menus │ Artisan/premium   │ Full-bleed images    │
│ product feel     │ frustrate users  │ language builds   │ must load fast on    │
│ more premium     │ on first visit   │ trust quickly     │ mobile connections   │
└──────────────────┴──────────────────┴───────────────────┴──────────────────────┘

LOW FIDELITY WIREFRAMES

[HOME — Hero Section]
┌────────────────────────────────────────┐
│  NAV: Home  Flavours  About  Contact   │
│────────────────────────────────────────│
│                                        │
│         [FULL SCREEN IMAGE]            │
│                                        │
│   ████████  ← giant flavour name      │
│   ████████    typographic overlay      │
│                                        │
│   Flavour Title                        │
│   Flavour tagline — italic serif       │
│   Short flavour description            │
│                                        │
└────────────────────────────────────────┘

[FLAVOURS — Grid Page]
┌────────────────────────────────────────┐
│  NAV                                   │
│────────────────────────────────────────│
│  ┌───────────┐   ┌───────────┐         │
│  │  Flavour  │   │  Flavour  │         │
│  │   Image   │   │   Image   │         │
│  │   Name    │   │   Name    │         │
│  └───────────┘   └───────────┘         │
│                                        │
│  ┌───────────┐   ┌───────────┐         │
│  │  Flavour  │   │  Flavour  │         │
│  └───────────┘   └───────────┘         │
└────────────────────────────────────────┘

COMPETITIVE ANALYSIS
┌─────────────────┬─────────────┬───────────┬────────────┬───────────────┐
│ Brand           │ Animation   │ Mobile UX │ Immersion  │ Visual Style  │
├─────────────────┼─────────────┼───────────┼────────────┼───────────────┤
│ Baskin-Robbins  │ Minimal     │ Good      │ Low        │ Generic/safe  │
│ Häagen-Dazs     │ Subtle      │ Very good │ Medium     │ Luxury/clean  │
│ Ben & Jerry's   │ Playful     │ Good      │ Medium     │ Quirky/loud   │
│ THIS PROJECT    │ Immersive   │ Optimised │ High       │ Premium/bold  │
└─────────────────┴─────────────┴───────────┴────────────┴───────────────┘

USER PERSONAS

PERSONA 1 — "The Indulger"
Name: Priya, 26, Marketing Executive
Goal: Find a premium treat worth sharing on social media
Pain: Most brand sites feel boring; she wants something screenshot-worthy
Quote: "If the website looks this good, the ice cream must be incredible."

PERSONA 2 — "The Gift Buyer"
Name: Rahul, 34, Working Professional
Goal: Buy a premium gift for a celebration
Pain: Hard to distinguish quality brands online; needs trust signals fast
Quote: "I want to know it's premium before I even order."

DESIGN SYSTEM
┌──────────────────────────────────────────────────────────┐
│ COLOUR PALETTE                                           │
│  Vanilla BG:    #C8922A  — warm golden                   │
│  Chocolate BG:  #5C2D0E  — deep cocoa brown              │
│  Text Primary:  #FFFFFF  — clean white                   │
│  Text Warm:     #F5ECD7  — cream / off-white             │
│  Accent / CTA:  #FF9500  — vibrant orange                │
├──────────────────────────────────────────────────────────┤
│ TYPOGRAPHY                                               │
│  Display (flavour names):  bold condensed serif          │
│  Section headings:         bold sans / wide tracking     │
│  Body / descriptions:      italic serif / warm tone      │
│  Navigation:               small caps / wide tracking    │
├──────────────────────────────────────────────────────────┤
│ INTERACTION DESIGN                                       │
│  Scroll trigger: flavour name fades in as text overlay   │
│  Hover state:   floating ingredient particles animate    │
│  Transition:    cross-fade between full-bleed scenes     │
│  CTA buttons:   scale + warm glow on hover               │
├──────────────────────────────────────────────────────────┤
│ ACCESSIBILITY CHECKLIST                                  │
│  ✓ Colour contrast ratio > 4.5:1 on all body text        │
│  ✓ Keyboard navigable menu and flavour cards             │
│  ✓ Alt text on all product and ingredient images         │
│  ✓ Reduced motion fallback for scroll animations         │
│  ✓ Minimum touch target 44×44px on all mobile elements   │
└──────────────────────────────────────────────────────────┘`,
    features: [
      'Full-screen immersive flavour scenes with animated floating ingredient particles',
      'Typographic overlay system — giant flavour names layered behind product imagery',
      'Smooth cross-fade transitions between flavour scenes triggered on scroll',
      'Flavour-specific colour theming (warm gold for vanilla, deep cocoa for chocolate)',
      'Responsive layout optimised for mobile touch interaction and fast load',
      'Complete Figma component library with interactive auto-layout prototype',
      'Full design system: colour tokens, typography scale, spacing, components',
    ],
    challenges: [
      'Balancing heavy visual animation with readable text and accessible contrast ratios',
      'Designing scroll-triggered immersive experiences that work on both desktop and mobile',
      'Creating a typographic overlay system where giant text remains legible over full-bleed imagery',
      'Maintaining brand consistency across flavour scenes with completely different colour themes',
    ],
    learnings: [
      'Immersive web design works when visual hierarchy is maintained — emotion first, information second',
      'A design system built early prevents inconsistency when scaling across multiple scenes',
      'User research revealed that sensory language in copywriting is as important as the visuals themselves',
      'Mobile-first constraints improved layout discipline and spacing decisions across the desktop version too',
    ],
    status: 'completed',
    order: 4,
    thumbnail: '/icecream-images/icecream-1.png',
    liveUrl:
      'https://www.figma.com/proto/xSIv0wXO9s6sLFZd3yXd1l/Animated_icecream-webpage?node-id=6-74&p=f&t=GsjMg3NHOp663gWK-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
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
            ← Back to Projects
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
            {/* UX/UI badge for design projects */}
            {project.tech.includes('Figma') && (
              <span
                style={{
                  backgroundColor: 'rgba(255,149,0,0.15)',
                  color: '#ff9500',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 12px',
                  borderRadius: 999,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  border: '1px solid rgba(255,149,0,0.35)',
                }}
              >
                UX/UI Case Study
              </span>
            )}
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

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ff9500',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(255,149,0,0.4)',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 8,
                }}
              >
                {project.tech.includes('Figma') ? 'View Figma Prototype →' : 'Live Demo →'}
              </a>
            )}
          </div>
        </motion.div>

        {/* Thumbnail image */}
        {project.thumbnail && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <img
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid rgba(255,193,7,0.2)',
                display: 'block',
              }}
            />
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

          <ContentSection
            title={project.tech.includes('Figma') ? 'Design Process & Diagrams' : 'Architecture'}
            delay={0.2}
          >
            <div
              style={{
                backgroundColor: '#1a1a18',
                borderLeft: '3px solid #aa8517',
                borderRadius: '0 8px 8px 0',
                padding: '1.25rem 1.5rem',
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '0.82rem',
                color: '#fff4ca',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowX: 'auto',
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
            ← Back to Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}