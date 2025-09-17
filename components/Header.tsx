import React from 'react';
import type { AcademicLevel } from '../types';

interface HeaderProps {
    level: AcademicLevel | null;
    group: string | null;
}

const Header: React.FC<HeaderProps> = ({ level, group }) => {
    let title = "📅 Planning du 1er semestre";
    let subtitle = "Université d'El Oued – A-U 2025-2026";

    if (level && !group) {
        title = `📚 ${level}`;
        subtitle = "Veuillez sélectionner votre groupe";
    } else if (level && group) {
        title = `📅 Emploi du Temps – ${level}`;
        subtitle = `Groupe ${group} – Année Universitaire 2025-2026`;
    }

    return (
        <header className="text-center mb-8 w-full max-w-7xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {title}
            </h1>
            <p className="text-slate-500 mt-2">{subtitle}</p>
        </header>
    );
};

export default Header;
