import React from 'react';
import type { AcademicLevel } from '../types';

interface LevelSelectorProps {
  levels: AcademicLevel[];
  onSelectLevel: (level: AcademicLevel) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ levels, onSelectLevel }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-6 text-slate-700">Veuillez sélectionner votre niveau d'étude</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelectLevel(level)}
            className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
