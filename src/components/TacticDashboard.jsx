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
    const [element,setElement]=useState();

    return (
        <>
        <div id="featured" className="featured-tactic-section">
            
        </div>

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
                                    handleClick: ()=> {
                                        setIsVisible(true);
                                        setElement(data);
                                    },
                                }}
                            />
                    );
                })}
            </div>
        </div>
        
        <div className={`edition-detail-panel ${isVisible? 'open': ''}`}>
            <button onClick={()=>setIsVisible(false)} className="edition-detail-panel-btn"><h2>X</h2></button>
            <EditionDetailView prop={{element: element}}/>
        </div>
        </>
    );
}

export default TacticDashboard;
