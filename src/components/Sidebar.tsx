import React from 'react';
import styled from 'styled-components';
import { Section } from '../types';
import { Layers, Shield, Activity, Zap, Box, Settings, Terminal } from 'lucide-react';

interface SidebarProps {
  sections: Section[];
  activeId: string;
  onSelect: (id: string) => void;
}

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  background: rgba(15, 23, 32, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  flex-shrink: 0;
  z-index: 10;
`;

const Brand = styled.div`
  padding: 0 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 24px;
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: var(--knx-purple);
    text-shadow: 0 0 15px var(--knx-purple);
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 16px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar { width: 4px; }
`;

const NavItem = styled.button<{ active: boolean; color: string }>`
  background: ${props => props.active ? 'rgba(124, 58, 237, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? props.color : 'transparent'};
  color: ${props => props.active ? '#fff' : '#94a3b8'};
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    padding-left: 20px;
  }

  ${props => props.active && `
    box-shadow: 0 0 15px ${props.color}20;
    padding-left: 20px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${props.color};
      box-shadow: 0 0 10px ${props.color};
    }
  `}
`;

const SectionName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 11px;
  color: var(--knx-muted);
  text-align: center;
`;

const getIcon = (id: string) => {
  switch (id) {
    case 'deep_cleaning': return <Layers size={18} />;
    case 'repair_restore': return <Activity size={18} />;
    case 'system_check': return <Shield size={18} />;
    case 'optimization': return <Zap size={18} />;
    case 'advanced_control': return <Settings size={18} />;
    default: return <Box size={18} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeId, onSelect }) => {
  return (
    <SidebarContainer>
      <Brand>
        <LogoText>
          <Terminal size={28} color="var(--knx-cyan)" />
          KNOUX<span>WIN</span>
        </LogoText>
      </Brand>

      <NavList>
        {sections.map(section => (
          <NavItem
            key={section.id}
            active={activeId === section.id}
            color={section.color}
            onClick={() => onSelect(section.id)}
          >
            {getIcon(section.id)}
            <SectionName>{section.name}</SectionName>
          </NavItem>
        ))}
      </NavList>

      <Footer>
        SYSTEM STATUS: STABLE<br/>v2.5.0 CYBERPUNK
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;