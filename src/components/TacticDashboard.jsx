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
    const recent=tacticsData[0].arr[0];
    const topRated=tacticsData[1].arr[3];
    const standOut=tacticsData[0].arr[2];
    const [selected,setSelected]=useState(recent);

    return (
        <div className="tactic-section">
            <div id="featured" className="featured-tactic-section">
                <div className="featured-tactic-section--thumbnails">
                    <img src={`${selected.img}`} alt="thumbnail"/>
                </div>

                <div className="featured-tactic-section--heading">
                    <ul>
                        <li onMouseMove={()=>setSelected(recent)} className={`${selected === recent ? 'active': 'inactive'}`}>Most Recent</li>
                        <li onMouseMove={()=>setSelected(topRated)} className={`${selected === topRated ? 'active': 'inactive'}`}>Top Rated</li>
                        <li onMouseMove={()=>setSelected(standOut)} className={`${selected === standOut ? 'active': 'inactive'}`}>Standout</li>
                    </ul>
                </div>
            </div>

            <div id="version" className="version-tactic-section">
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
        </div>
    );
}

export default TacticDashboard;
