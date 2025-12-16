import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background: linear-gradient(135deg, #2d2d2d, #3d3d3d);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
`;

const HeroTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: #353535;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #aaaaaa;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  }
`;

export default function Hero({ systemInfo }) {
  return (
    <HeroContainer>
      <HeroTitle>نظرة عامة على النظام</HeroTitle>
      
      <StatsGrid>
        <StatCard>
          <StatValue>جيد</StatValue>
          <StatLabel>صحة النظام</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{systemInfo.freeMemory || '45'} جيجا</StatValue>
          <StatLabel>المساحة الحرة</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>اليوم</StatValue>
          <StatLabel>آخر تنظيف</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>100%</StatValue>
          <StatLabel>الأداء</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <QuickActions>
        <ActionButton>🧹 تنظيف سريع</ActionButton>
        <ActionButton>🔄 فحص النظام</ActionButton>
        <ActionButton>⚡ تحسين الأداء</ActionButton>
      </QuickActions>
    </HeroContainer>
  );
}