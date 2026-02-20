export default function Loading() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '5px solid rgba(255,255,255,0.3)',
                borderTopColor: '#ff7675',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
