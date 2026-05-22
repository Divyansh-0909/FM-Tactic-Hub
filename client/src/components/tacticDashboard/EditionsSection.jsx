import { useState, useRef } from 'react';
import { tacticsData } from '../tacticData';
import EditionFolder from './EditionFolder';
import clipIcon from '../../assets/Images/clip.png';

const folders = [
    { name: 'Football Manager 26', id: crypto.randomUUID() },
    { name: 'Football Manager 24', id: crypto.randomUUID() },
];

const EditionsSection = ({ onFolderClick }) => {
    const [activeCardId, setActiveCardId] = useState(null);
    const carouselRef = useRef();
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
        carouselRef.current.style.cursor = 'grabbing';
        carouselRef.current.style.userSelect = 'none';
    };

    const onMouseLeave = () => {
        isDragging.current = false;
        carouselRef.current.style.cursor = 'grab';
    };

    const onMouseUp = () => {
        isDragging.current = false;
        carouselRef.current.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        carouselRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
    };

    return (
        <>
            <div id="version" className="version-heading">
                <div>
                    <img src={clipIcon} alt="clip emoji" />
                    <h1>EDITIONS</h1>
                </div>
                <p>
                    A growing archive of tactical editions, <br />
                    each one a snapshot of how football is evolving. <br />
                    Browse every edition. Every tactics &amp; formations.
                </p>
            </div>

            <div id="version" className="version-tactic-section">
                <div
                    className="folders-carousel"
                    ref={carouselRef}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    style={{ cursor: 'grab' }}
                >
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
                                    handleClick: () => onFolderClick(data),
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default EditionsSection;