import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppSettings } from '../types';
import { cyberpunkTheme } from '../themes/cyberpunk';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${cyberpunkTheme.gradients.card};
  border: 1px solid ${cyberpunkTheme.colors.primary};
  border-radius: 12px;
  padding: 24px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(0, 245, 255, 0.2);
`;

const Title = styled.h2`
  color: ${cyberpunkTheme.colors.primary};
  margin-top: 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #fff;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.label`
  color: #ccc;
  font-size: 13px;
`;

const Input = styled.input`
  background: rgba(0,0,0,0.3);
  border: 1px solid #444;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
`;

const Select = styled.select`
  background: rgba(0,0,0,0.3);
  border: 1px solid #444;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
`;

const Button = styled.button`
  background: ${cyberpunkTheme.gradients.button};
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleChange = (key: keyof AppSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Global Settings</Title>
        
        <Section>
          <SectionTitle>Appearance</SectionTitle>
          <Row>
            <Label>Visual Effects</Label>
            <Input type="checkbox" checked={localSettings.visualEffects} onChange={e => handleChange('visualEffects', e.target.checked)} />
          </Row>
          <Row>
            <Label>Cyber Glow</Label>
            <Input type="checkbox" checked={localSettings.cyberGlow} onChange={e => handleChange('cyberGlow', e.target.checked)} />
          </Row>
          <Row>
            <Label>Card Style</Label>
            <Select value={localSettings.cardStyle} onChange={e => handleChange('cardStyle', e.target.value)}>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="neon">Neon</option>
              <option value="minimal">Minimal</option>
            </Select>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Performance</SectionTitle>
          <Row>
            <Label>Parallel Execution</Label>
            <Input type="checkbox" checked={localSettings.parallelExecution} onChange={e => handleChange('parallelExecution', e.target.checked)} />
          </Row>
          <Row>
            <Label>Max Concurrent</Label>
            <Input type="number" value={localSettings.maxConcurrent} onChange={e => handleChange('maxConcurrent', parseInt(e.target.value))} min="1" max="10" />
          </Row>
        </Section>

        <Button onClick={handleSave}>Save Changes</Button>
      </ModalContent>
    </ModalOverlay>
  );
};