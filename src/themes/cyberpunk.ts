export const cyberpunkTheme = {
  colors: {
    primary: '#00f5ff',
    secondary: '#ff00ff',
    accent: '#ff6b00',
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0055',
    background: '#0a0a1a',
    surface: '#12122a',
    text: '#ffffff',
    textSecondary: '#a0a0ff'
  },
  gradients: {
    card: 'linear-gradient(145deg, #1a1a2e, #16213e)',
    button: 'linear-gradient(145deg, #00f5ff, #008cff)',
    buttonSecondary: 'linear-gradient(145deg, #ff00ff, #8c00ff)',
    hover: 'linear-gradient(145deg, #00f5ff, #ff00ff)'
  },
  effects: {
    glow: {
      primary: '0 0 20px rgba(0, 245, 255, 0.5)',
      secondary: '0 0 20px rgba(255, 0, 255, 0.5)',
      success: '0 0 20px rgba(0, 255, 136, 0.5)',
      error: '0 0 20px rgba(255, 0, 85, 0.5)',
      warning: '0 0 20px rgba(255, 255, 0, 0.5)'
    },
    shadow: {
      card: '0 10px 30px rgba(0, 0, 0, 0.5)',
      button: '0 5px 15px rgba(0, 0, 0, 0.3)'
    }
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    circle: '50%'
  },
  transitions: {
    fast: 'all 0.2s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  },
  hoverEffects: {
    scale: 'transform: scale(1.05);',
    glow: 'box-shadow: 0 0 25px currentColor;',
    lift: 'transform: translateY(-5px);'
  }
};