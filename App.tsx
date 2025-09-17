import React, { useState } from 'react';
import type { ScheduleGroup } from './types';
import { SCHEDULES } from './constants';
import GroupSelector from './components/GroupSelector';
import ScheduleTable from './components/ScheduleTable';

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState<ScheduleGroup | null>(null);

  const handleSelectGroup = (group: ScheduleGroup) => {
    setSelectedGroup(group);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center p-4 sm:p-6 transition-all duration-500">
      <header className="text-center mb-8 w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          📅 Planning du 1<sup>er</sup> semestre
        </h1>
        <p className="text-slate-500 mt-2">Licence 3ème année – Année Universitaire 2025-2026</p>
      </header>
      
      <main className="w-full max-w-7xl">
        <div className="transition-opacity duration-300 ease-in-out">
          {!selectedGroup ? (
            <GroupSelector 
              groups={Object.keys(SCHEDULES) as ScheduleGroup[]} 
              onSelectGroup={handleSelectGroup} 
            />
          ) : (
            <ScheduleTable
              group={selectedGroup}
              schedule={SCHEDULES[selectedGroup]}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
      
      <footer className="text-center mt-8 text-sm text-slate-400">
        <p>A simple and elegant way to view your schedule.</p>
      </footer>
    </div>
  );
}
