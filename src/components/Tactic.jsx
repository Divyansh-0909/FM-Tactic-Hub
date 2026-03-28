import { tacticsData } from "./tacticData";
import React, {useState}from 'react';
import Card from "./Card";

const folders=[{name: 'Football Manager 26' , id: crypto.randomUUID()}, {name: 'Football Manager 24' , id: crypto.randomUUID()}];

function Tactic(){
    const [activeCardId, setActiveCardId] = useState(null);
    return (
        <>
            <div id="version" className="featured">
                <div className="folders">
                    {folders.map((folder) => { const data = tacticsData.find( (tactics) => tactics.name === folder.name );
                        return ( <Card 
                            key={folder.id} 
                            prop={{ 
                                text: folder.name, 
                                arr: data?.arr || [],
                                isActive: activeCardId === folder.id,
                                isInactive: activeCardId !== null && activeCardId !== folder.id,
                                onToggle: () => setActiveCardId(activeCardId === folder.id ? null : folder.id)
                            }} /> ); })}
                </div>
            </div>
        </>
    )
}

export default Tactic;