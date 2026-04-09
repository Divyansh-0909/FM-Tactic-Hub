import { Component } from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#151E2E',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    padding: '40px 20px',
    fontFamily: 'SohneBreitExtrafettKursiv, sans-serif',
  },
  heading: {
    fontSize: 'clamp(2rem, 8vw, 10rem)',
    fontWeight: 900,
    margin: 0,
    background: 'linear-gradient(to right, #DDCAF8, rgb(128, 61, 223))',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    transform: 'scaleX(1.3)',
    letterSpacing: '-1px',
  },
  details: {
    backgroundColor: 'rgba(129, 61, 223, 0.1)',
    border: '1px solid rgba(176, 120, 255, 0.3)',
    borderRadius: '16px',
    padding: '24px 32px',
    maxWidth: '560px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontFamily: 'SöhneDreiviertelfett, sans-serif',
    color: 'rgb(176, 120, 255)',
    fontSize: '1.2rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    margin: 0,
  },
  message: {
    fontFamily: 'SöhneBuch, sans-serif',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem',
    margin: 0,
    lineHeight: 1.6,
  },
  button: {
    marginTop: '8px',
    padding: '12px 36px',
    backgroundColor: 'rgba(129, 61, 223, 0.83)',
    color: 'white',
    border: 'none',
    borderRadius: '32px',
    fontFamily: 'SöhneKraftig, sans-serif',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0px 6px 10px rgba(0,0,0,0.16), inset 0px 0px 15px 5px rgba(182, 138, 243, 0.58)',
    transition: 'opacity 0.3s ease',
  }
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>SOMETHING BROKE</h1>
          <div style={styles.details}>
            <p style={styles.label}>Error message</p>
            <p style={styles.message}>{this.state.error?.message || 'Unknown error'}</p>
            {this.state.error?.code && (
              <>
                <p style={styles.label}>Code</p>
                <p style={styles.message}>{this.state.error.code}</p>
              </>
            )}
          </div>
          <button
            style={styles.button}
            onMouseEnter={e => e.target.style.opacity = 0.8}
            onMouseLeave={e => e.target.style.opacity = 1}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
