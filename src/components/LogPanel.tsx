import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Terminal, Trash2 } from 'lucide-react';

interface LogMessage {
  time: string;
  text: string;
  type?: 'info' | 'error' | 'success';
}

interface LogPanelProps {
  logs: LogMessage[];
  isRunning: boolean;
  onClear: () => void;
}

const PanelContainer = styled.div`
  height: 200px;
  background: #080a0f;
  border-top: 1px solid var(--knx-border);
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 260px; /* Sidebar width */
  right: 0;
  z-index: 20;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
`;

const Header = styled.div`
  height: 36px;
  background: #0f1720;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  color: #94a3b8;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--knx-error);
    background: rgba(255, 56, 96, 0.1);
  }
`;

const LogArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 15px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #e2e8f0;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
`;

const LogLine = styled.div<{ type?: string }>`
  display: flex;
  gap: 10px;
  color: ${props => 
    props.type === 'error' ? 'var(--knx-error)' : 
    props.type === 'success' ? 'var(--knx-success)' : 
    '#e2e8f0'};
    
  &:hover {
    background: rgba(255,255,255,0.03);
  }
`;

const TimeStamp = styled.span`
  color: #64748b;
  font-size: 11px;
  min-width: 70px;
`;

const TerminalPanel: React.FC<LogPanelProps> = ({ logs, isRunning, onClear }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <PanelContainer>
      <Header>
        <Title>
          <Terminal size={14} color="var(--knx-cyan)" />
          CONSOLE OUTPUT {isRunning && <span style={{color: 'var(--knx-success)', marginLeft: 10}}>● EXECUTING</span>}
        </Title>
        <ClearButton onClick={onClear}>
          <Trash2 size={12} /> CLEAR
        </ClearButton>
      </Header>
      <LogArea>
        {logs.length === 0 && (
          <div style={{color: '#475569', textAlign: 'center', marginTop: 40}}>
            System ready. Waiting for commands...
          </div>
        )}
        {logs.map((log, i) => (
          <LogLine key={i} type={log.type}>
            <TimeStamp>[{log.time}]</TimeStamp>
            <span>{log.text}</span>
          </LogLine>
        ))}
        <div ref={endRef} />
      </LogArea>
    </PanelContainer>
  );
};

export default TerminalPanel;