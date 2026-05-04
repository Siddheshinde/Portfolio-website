interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem' }}>
      <div style={{
        background: '#282621',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 12,
        padding: '2rem',
        maxWidth: 480,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: '1rem' }}>⚠️</div>
        <p style={{ color: '#f3e8d8', marginBottom: '1.5rem', lineHeight: 1.6 }}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              background: '#aa8517',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.6rem 1.5rem',
              fontFamily: "'Public Sans', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#8a6a12')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#aa8517')}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
