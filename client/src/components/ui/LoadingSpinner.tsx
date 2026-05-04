interface Props {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

const sizes = { sm: 24, md: 40, lg: 56 };

export default function LoadingSpinner({ size = 'md', fullPage = false }: Props) {
  const px = sizes[size];

  const spinner = (
    <div
      style={{
        width: px,
        height: px,
        border: `3px solid rgba(170,133,23,0.2)`,
        borderTop: `3px solid #aa8517`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {fullPage ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          {spinner}
        </div>
      ) : spinner}
    </>
  );
}
