import { tacticsData } from "../tacticData";
import { useState, useRef } from 'react';
import EditionFolder from "./EditionFolder";
import './TacticDashboard.css';
import EditionDetailView from './EditionDetailView';
import clipIcon from "../../assets/Images/clip.png";
import { HoverText } from "../HoverText";
import { createPortal } from 'react-dom';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const folders = [
    { name: 'Football Manager 26', id: crypto.randomUUID() },
    { name: 'Football Manager 24', id: crypto.randomUUID() },
];

function TacticDashboard() {
    const isMobile = window.matchMedia('(max-width: 580px)').matches;
    const [activeCardId, setActiveCardId] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [element,setElement]=useState();
    const recent=tacticsData[0].arr[0];
    const topRated=tacticsData[1].arr[3];
    const standOut=tacticsData[0].arr[2];
    const [selected,setSelected]=useState(isMobile ? topRated : recent);
    const [light,setLight]=useState(false)
    const carouselRef = useRef();
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useGSAP(()=>{
        gsap.from(".featured-tactic-section--cards", {
            scale: 0.5,
            yPercent: 50,
            scrollTrigger: {
                trigger: ".layer-2",
                start: "top bottom",  
                end: "top top",      
                scrub: 1,
            },
        });
    },[])

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
        const walk = (x - startX.current) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="tactic-section">
            <div id="featured" className="featured-tactic-section">
                    <div className="spotlight">
                        <div className="mount"></div>
                        <div className="arm"></div>
                        <h1 style={{ color: light ? 'rgb(122, 52, 219)' : 'black', filter: light? 'drop-shadow(0px 0px 8px rgba(198, 160, 252, 1))':'none' }}>SPOTLIGHT</h1>
                    </div>
                    <div className="featured-tactic-section--cards">
                        <div onMouseMove={()=>setSelected(topRated)} onMouseEnter={()=>setLight(true)} onMouseLeave={()=>setLight(false)} id="standOut" className={`featured-tactic-section--thumbnails ${selected === topRated ? '': 'inactiveImg'}`}>
                            <h3>Top Rated</h3>
                            <img src={`${topRated.img}`} alt="thumbnail"/>
                            <div className="featured-tactic-section--cards--buttons">
                                <a href={`${topRated.download}`} target="_blank">Download</a>
                                <a href={`${`https://twitter.com/i/web/status/${topRated.threadId}`}`} target="_blank">Full Thread</a>
                            </div>
                        </div>
                        <div onMouseMove={()=>setSelected(recent)} onMouseEnter={()=>setLight(true)} onMouseLeave={()=>setLight(false)} id="recent" className={`featured-tactic-section--thumbnails ${selected === recent ? '': 'inactiveImg'}`}>
                            <h3>Recent</h3>
                            <img src={`${recent.img}`} alt="thumbnail"/>
                            <div className="featured-tactic-section--cards--buttons">
                                <a href={`${recent.download}`} target="_blank">Download</a>
                                <a href={`${`https://twitter.com/i/web/status/${recent.threadId}`}`} target="_blank">Full Thread</a>
                            </div>
                        </div>
                        <div onMouseMove={()=>setSelected(standOut)} onMouseEnter={()=>setLight(true)} onMouseLeave={()=>setLight(false)} id="topRated" className={`featured-tactic-section--thumbnails ${selected === standOut ? '': 'inactiveImg'}`}>
                            <h3>Stand Out</h3>
                            <img src={`${standOut.img}`} alt="thumbnail"/>
                            <div className="featured-tactic-section--cards--buttons">
                                <a href={`${standOut.download}`} target="_blank">Download</a>
                                <a href={`${`https://twitter.com/i/web/status/${standOut.threadId}`}`} target="_blank">Full Thread</a>
                            </div>
                        </div>
                    </div>
                    <p>
                    Tactics worth your time. <br /> 
                    Most liked, freshest drop & my personal pick.
                </p>
            </div>


            <div id='version' className="version-heading">
                <div>
                    <img src={clipIcon} alt="clip emoji" />
                    <h1>EDITIONS</h1>
                </div>
                <p>
                    A growing archive of tactical editions, <br /> 
                    each one a snapshot of how football is evolving. <br />
                    Browse every edition. Every tactics & formations.
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
            
            {createPortal(
                <div className={`edition-detail-panel ${isVisible ? 'open' : ''}`}>
                    <button onClick={() => setIsVisible(false)} className="edition-detail-panel-btn">
                        <h2>X</h2>
                    </button>
                    <EditionDetailView prop={{ element: element }} />
                </div>,
                document.getElementById('portal-root')
            )}
        </div>
    );
}

export default TacticDashboard;



