import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { ProjectGrid } from './components/ProjectGrid';
import { Drawer } from './components/Drawer';
import { experiences, projects } from './data/content';
import './index.css';

function App() {
  const [drawerData, setDrawerData] = useState<{title: string, content: string} | null>(null);

  const handleDeepDive = (id: string) => {
    const item = [...experiences, ...projects].find(i => i.id === id);
    if (item) {
      setDrawerData({
        title: 'company' in item ? `${item.role} @ ${item.company}` : item.title,
        content: item.deepDive || ""
      });
    }
  };

  return (
    <main>
      <Hero />
      <Timeline onDeepDive={handleDeepDive} />
      <ProjectGrid onDeepDive={handleDeepDive} />
      <Drawer 
        isOpen={!!drawerData} 
        onClose={() => setDrawerData(null)}
        title={drawerData?.title || ""}
        content={drawerData?.content || ""}
      />
    </main>
  );
}

export default App;
