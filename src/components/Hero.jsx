import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Hero.css';
import Header from '../components/Header.jsx';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const hero = useRef();
    const scrollArea = useRef();

    useGSAP(() => {
        const isMobile = window.innerWidth <= 580;

        if (isMobile) {
            gsap.to(hero.current, {
                x: () => -(hero.current.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: hero.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2.8,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });
        }

        else{
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
        }
    }, { scope: hero });

    return (
        <header ref={scrollArea} className="hero-scroll-area">
            <div ref={hero} className="hero-banner">
                <div className="hero-overlay">
                    <h1>THE HOME OF FOOTBALL MANAGER TACTICS</h1>
                </div>
            </div>
        </header>
    );
}

export default Hero;
