import React from 'react';
import styled from 'styled-components';
import { cyberpunkTheme } from '../themes/cyberpunk';
import { AppSettings } from '../types';

interface ThemeToggleProps {
  currentTheme: string;
  onThemeChange: (theme: AppSettings['theme']) => void;
  settings: AppSettings;
}

const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  background: ${cyberpunkTheme.gradients.card};
  border: 1px solid ${cyberpunkTheme.colors.primary};
  border-radius: 20px;
`;

const ThemeButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? cyberpunkTheme.gradients.button : 'transparent'};
  color: ${props => props.active ? '#000' : cyberpunkTheme.colors.primary};
  border: none;
  padding: 6px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 10px;
  
  &:hover {
    background: ${props => props.active ? cyberpunkTheme.gradients.button : 'rgba(0, 245, 255, 0.1)'};
  }
`;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <ThemeSwitcher>
      <ThemeButton active={currentTheme === 'dark'} onClick={() => onThemeChange('dark')}>Dark</ThemeButton>
      <ThemeButton active={currentTheme === 'light'} onClick={() => onThemeChange('light')}>Light</ThemeButton>
      <ThemeButton active={currentTheme === 'cyberpunk'} onClick={() => onThemeChange('cyberpunk')}>Cyber</ThemeButton>
    </ThemeSwitcher>
  );
};