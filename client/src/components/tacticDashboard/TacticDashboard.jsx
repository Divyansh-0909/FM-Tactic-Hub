import { useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';

import SpotlightSection from './SpotlightSection';
import EditionsSection from './EditionsSection';
import EditionDetailView from './EditionDetailView';
import './TacticDashboard.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function TacticDashboard() {
    const isMobile = useMediaQuery({ maxWidth: 580 });
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState();

    useGSAP(() => {
        ScrollTrigger.refresh();

        const yPercentValue    = isMobile ? 105 : 240;
        const yScale           = isMobile ? 0.1 : 0.4;
        const xScale           = isMobile ? 0.4 : 0.2;
        const startPercentage  = isMobile ? 30  : 40;
        const delay2           = isMobile ? 0.5 : 0;

        gsap.set(['.version-heading', '.folders-carousel > section:not(:first-child)'], {
            opacity: 0,
            y: 30,
        });

        gsap.from('.featured-tactic-section--cards', {
            scale: 0.5,
            yPercent: 60,
            opacity: 0,
            scrollTrigger: {
                trigger: '.layer-2',
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.version-heading',
                start: 'top 100%',
                end: 'bottom 50%',
                scrub: 2,
            },
        });

        tl.to('.featured-tactic-section--cards', {
                scaleX: xScale,
                scaleY: yScale,
                ease: 'power1.inOut',
            }, 0.1)
          .to('.featured-tactic-section--cards', {
                yPercent: yPercentValue,
                ease: 'power2.in',
            }, 0)
          .to('.featured-tactic-section--cards', {
                opacity: 0,
                ease: 'power2.in',
            }, 0.3);

        gsap.to(['.version-heading', '.folders-carousel > section:not(:first-child)'], {
            opacity: 1,
            y: 0,
            delay: delay2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.version-heading',
                start: 'bottom 45%',
                toggleActions: 'play none none reverse',
            },
        });

        gsap.from(['.folder-layer--1', '.folder-layer--2', '.folder-layer--3'], {
            opacity: 0,
            scrollTrigger: {
                trigger: '.folder-wrapper',
                start: `centre ${startPercentage}%`,
                end: 'top 80%',
                scrub: 0.3,
            },
        });

        gsap.from('.folders-carousel > section:first-child .folder-card__front', {
            boxShadow: 'inset 0 40px 80px #fbbf24, inset 0 -40px 80px #d97706',
            rotationX: -46,
            y: 2,
            scrollTrigger: {
                trigger: '.folder-wrapper',
                start: 'centre 35%',
                end: 'top 80%',
                scrub: 0.3,
            },
        });

    }, { dependencies: [], revertOnUpdate: true });

    return (
        <div className="tactic-section">
            <SpotlightSection />

            <EditionsSection onFolderClick={(data) => { setElement(data); setIsVisible(true); }} />

            {createPortal(
                <div className={`edition-detail-panel ${isVisible ? 'open' : ''}`}>
                    <button onClick={() => setIsVisible(false)} className="edition-detail-panel-btn">
                        <h2>X</h2>
                    </button>
                    <EditionDetailView prop={{ element }} />
                </div>,
                document.getElementById('portal-root')
            )}
        </div>
    );
}

export default TacticDashboard;