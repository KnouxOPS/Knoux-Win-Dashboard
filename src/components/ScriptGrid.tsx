import React from 'react';
import styled from 'styled-components';
import { Section, Script } from '../types';
import { CyberCard } from './CyberCard';

// Using defaults for settings required by CyberCard since we are bypassing the full Settings context for this refactor
const DEFAULT_CARD_SETTINGS = {
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
  accentColor: '#00d1ff'
} as const;

interface ScriptGridProps {
  section: Section;
  onRun: (scriptPath: string, name: string) => void;
  isRunning: boolean;
  currentRunningScript: string | null;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #fff;
  margin-bottom: 24px;
  font-weight: 300;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--knx-cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--knx-cyan);
  }
`;

const ScriptsGrid: React.FC<ScriptGridProps> = ({ section, onRun, isRunning, currentRunningScript }) => {
  return (
    <div>
      <SectionTitle>{section.name}</SectionTitle>
      <GridContainer>
        {section.scripts.map((script: Script) => {
          // Determine status based on running state
          let status: 'idle' | 'running' | 'queued' | 'success' | 'error' = 'idle';
          if (currentRunningScript === script.script) {
            status = 'running';
          }

          return (
            <CyberCard 
              key={script.script}
              script={script}
              status={status}
              // We cast the settings to any here because we are mocking the app settings context
              settings={DEFAULT_CARD_SETTINGS as any}
              onExecute={() => onRun(script.script, script.name)}
            />
          );
        })}
      </GridContainer>
    </div>
  );
};

export default ScriptsGrid;