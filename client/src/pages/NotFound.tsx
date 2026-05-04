import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Siddhesh Shinde';
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1d1b18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Public Sans', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', maxWidth: 480 }}
      >
        <h1
          style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: 'clamp(5rem, 18vw, 9rem)',
            color: '#ff9500',
            lineHeight: 1,
            margin: '0 0 0.5rem',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "'Russo One', sans-serif",
            fontSize: '1.5rem',
            color: '#fff4ca',
            margin: '0 0 1rem',
            fontWeight: 400,
          }}
        >
          Page not found
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: '#f3e8d8',
            opacity: 0.75,
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            backgroundColor: '#aa8517',
            color: '#1d1b18',
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '0.75rem 2rem',
            borderRadius: 8,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
