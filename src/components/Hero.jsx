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
        const isMobile = window.matchMedia('(max-width: 580px)').matches;

        if (isMobile) {
            const overflow = hero.current.scrollWidth - window.innerWidth;

            // Start the banner left aligned
            gsap.set(hero.current, { x: -200 });

            gsap.to(hero.current, {
                x: -overflow,
                ease: "none",
                scrollTrigger: {
                    trigger: scrollArea.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: hero.current,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });
        } else {
            if (hero.current.scrollWidth <= window.innerWidth) return;

            gsap.to(hero.current, {
                x: () => -(hero.current.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: hero.current,
                    scrub: 2,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });
        }
    }, { scope: scrollArea });

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