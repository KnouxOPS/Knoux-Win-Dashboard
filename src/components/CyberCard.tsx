import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { cyberpunkTheme } from '../themes/cyberpunk';
import { Script, ScriptStatus, AppSettings } from '../types';
import { Play, Terminal, Shield, Cpu, HardDrive, Trash2, Wifi, Loader2, Cloud, Package, FileText, Monitor, Check, AlertTriangle, RefreshCw } from 'lucide-react';

interface CyberCardProps {
  script: Script;
  status: ScriptStatus;
  onExecute: (s: Script) => void;
  settings: AppSettings;
}

const pulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 245, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 245, 255, 0.3); }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const CardContainer = styled.div<{ glow: boolean, glitchEffect: boolean, borderColor?: string }>`
  background: ${cyberpunkTheme.gradients.card};
  border: 2px solid ${props => props.borderColor || cyberpunkTheme.colors.primary};
  border-radius: ${cyberpunkTheme.borderRadius.medium};
  padding: 16px;
  height: 160px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: ${cyberpunkTheme.transitions.normal};
  position: relative;
  overflow: hidden;
  box-shadow: ${cyberpunkTheme.effects.shadow.card};
  
  ${props => props.glow && css`
    animation: ${pulse} 2s infinite;
  `}
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${cyberpunkTheme.colors.secondary};
    
    ${props => props.glitchEffect && css`
      animation: ${glitch} 0.3s infinite;
    `}
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div<{ color?: string }>`
  width: 36px;
  height: 36px;
  background: ${props => props.color ? `linear-gradient(135deg, ${props.color}, ${props.color}80)` : cyberpunkTheme.gradients.button};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: #fff;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${cyberpunkTheme.colors.text};
  flex: 1;
`;

const Description = styled.p`
  margin: 0 0 12px 0;
  font-size: 11px;
  color: ${cyberpunkTheme.colors.textSecondary};
  flex: 1;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span<{ status: ScriptStatus }>`
  background: ${props => props.status === 'running' ? cyberpunkTheme.colors.warning : props.status === 'success' ? cyberpunkTheme.colors.success : props.status === 'error' ? cyberpunkTheme.colors.error : 'rgba(255,255,255,0.1)'};
  color: ${props => props.status === 'idle' ? cyberpunkTheme.colors.textSecondary : '#000'};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
`;

const ActionButton = styled.button`
  background: transparent;
  color: ${cyberpunkTheme.colors.primary};
  border: 1px solid ${cyberpunkTheme.colors.primary};
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: ${cyberpunkTheme.colors.primary};
    color: #000;
  }
`;

const getIcon = (name: string, iconName?: string) => {
  const target = (iconName || name).toLowerCase();
  if (target.includes('clean')) return <Trash2 size={18} />;
  if (target.includes('cpu') || target.includes('ram')) return <Cpu size={18} />;
  if (target.includes('disk')) return <HardDrive size={18} />;
  if (target.includes('net')) return <Wifi size={18} />;
  if (target.includes('repair')) return <Shield size={18} />;
  return <Terminal size={18} />;
};

export const CyberCard: React.FC<CyberCardProps> = ({ script, status, onExecute, settings }) => {
  const color = cyberpunkTheme.colors.primary; 

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExecute(script);
  };

  return (
    <CardContainer 
      glow={settings.cyberGlow && status === 'running'}
      glitchEffect={settings.visualEffects}
      borderColor={status === 'running' ? cyberpunkTheme.colors.warning : undefined}
      onClick={handleClick}
    >
      <CardHeader>
        <IconWrapper color={color}>
          {status === 'running' ? <Loader2 className="animate-spin" size={18} /> :
           status === 'success' ? <Check size={18} /> :
           status === 'error' ? <AlertTriangle size={18} /> :
           getIcon(script.name, script.icon)}
        </IconWrapper>
        <Title>{script.name}</Title>
      </CardHeader>
      
      <Description>{script.description || script.script}</Description>
      
      <CardFooter>
        <StatusBadge status={status}>{status}</StatusBadge>
        <ActionButton onClick={handleClick}>
           <Play size={10} fill="currentColor" /> Run
        </ActionButton>
      </CardFooter>
    </CardContainer>
  );
};