import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #222428;
  border-radius: 12px;
  padding: 20px;
  height: 140px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid ${props => props.color + '40'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    background: linear-gradient(145deg, ${props => props.color + '20'}, #222428);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.color}, ${props => props.color + 'CC'});
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  font-size: 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
`;

const Description = styled.p`
  margin: 0 0 15px 0;
  font-size: 13px;
  color: #aaaaaa;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusBadge = styled.span`
  background-color: ${props => {
    switch(props.status) {
      case 'running': return '#FF9800';
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      default: return '#666666';
    }
  }};
  color: white;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: 1px solid #444444;
  color: #cccccc;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #333333;
    color: #ffffff;
    border-color: #555555;
  }
`;

const colors = {
  deep_cleaning: '#4CAF50',
  repair_restore: '#2196F3',
  system_check: '#00BCD4',
  optimization: '#FFEB3B',
  advanced_control: '#9C27B0',
  ready_apps: '#7C4DFF'
};

export default function Card({ script }) {
  const [status, setStatus] = useState('idle');

  const handleExecute = async () => {
    setStatus('running');
    try {
      if (window.electronAPI) {
        await window.electronAPI.runScript(script.script);
      } else {
        // Mock execution for preview
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const getColorByScriptPath = (scriptPath) => {
    if (scriptPath.includes('deep_cleaning')) return colors.deep_cleaning;
    if (scriptPath.includes('repair_restore')) return colors.repair_restore;
    if (scriptPath.includes('system_check')) return colors.system_check;
    if (scriptPath.includes('optimization')) return colors.optimization;
    if (scriptPath.includes('advanced_control')) return colors.advanced_control;
    if (scriptPath.includes('ready_apps')) return colors.ready_apps;
    return '#666666';
  };

  const color = getColorByScriptPath(script.script);

  return (
    <CardContainer color={color}>
      <CardHeader>
        <IconWrapper color={color}>🔧</IconWrapper>
        <Title>{script.name}</Title>
      </CardHeader>
      
      <Description>{script.description || 'وصف الخدمة'}</Description>
      
      <CardFooter>
        <StatusBadge status={status}>
          {status === 'idle' && 'جاهز'}
          {status === 'running' && 'قيد التشغيل...'}
          {status === 'success' && 'تم بنجاح'}
          {status === 'error' && 'خطأ'}
        </StatusBadge>
        
        <ActionButtons>
          <ActionButton onClick={handleExecute}>▶️ تشغيل</ActionButton>
          <ActionButton>⟳ إعادة</ActionButton>
        </ActionButtons>
      </CardFooter>
    </CardContainer>
  );
}