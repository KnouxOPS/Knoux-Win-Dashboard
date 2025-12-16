import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #252525;
  border-right: 1px solid #404040;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const SectionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin: 5px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.active ? props.color + '20' : 'transparent'};
  border-left: 3px solid ${props => props.active ? props.color : 'transparent'};
  
  &:hover {
    background-color: ${props => props.color + '15'};
  }
`;

const SectionIcon = styled.span`
  margin-left: 12px;
  font-size: 18px;
`;

const SectionName = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const ScriptCount = styled.span`
  background-color: #404040;
  color: #cccccc;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const colors = {
  deep_cleaning: '#4CAF50',
  repair_restore: '#2196F3',
  system_check: '#00BCD4',
  optimization: '#FFEB3B',
  advanced_control: '#9C27B0',
  ready_apps: '#7C4DFF'
};

export default function Sidebar({ sections, onSelectSection, selectedSection }) {
  return (
    <SidebarContainer>
      {sections.map(section => (
        <SectionItem
          key={section.id}
          active={selectedSection === section.id}
          color={colors[section.id] || '#666666'}
          onClick={() => onSelectSection(section.id)}
        >
          <SectionIcon>📁</SectionIcon>
          <SectionName>{section.name}</SectionName>
          <ScriptCount>{section.scripts?.length || 0}</ScriptCount>
        </SectionItem>
      ))}
    </SidebarContainer>
  );
}