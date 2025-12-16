import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import CardsGrid from './components/CardsGrid';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  direction: rtl;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
`;

export default function App() {
  const [selectedSection, setSelectedSection] = useState('deep_cleaning');
  const [config, setConfig] = useState(null);
  const [output, setOutput] = useState('');
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    // Check if electronAPI is available (mock if not for web preview)
    if (window.electronAPI) {
      window.electronAPI.loadConfig().then(setConfig);
      window.electronAPI.getSystemInfo().then(setSystemInfo);
      
      window.electronAPI.onScriptOutput((data) => {
        setOutput(prev => prev + data);
      });

      window.electronAPI.onScriptError((data) => {
        setOutput(prev => prev + '[ERROR] ' + data);
      });
    } else {
      // Mock data for web preview
      import('../config/ui_config.json').then(data => setConfig(data.default || data));
      setSystemInfo({ freeMemory: '45' });
    }
  }, []);

  const currentScripts = config?.sections.find(s => s.id === selectedSection)?.scripts || [];

  return (
    <AppContainer>
      <TopBar />
      <MainLayout>
        <Sidebar 
          onSelectSection={setSelectedSection} 
          sections={config?.sections || []} 
          selectedSection={selectedSection}
        />
        <ContentArea>
          <Hero systemInfo={systemInfo} />
          <CardsGrid scripts={currentScripts} />
        </ContentArea>
        <RightPanel output={output} setOutput={setOutput} />
      </MainLayout>
      <StatusBar />
    </AppContainer>
  );
}