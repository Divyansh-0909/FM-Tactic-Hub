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
                    <h1>SPOTLIGHT</h1>
                    <div className="featured-tactic-section--cards">
                        <div onMouseMove={()=>setSelected(topRated)} id="standOut" className={`featured-tactic-section--thumbnails ${selected === topRated ? '': 'inactiveImg'}`}>
                            <h3>Top Rated</h3>
                            <img src={`${topRated.img}`} alt="thumbnail"/>
                            <a href={`${topRated.download}`} target="_blank">Download</a>
                            <a href={`${`https://twitter.com/i/web/status/${topRated.threadId}`}`} target="_blank">Full Thread</a>
                        </div>
                        <div onMouseMove={()=>setSelected(recent)}  id="recent" className={`featured-tactic-section--thumbnails ${selected === recent ? '': 'inactiveImg'}`}>
                            <h3>Recent</h3>
                            <img src={`${recent.img}`} alt="thumbnail"/>
                            <a href={`${recent.download}`} target="_blank">Download</a>
                            <a href={`${`https://twitter.com/i/web/status/${recent.threadId}`}`} target="_blank">Full Thread</a>
                        </div>
                        <div onMouseMove={()=>setSelected(standOut)} id="topRated" className={`featured-tactic-section--thumbnails ${selected === standOut ? '': 'inactiveImg'}`}>
                            <h3>Stand Out</h3>
                            <img src={`${standOut.img}`} alt="thumbnail"/>
                            <a href={`${standOut.download}`} target="_blank">Download</a>
                            <a href={`${`https://twitter.com/i/web/status/${standOut.threadId}`}`} target="_blank">Full Thread</a>
                        </div>
                    </div>
            </div>

            <div id="version" className="version-tactic-section">
                {/* <h1 className="version-heading">EDITIONS</h1> */}
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
