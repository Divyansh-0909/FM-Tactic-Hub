import { useRef } from 'react';
import './Hero.css';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import './Header.css';
import { Link } from "react-router-dom";
import { HoverText } from "../HoverText";
import footballIcon from "../../assets/Images/Ball.png";
import bootIcon from "../../assets/Images/boot.png";
import trophyIcon from "../../assets/Images/trophy.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/all";


import { useMediaQuery } from 'react-responsive';

class App extends Component {
  render() {
    return (
      <Icon path={mdiChevronDown}
        title="Arrow down"
        size={1}
        horizontal
        vertical
        rotate={90}
        color="red"
        spin
      />
    );
  }
};

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Hero() {
    const { user, clearAuth } = useAuth();
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: 580 });

    function handleLogout() {
        clearAuth();
        navigate("/");
    }

    useGSAP(()=>{
        const linkFeatured=document.querySelectorAll(".smooth-navigation-featured");
        const linkVersion=document.querySelector(".smooth-navigation-version");

        const smoother = ScrollSmoother.create({ 
            smooth: 1,
            smoothTouch: 0.1 
        });

        linkFeatured.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                smoother.scrollTo("#featured", true, "center center");
            });
        });

        linkVersion.addEventListener("click",(e)=>{
            smoother.scrollTo(".version-tactic-section",true , "center 70%")
        })
    })

    return (
        <div className='hero'>
            <a className="social" href="">theSlashMethod</a>
            <a className="username" href="">{user?.username}</a>
            <header>
                <div id="header" className="site-header">
                    <div className='site-header-websiteName'>
                        <Link to="/" >FM Tactic Hub</Link>
                    </div>
                    <a className='smooth-navigation-featured'>Spotlight</a>
                    <a className='smooth-navigation-version' >Editions</a>
                    {user ? (<a href='/' onClick={handleLogout}>Logout</a>) : (<a href='/log-in'>Login</a>)}
                </div>
            </header>
            
            <div className='hero-main'>
                <img src={footballIcon} alt="ball" className='ball'/>
                
                <h1 className='heading'>
                    HOME OF
                    <br />
                    <span>FOOTBALL </span>
                    <br />
                    MANAGER
                </h1>
                <img src={bootIcon} alt="boot" className='boot'/>
                <img src={trophyIcon} alt="trophy" className='trophy'/>
                <a className='upcoming' href='https://x.com/theSlashMethod/status/2053444951271465373?s=20' target='blank'>UPCOMING!</a>
            </div>

            <div className='hero-bottom'>
                <p className='subheading'>
                    Ever watched a match <span>&</span> thought how the system works<span>?</span>
                    <br />
                    Here, we break down the system<span> & </span> show you how to replicate it<span>.</span>
                </p>
                <a className='browse-button smooth-navigation-featured'>
                    <div className='browse-button-text'>Scroll to explore</div> <Icon path={mdiChevronDown} size={isMobile? 1 : 2} />
                </a>
            </div>
        </div>
    );
}

export default Hero;