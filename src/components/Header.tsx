import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from './NightModeProvider';
import { ThemeToggle } from './ThemeToggle';
import { Search, Play, Monitor, Minus, Maximize2, X, Loader2, Settings, HelpCircle } from 'lucide-react';

interface HeaderProps {
  isBatchRunning: boolean;
  onRunAll: () => void;
  filterText: string;
  setFilterText: (t: string) => void;
  totalScripts: number;
  completedCount: number;
  queueLength: number;
  onOpenSettings: () => void;
}

interface TopBarContainerProps {
  cyberGlow: boolean;
  themeMode: string;
}

const TopBarContainer = styled.div<TopBarContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
  background: ${props => props.themeMode === 'light' 
    ? '#ffffff' 
    : 'linear-gradient(145deg, rgba(26,26,46,0.9), rgba(22,33,62,0.9))'};
  border-bottom: 2px solid #00f5ff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  shrink: 0;
  
  ${props => props.cyberGlow && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #00f5ff, #ff00ff, #ffff00, #00f5ff);
      background-size: 200% auto;
      animation: cyber-border 3s linear infinite;
    }
    
    @keyframes cyber-border {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
  `}
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div<{ cyberGlow: boolean }>`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #00f5ff, #008cff);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: #000;
  border: 2px solid #00f5ff;
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
  animation: ${props => props.cyberGlow ? 'logo-pulse 2s infinite' : 'none'};
  
  @keyframes logo-pulse {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 245, 255, 0.3); }
    50% { box-shadow: 0 0 25px rgba(0, 245, 255, 0.8); }
  }
`;

const AppName = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #00f5ff;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 1px;
`;

const StatusIndicator = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #00ff88;
  box-shadow: 0 0 15px #00ff88;
  animation: status-pulse 1.5s infinite;
  
  @keyframes status-pulse {
    0%, 100% { box-shadow: 0 0 5px #00ff88; }
    50% { box-shadow: 0 0 20px #00ff88; }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? 'linear-gradient(145deg, #00f5ff, #008cff)' : 'transparent'};
  color: ${props => props.primary ? '#000' : '#00f5ff'};
  border: 2px solid #00f5ff;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  
  &:hover {
    background: ${props => props.primary ? 'linear-gradient(145deg, #00f5ff, #ff00ff)' : '#00f5ff'};
    color: ${props => props.primary ? '#000' : '#000'};
    box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid #00f5ff;
  color: #fff;
  font-size: 13px;
  width: 200px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 245, 255, 0.3);
  }
`;

export const Header: React.FC<HeaderProps> = ({ 
  isBatchRunning, 
  onRunAll, 
  filterText, 
  setFilterText,
  onOpenSettings
}) => {
  const { theme, changeTheme, settings } = useTheme();

  return (
    <TopBarContainer cyberGlow={settings.cyberGlow} themeMode={theme}>
      <LogoSection>
        <Logo cyberGlow={settings.cyberGlow}>K</Logo>
        <AppName>KNOUX WIN</AppName>
        <StatusIndicator title="System Online" />
      </LogoSection>
      
      <div className="flex items-center gap-4">
        <ThemeToggle 
            currentTheme={theme} 
            onThemeChange={changeTheme}
            settings={settings}
        />
        
        <SearchInput 
            placeholder="Search scripts..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <Controls>
        <IconButton onClick={onOpenSettings}>
             <Settings size={16} />
        </IconButton>
        <IconButton>
            <HelpCircle size={16} />
        </IconButton>
        <IconButton primary onClick={onRunAll} disabled={isBatchRunning}>
            {isBatchRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />} 
            Run All
        </IconButton>
      </Controls>
    </TopBarContainer>
  );
};