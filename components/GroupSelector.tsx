import React from 'react';
import BackArrowIcon from './icons/BackArrowIcon';

interface GroupSelectorProps {
  groups: string[];
  onSelectGroup: (group: string) => void;
  onBack: () => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ groups, onSelectGroup, onBack }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition"
        aria-label="Go back to level selection"
      >
        <BackArrowIcon />
        Retour
      </button>
      <h2 className="text-xl font-semibold mb-6 text-slate-700">Veuillez sélectionner votre groupe</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => onSelectGroup(group)}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          >
            Groupe {group}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupSelector;
