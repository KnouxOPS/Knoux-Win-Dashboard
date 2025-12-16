import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  width: 400px;
  background-color: #252525;
  border-left: 1px solid #404040;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #404040;
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #aaaaaa;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  
  &:hover {
    color: #ffffff;
  }
`;

const OutputArea = styled.textarea`
  flex: 1;
  background-color: #1e1e1e;
  border: 1px solid #404040;
  border-radius: 8px;
  color: #cccccc;
  padding: 15px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  resize: none;
  margin-bottom: 20px;
  direction: ltr;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #404040;
  border-radius: 3px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  width: 60%;
  transition: width 0.3s ease;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${props => props.primary ? '#4CAF50' : '#333333'};
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export default function RightPanel({ output, setOutput }) {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>إخراج العملية</PanelTitle>
        <CloseButton>✕</CloseButton>
      </PanelHeader>
      
      <OutputArea 
        value={output} 
        readOnly 
        placeholder="ستظهر نتائج العمليات هنا..."
      />
      
      <ProgressBar>
        <ProgressFill />
      </ProgressBar>
      
      <ActionButtons>
        <ActionButton>⏹ إيقاف</ActionButton>
        <ActionButton>⟳ إعادة</ActionButton>
        <ActionButton primary>💾 حفظ السجل</ActionButton>
      </ActionButtons>
    </PanelContainer>
  );
}