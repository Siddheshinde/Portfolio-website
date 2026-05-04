import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';

// ─── Seed Data ───────────────────────────────────────────────────────────────

const projects = [
  {
    slug: 'nutrilens',
    title: 'NutriLens',
    tagline: 'AI-powered food recognition and nutrition tracker for Indian cuisine',
    description:
      'A mobile application that uses computer vision to detect Indian food items from images and automatically estimate their nutritional content, eliminating manual calorie tracking.',
    tech: ['Python', 'YOLOv8', 'Flask', 'React Native', 'Firebase', 'Roboflow', 'Google OAuth'],
    problem:
      'Most calorie-tracking apps rely on manual input, which is time-consuming, error-prone, and ultimately leads users to abandon consistent tracking. For Indian food specifically, no reliable automated solution existed.',
    solution:
      'Built a custom YOLOv8 computer vision model trained on 1100+ Indian food images using Roboflow. The model achieves 89.4% mAP@50 accuracy. Integrated with a Flask backend and React Native mobile frontend for seamless user experience.',
    architecture:
      'User captures image via React Native app → Image sent as multipart/form-data to Flask backend → YOLOv8 model runs inference → Detected items matched to nutritional database → Results stored in Firebase → Response returned to client with nutrition breakdown',
    features: [
      'Custom YOLOv8 model achieving 89.4% mAP@50 accuracy',
      'Dataset of 1100+ Indian food images with Roboflow augmentation',
      'Transfer learning from COCO pretrained weights for better performance',
      'Real-time food detection via mobile camera',
      'Firebase Firestore for user data and history persistence',
      'Google OAuth 2.0 authentication',
      'Streak tracking system to encourage consistency',
      'Analytics dashboard showing calorie trends over time',
    ],
    challenges: [
      'Sourcing a diverse dataset representative of regional Indian food variety',
      'Balancing model accuracy (mAP) against inference speed on mobile hardware',
      'Handling similar-looking foods (e.g., different dal varieties) without misclassification',
      'Designing a clean data pipeline from raw image to nutrition data display',
    ],
    learnings: [
      'Data quality and diversity matters more than model architecture choice',
      'Real-world ML accuracy requires iterative tuning, not just one training run',
      'Integrating ML models into mobile apps requires careful API design for latency',
      'Augmentation techniques (flip, rotate, brightness) significantly improve generalization',
    ],
    status: 'completed',
    order: 1,
    thumbnail: '',
    githubUrl: 'https://github.com/siddheshshinde',
    liveUrl: '',
  },
  {
    slug: 'citation-detection',
    title: 'Citation Detection & Web Scraping System',
    tagline: 'Backend system for extracting and verifying citations from web content',
    description:
      'A Node.js backend system that scrapes web content using Cheerio, detects citation patterns in AI-generated responses, and maps them to verified source URLs stored in SQLite.',
    tech: ['Node.js', 'Express.js', 'Cheerio', 'SQLite', 'REST API', 'Regex Parsing'],
    problem:
      'With the rise of AI-generated content, verifying the source of information has become critical. No structured system existed to extract citations from responses, match them to actual source documents, and store them for retrieval.',
    solution:
      'Built a backend pipeline that crawls web pages with Cheerio, extracts structured content blocks, runs regex-based citation pattern detection, and stores the source-citation mappings in SQLite for fast querying via REST endpoints.',
    architecture:
      'Input URL → Cheerio HTTP fetch + HTML parse → Content block extraction → Regex citation pattern matching → Source URL normalization → SQLite INSERT → REST API exposes GET /citations?query and POST /scrape',
    features: [
      'Express.js REST API with clean endpoint design',
      'Cheerio-based HTML scraping with configurable selectors',
      'Regex engine for detecting 12 citation patterns (APA, MLA, inline, URL references)',
      'SQLite database with indexed source and citation tables',
      'Structured HTML content extraction preserving document hierarchy',
      'Query API: search citations by keyword, source domain, or date',
      'Batch scrape endpoint for processing multiple URLs',
    ],
    challenges: [
      'HTML structures vary drastically across websites requiring adaptive scraping logic',
      'Designing regex patterns general enough to catch varied citation formats without false positives',
      'Efficient SQLite schema design for fast full-text search across large reference sets',
    ],
    learnings: [
      'Web scraping must be defensive — always expect malformed or missing HTML',
      'Backend architecture is fundamentally about data flow clarity, not just endpoint count',
      'SQLite FTS5 (full-text search) dramatically improves query performance over LIKE operators',
      'Separation of scraping logic, pattern matching, and storage enables easy testing',
    ],
    status: 'completed',
    order: 2,
    thumbnail: '',
    githubUrl: 'https://github.com/siddheshshinde',
    liveUrl: '',
  },
  {
    slug: 'franchise-management',
    title: 'Enterprise Franchise Management System',
    tagline: 'Full-stack operations platform for franchise inventory, staff, and sales',
    description:
      'A PHP/MySQL full-stack web application providing centralized management for franchise operations including inventory tracking, staff management, sales monitoring, and role-based access control.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'RBAC', 'MVC Architecture'],
    problem:
      'Franchise businesses struggle with disconnected systems for inventory, staff, and sales. Most small-scale solutions lack integration — managers use spreadsheets, access is uncontrolled, and there is no single source of truth for business operations.',
    solution:
      'Designed and built a PHP MVC application with a normalized MySQL schema. Implemented RBAC so Admins, Managers, and Staff see only relevant modules. A centralized dashboard aggregates real-time data across all operational areas.',
    architecture:
      'PHP MVC: controllers handle HTTP → models execute SQL via PDO → views render with template partials. MySQL normalized to 3NF with foreign key constraints. Sessions manage authentication state. RBAC middleware checks role on every protected route.',
    features: [
      'Role-based access control: Admin, Manager, Staff tiers',
      'Inventory module with low-stock alerts and reorder tracking',
      'Sales recording with daily/weekly/monthly report generation',
      'Staff management: onboarding, shift scheduling, role assignment',
      'Real-time dashboard with live metrics and KPIs',
      'Secure authentication with bcrypt password hashing',
      'Input sanitization and prepared statements to prevent SQL injection',
    ],
    challenges: [
      'Designing a normalized relational schema that supports complex reporting queries without performance degradation',
      'Building RBAC middleware that is extensible and does not require changes to every route',
      'Creating a real-time-feeling dashboard without WebSockets (polling strategy)',
    ],
    learnings: [
      'Database normalization is a prerequisite for scalable reporting — denormalize only when justified by benchmarks',
      'Security cannot be retrofitted — authentication and input validation must be designed in from day one',
      'Internal tools still need good UX; poor UI leads to workarounds that corrupt data integrity',
    ],
    status: 'completed',
    order: 3,
    thumbnail: '',
    githubUrl: 'https://github.com/siddheshshinde',
    liveUrl: '',
  },
  {
    slug: 'crypto-prediction',
    title: 'Cryptocurrency Prediction & Analysis System',
    tagline: 'Random Forest ML model for Bitcoin trend prediction with visual analytics',
    description:
      'A Python machine learning system that predicts Bitcoin price trends using Random Forest classification with extensive feature engineering, served through interactive Streamlit and Tkinter dashboards with 20+ visualizations.',
    tech: [
      'Python',
      'Random Forest',
      'Streamlit',
      'Tkinter',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Scikit-learn',
    ],
    problem:
      'Cryptocurrency markets are highly volatile. Most analysis tools are either too complex for beginners or present raw data without actionable insights. There was a need for a system that both predicts trends and explains the underlying patterns visually.',
    solution:
      'Engineered 30+ technical indicators as features (RSI, MACD, Bollinger Bands, volume ratios). Trained a Random Forest classifier on historical BTC OHLCV data. Built interactive dashboards in both Streamlit (web) and Tkinter (desktop) exposing all predictions and visualizations.',
    architecture:
      'Historical OHLCV data from Yahoo Finance API → Pandas feature engineering (30+ indicators) → Train/test split with time-series awareness → Random Forest training + GridSearchCV tuning → Joblib model serialization → Streamlit web UI + Tkinter desktop UI both load saved model',
    features: [
      'Random Forest classifier with GridSearchCV hyperparameter tuning',
      '30+ engineered features: RSI, MACD, Bollinger Bands, volume ratios, rolling statistics',
      '20+ interactive visualizations: candlestick charts, feature importance, correlation heatmaps',
      'Time-series aware train/test split to prevent data leakage',
      'Streamlit web dashboard for browser-based access',
      'Tkinter desktop application for offline use',
      'Model performance metrics: accuracy, precision, recall, F1, confusion matrix',
    ],
    challenges: [
      'Preventing data leakage from future price data into feature calculations',
      'Selecting features that are actually predictive vs. spuriously correlated with past prices',
      'Designing visualizations that communicate model confidence alongside raw predictions',
    ],
    learnings: [
      'Feature selection is more impactful than model choice for structured financial data',
      'Time-series cross-validation is essential — random splits produce deceptively high accuracy',
      'Visualizations must communicate uncertainty, not just point predictions',
      'Model evaluation requires domain-specific metrics beyond accuracy alone',
    ],
    status: 'completed',
    order: 4,
    thumbnail: '',
    githubUrl: 'https://github.com/siddheshshinde',
    liveUrl: '',
  },
  {
    slug: 'ai-image-catalog',
    title: 'AI Image Catalog Processing System',
    tagline: 'Scalable AI pipeline for intelligent bulk image classification and retrieval',
    description:
      'A production-grade system currently in development that processes large image datasets using computer vision for automated classification, tagging, and semantic retrieval at scale.',
    tech: [
      'Python',
      'TensorFlow',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Computer Vision',
    ],
    problem:
      'Organizations managing large image libraries face a fundamental scaling problem: manual classification and tagging breaks down beyond thousands of images. Search is keyword-dependent and misses semantic similarity. There is no automated way to organize, classify, and retrieve images intelligently.',
    solution:
      'Building a distributed processing pipeline that ingests bulk images, runs AI classification through a fine-tuned CNN, extracts feature vectors for semantic similarity, and serves results via a FastAPI backend with Redis caching for sub-100ms retrieval.',
    architecture:
      'Image ingestion queue (Redis) → Worker processes fetch and run CNN inference → Feature vectors stored in pgvector PostgreSQL extension → FastAPI exposes classification results + semantic search → Docker Compose orchestrates all services',
    features: [
      'Bulk image ingestion via REST API or filesystem watch',
      'Fine-tuned CNN for multi-label image classification',
      'Feature vector extraction for semantic similarity search',
      'pgvector-powered cosine similarity search in PostgreSQL',
      'Redis queue for scalable async processing',
      'FastAPI with async endpoints and automatic OpenAPI docs',
      'Docker Compose for reproducible deployment',
    ],
    challenges: [
      'Designing an ingestion pipeline that scales horizontally without message loss',
      'Balancing classification accuracy with throughput (images processed per second)',
      'Implementing semantic search efficiently without a dedicated vector database',
    ],
    learnings: [
      'System architecture decisions (queue design, storage schema) constrain performance more than model choice',
      'Production ML requires monitoring for distribution shift, not just initial accuracy',
      'pgvector is a practical alternative to dedicated vector databases for moderate scale',
    ],
    status: 'in-progress',
    order: 5,
    thumbnail: '',
    githubUrl: 'https://github.com/siddheshshinde',
    liveUrl: '',
  },
];

const skills = [
  // languages
  { category: 'languages', name: 'Python', level: 90, order: 1 },
  { category: 'languages', name: 'JavaScript', level: 85, order: 2 },
  { category: 'languages', name: 'TypeScript', level: 80, order: 3 },
  { category: 'languages', name: 'C++', level: 70, order: 4 },
  { category: 'languages', name: 'PHP', level: 65, order: 5 },
  { category: 'languages', name: 'SQL', level: 82, order: 6 },
  // backend
  { category: 'backend', name: 'Node.js', level: 85, order: 1 },
  { category: 'backend', name: 'Express.js', level: 85, order: 2 },
  { category: 'backend', name: 'Flask', level: 80, order: 3 },
  { category: 'backend', name: 'REST API Design', level: 90, order: 4 },
  { category: 'backend', name: 'FastAPI', level: 70, order: 5 },
  // ml
  { category: 'ml', name: 'YOLOv8 / Computer Vision', level: 85, order: 1 },
  { category: 'ml', name: 'TensorFlow / PyTorch', level: 75, order: 2 },
  { category: 'ml', name: 'Scikit-learn', level: 82, order: 3 },
  { category: 'ml', name: 'Feature Engineering', level: 80, order: 4 },
  { category: 'ml', name: 'Data Processing (Pandas)', level: 88, order: 5 },
  // frontend
  { category: 'frontend', name: 'React', level: 85, order: 1 },
  { category: 'frontend', name: 'React Native', level: 75, order: 2 },
  { category: 'frontend', name: 'Tailwind CSS', level: 90, order: 3 },
  { category: 'frontend', name: 'Framer Motion', level: 80, order: 4 },
  { category: 'frontend', name: 'Next.js', level: 75, order: 5 },
  // databases
  { category: 'databases', name: 'MongoDB', level: 82, order: 1 },
  { category: 'databases', name: 'MySQL / PostgreSQL', level: 80, order: 2 },
  { category: 'databases', name: 'SQLite', level: 75, order: 3 },
  { category: 'databases', name: 'Firebase', level: 80, order: 4 },
  { category: 'databases', name: 'Redis', level: 65, order: 5 },
  // tools
  { category: 'tools', name: 'Git / GitHub', level: 92, order: 1 },
  { category: 'tools', name: 'Docker', level: 70, order: 2 },
  { category: 'tools', name: 'Roboflow', level: 85, order: 3 },
  { category: 'tools', name: 'Streamlit', level: 82, order: 4 },
  { category: 'tools', name: 'Vercel / Render', level: 80, order: 5 },
];

const experiences = [
  {
    title: 'Festival Director',
    organization: "Oculus — SPIT Cultural Festival",
    period: '2023 – 2024',
    type: 'leadership',
    description:
      "Led the full organization of Oculus, SPIT's largest annual cultural festival. Coordinated a 100+ member team spanning technical, creative, logistics, and PR divisions. Responsible for end-to-end event planning, sponsor coordination, budget management, and live execution.",
    impact: [
      '3,000+ attendees across 3 days',
      '100+ member cross-functional team',
      'Complete festival brand identity design',
      'Sponsor acquisition and coordination',
      'Zero critical incidents across all event days',
    ],
    order: 1,
  },
  {
    title: 'B.Tech Computer Science Engineering',
    organization: "Sardar Patel Institute of Technology, Mumbai",
    period: '2021 – 2025',
    type: 'academic',
    description:
      "Bachelor of Technology in Computer Science at one of Mumbai's top engineering colleges. Focus areas: Data Structures & Algorithms, Machine Learning, Database Management Systems, Operating Systems, Computer Networks, and Web Technologies.",
    impact: [
      '270+ DSA problems solved across platforms',
      'ML specialization with real project deployments',
      'Full-stack development proficiency',
      'Strong fundamentals in OS, DBMS, CN',
    ],
    order: 2,
  },
  {
    title: 'Creative Director',
    organization: 'SPIT Design & Media Cell',
    period: '2022 – 2024',
    type: 'creative',
    description:
      'Headed the creative and visual direction for college events, student organizations, and the Oculus festival. Produced complete brand systems from typography and color palettes to motion graphics and 3D assets.',
    impact: [
      'Festival branding adopted across all 2023-24 events',
      'Poster design suite for 10+ events',
      'Blender 3D renders for promotional content',
      'Motion graphics for social media campaigns',
    ],
    order: 3,
  },
];

// ─── Seeding Logic ────────────────────────────────────────────────────────────

const seed = async () => {
  try {
    await connectDB();

    console.log('Dropping existing collections...');
    await Promise.all([
      Project.deleteMany({}),
      Contact.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
    ]);
    console.log('All collections cleared.');

    // Insert projects
    const insertedProjects = await Project.insertMany(projects);
    console.log(`Inserted ${insertedProjects.length} projects.`);

    // Insert skills
    const insertedSkills = await Skill.insertMany(skills);
    console.log(`Inserted ${insertedSkills.length} skills.`);

    // Insert experiences
    const insertedExperiences = await Experience.insertMany(experiences);
    console.log(`Inserted ${insertedExperiences.length} experiences.`);

    console.log('Seed completed successfully.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    if (err.errors) {
      Object.entries(err.errors).forEach(([field, e]) => {
        console.error(`  Validation error on "${field}": ${e.message}`);
      });
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

// Top-level await — requires "type": "module" in package.json
await seed();
