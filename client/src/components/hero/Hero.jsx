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

    function handleLogout() {
        clearAuth();
        navigate("/");
    }

    useGSAP(()=>{
        const linkFeatured=document.querySelector(".smooth-navigation-featured");
        const linkVersion=document.querySelector(".smooth-navigation-version");

        const smoother = ScrollSmoother.create({ 
            smooth: 1,
            smoothTouch: 0.1 
        });

        linkFeatured.addEventListener("click",(e)=>{
            smoother.scrollTo("#featured",true , "center center")
        })

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
                    <Link to="/">FM Tactic Hub</Link>
                    <a className='smooth-navigation-featured'>Spotlight</a>
                    <a className='smooth-navigation-version' >Editions</a>
                    {user ? (<a href='/' onClick={handleLogout}>Logout</a>) : (<Link to='/log-in'>Login</Link>)}
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
            </div>

            <div className='hero-bottom'>
                <p className='subheading'>
                    Ever watched a match <span>&</span> thought how the system works<span>?</span>
                    <br />
                    Here, we break down the system<span> & </span> show you how to replicate it<span>.</span>
                </p>
                <a href='#featured' className='browse-button'>
                    Scroll to explore <Icon path={mdiChevronDown} size={2} />
                </a>
            </div>
        </div>
    );
}

export default Hero;