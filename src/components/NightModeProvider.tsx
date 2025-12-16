import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'cyberpunk',
  visualEffects: true,
  cyberGlow: true,
  animationSpeed: 'normal',
  parallelExecution: false,
  maxConcurrent: 1,
  cacheEnabled: true,
  confirmSensitive: true,
  activityLogging: false,
  killTimeout: 10000,
  gridColumns: 4,
  cardStyle: 'cyberpunk',
  accentColor: '#00f5ff'
};

interface ThemeContextType {
  theme: string;
  changeTheme: (theme: AppSettings['theme']) => void;
  settings: AppSettings;
  updateSettings: (settings: AppSettings) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const GlobalStyles = createGlobalStyle`
  body.cyberpunk-theme {
    background: linear-gradient(135deg, #0a0a1a, #16213e);
    color: #ffffff;
    font-family: 'Segoe UI', sans-serif;
  }
  
  body.light-theme {
    background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
    color: #333333;
    font-family: 'Segoe UI', sans-serif;
  }
  
  body.dark-theme {
    background: linear-gradient(135deg, #131519, #1A1D23);
    color: #E0E6ED;
    font-family: 'Segoe UI', sans-serif;
  }
  
  body {
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

const ThemeWrapper = styled.div<{ themeName: string }>`
  min-height: 100vh;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  ${props => props.themeName === 'cyberpunk' && `
    background: linear-gradient(135deg, #0a0a1a, #16213e);
  `}
  
  ${props => props.themeName === 'light' && `
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    color: #333333;
  `}
  
  ${props => props.themeName === 'dark' && `
    background: linear-gradient(135deg, #131519, #1A1D23);
    color: #E0E6ED;
  `}
`;

interface NightModeProviderProps {
  children: ReactNode;
}

export const NightModeProvider: React.FC<NightModeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<AppSettings['theme']>('cyberpunk');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem('knoux-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        if (parsed.theme) {
          setTheme(parsed.theme);
          document.body.className = `${parsed.theme}-theme`;
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    } else {
      document.body.className = `cyberpunk-theme`;
    }
  }, []);

  const changeTheme = (newTheme: AppSettings['theme']) => {
    setTheme(newTheme);
    setSettings(prev => ({ ...prev, theme: newTheme }));
    document.body.className = `${newTheme}-theme`;
    
    const newSettings = { ...settings, theme: newTheme };
    localStorage.setItem('knoux-settings', JSON.stringify(newSettings));
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    if (newSettings.theme !== theme) {
      setTheme(newSettings.theme);
      document.body.className = `${newSettings.theme}-theme`;
    }
    localStorage.setItem('knoux-settings', JSON.stringify(newSettings));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, settings, updateSettings }}>
      <GlobalStyles />
      <ThemeWrapper themeName={theme}>
        {children}
      </ThemeWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a NightModeProvider');
  }
  return context;
};