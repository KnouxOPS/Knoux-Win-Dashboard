import React from 'react';
import styled from 'styled-components';
import { Activity, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  systemInfo: any;
}

const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(15, 23, 32, 0.6);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--knx-cyan);
    box-shadow: 0 0 15px rgba(0, 209, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: var(--knx-purple);
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(124, 58, 237, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--knx-cyan);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 12px;
  color: var(--knx-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const HeroSection: React.FC<HeroSectionProps> = ({ systemInfo }) => {
  const mem = systemInfo?.freeMem || '--';
  const total = systemInfo?.totalMem || '--';
  const platform = systemInfo?.platform || 'Windows';

  return (
    <HeroContainer>
      <StatCard>
        <IconBox><ShieldCheck size={24} /></IconBox>
        <Info>
          <Label>System Status</Label>
          <Value style={{ color: 'var(--knx-success)' }}>SECURE</Value>
        </Info>
      </StatCard>

      <StatCard>
        <IconBox><HardDrive size={24} /></IconBox>
        <Info>
          <Label>Memory (Free/Total)</Label>
          <Value>{mem} / {total}</Value>
        </Info>
      </StatCard>

      <StatCard>
        <IconBox><Cpu size={24} /></IconBox>
        <Info>
          <Label>Environment</Label>
          <Value>{platform}</Value>
        </Info>
      </StatCard>

      <StatCard>
        <IconBox><Activity size={24} /></IconBox>
        <Info>
          <Label>Knoux Engine</Label>
          <Value style={{ color: 'var(--knx-cyan)' }}>ONLINE</Value>
        </Info>
      </StatCard>
    </HeroContainer>
  );
};

export default HeroSection;