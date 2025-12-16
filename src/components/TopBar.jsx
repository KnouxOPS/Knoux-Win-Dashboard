import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const AppName = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4CAF50;
  box-shadow: 0 0 10px #4CAF50;
`;

const Controls = styled.div`
  display: flex;
  gap: 15px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #cccccc;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3d3d3d;
    color: #ffffff;
  }
`;

export default function TopBar() {
  return (
    <TopBarContainer>
      <LogoSection>
        <Logo>K</Logo>
        <AppName>Knoux Win</AppName>
        <StatusIndicator title="النظام يعمل بشكل طبيعي" />
      </LogoSection>
      
      <Controls>
        <IconButton title="إعدادات">⚙️</IconButton>
        <IconButton title="مساعدة">❓</IconButton>
        <IconButton title="تشغيل الكل" style={{backgroundColor: '#4CAF50', color: 'white'}}>▶️ تشغيل الكل</IconButton>
      </Controls>
    </TopBarContainer>
  );
}