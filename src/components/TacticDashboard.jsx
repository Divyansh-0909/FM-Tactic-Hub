import { tacticsData } from "./tacticData";
import React, { useState } from 'react';
import EditionFolder from "./EditionFolder";
import './TacticDashboard.css';
import EditionDetailView from './EditionDetailView';

const folders = [
    { name: 'Football Manager 26', id: crypto.randomUUID() },
    { name: 'Football Manager 24', id: crypto.randomUUID() },
];

function TacticDashboard() {
    const [activeCardId, setActiveCardId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
        <div id="version" className="tactic-section">
            <div className="folders-carousel">
                {folders.map((folder) => {
                    const data = tacticsData.find((t) => t.name === folder.name);
                    return (
                            <EditionFolder
                                key={folder.id}
                                prop={{
                                    text: folder.name,
                                    tactics: data?.arr || [],
                                    isActive: activeCardId === folder.id,
                                    isInactive: activeCardId !== null && activeCardId !== folder.id,
                                    onToggle: () => setActiveCardId(activeCardId === folder.id ? null : folder.id),
                                    setIsVisible: setIsVisible,
                                    isVisible: isVisible
                                }}
                            />
                    );
                })}
            </div>
        </div>
        <EditionDetailView prop={{ visibility: isVisible}} />
        </>
    );
}

export default TacticDashboard;
