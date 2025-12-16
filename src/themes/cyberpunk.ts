export const cyberpunkTheme = {
  colors: {
    primary: '#00d1ff',      // Cyan
    secondary: '#7c3aed',    // Knoux Purple
    accent: '#00d1ff',       // Cyan Accent
    success: '#22c55e',      // Neon Green
    warning: '#f59e0b',      // Amber
    error: '#ff3860',        // Neon Red
    background: '#0b0f14',   // Deep Dark Blue/Black
    surface: '#0f1720',      // Slightly lighter panel
    text: '#e2e8f0',         // Slate 200
    textSecondary: '#94a3b8' // Slate 400
  },
  gradients: {
    card: 'linear-gradient(145deg, rgba(15, 23, 32, 0.9), rgba(11, 15, 20, 0.95))',
    button: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    buttonHover: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    activeBorder: 'linear-gradient(90deg, #7c3aed, #00d1ff)'
  },
  effects: {
    glow: {
      soft: '0 6px 20px rgba(124, 58, 237, 0.18)',
      strong: '0 0 15px rgba(0, 209, 255, 0.4)',
      success: '0 0 15px rgba(34, 197, 94, 0.4)',
      error: '0 0 15px rgba(255, 56, 96, 0.4)'
    },
    glass: 'backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);',
    shadow: {
      card: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
    }
  },
  borderRadius: {
    small: '4px',
    medium: '12px',
    large: '16px',
    round: '50%'
  },
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  }
};