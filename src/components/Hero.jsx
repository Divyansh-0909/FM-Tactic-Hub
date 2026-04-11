import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Hero.css';
import Header from '../components/Header.jsx';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const hero = useRef();

    useGSAP(() => {
        if (hero.current.scrollWidth <= window.innerWidth) return;

        gsap.to(hero.current, {
            x: () => -(hero.current.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: hero.current,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: hero });

    return (
        <header>
            <Header/>
            <div ref={hero} className="hero-banner">
                <div className="hero-overlay">
                    <h1>THE HOME OF FOOTBALL MANAGER TACTICS</h1>
                </div>
            </div>
        </header>
    );
}

export default Hero;
