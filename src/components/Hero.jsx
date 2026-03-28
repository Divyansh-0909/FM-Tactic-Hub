import { Link } from "react-router-dom";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Header(){
    return (
        <>
            <div className="wrapper">
                <div id="header" className="header">
                    <Link to="/">FM TACTIC HUB</Link>
                    <a
                    href="https://x.com/theSlashMethod?s=20"
                    className="socialMedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    THESLASHMETHOD
                    </a>
                </div>
            </div>
        </>
    )
}

function Hero(){
    const hero=useRef();
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
        <>
            <Header/>
                <div ref={hero} className="hero">
                    <div className="overlay">
                    <h1>THE HOME OF FOOTBALL MANAGER TACTICS</h1>
                    </div>
                </div>
        </>
    )
}

export default Hero;