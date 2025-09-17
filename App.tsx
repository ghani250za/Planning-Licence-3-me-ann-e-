import React, { useState } from 'react';
import type { AcademicLevel } from './types';
import { SCHEDULES } from './constants';
import GroupSelector from './components/GroupSelector';
import ScheduleTable from './components/ScheduleTable';
import LevelSelector from './components/LevelSelector';
import Header from './components/Header';

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleSelectLevel = (level: AcademicLevel) => {
    setSelectedLevel(level);
    setSelectedGroup(null); // Reset group when level changes
  };

  const handleSelectGroup = (group: string) => {
    setSelectedGroup(group);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedGroup(null);
  };
  
  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  const renderContent = () => {
    if (!selectedLevel) {
      return (
        <LevelSelector 
          levels={Object.keys(SCHEDULES) as AcademicLevel[]}
          onSelectLevel={handleSelectLevel}
        />
      );
    }
    if (!selectedGroup) {
      return (
        <GroupSelector 
          groups={Object.keys(SCHEDULES[selectedLevel])} 
          onSelectGroup={handleSelectGroup} 
          onBack={handleBackToLevels}
        />
      );
    }
    return (
      <ScheduleTable
        level={selectedLevel}
        group={selectedGroup}
        schedule={SCHEDULES[selectedLevel][selectedGroup]}
        onBack={handleBackToGroups}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center p-4 sm:p-6 transition-all duration-500">
      <Header level={selectedLevel} group={selectedGroup} />
      
      <main className="w-full max-w-7xl">
        <div className="transition-opacity duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>
      
      <footer className="text-center mt-8 text-sm text-slate-400">
        <p>A simple and elegant way to view your schedule.</p>
      </footer>
    </div>
  );
}
