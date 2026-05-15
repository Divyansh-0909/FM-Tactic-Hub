import './Installation.css';
import clipIcon from "../../assets/Images/clip.png";
import { HoverText } from '../HoverText';

function Installation(){
    return (
        <>
            <div id='guide' className='installation-section'>
                <p>
                    Get in the game. Plug it in. Dominate & Win.
                </p>
                <div className="folder-open">
                    <div className="folder-open__back">
                    </div>
                    <div className="folder-open__front">
                        <div className="folder-open__paper-blank"/>
                        <img src={clipIcon} alt="clip emoji" />
                        <div className="folder-open__paper">
                            <h1>HOW TO INSTALL</h1>
                            <ul>
                                <p>
                                    <li>Download the .fmf file from the Google Drive link provided.</li>
                                    <li>Open File Explorer (Windows) or Finder (Mac).</li>
                                    <li>
                                        <u>Navigate to:</u> <br />
                                        Documents <span>{'>'}</span> Sports Interactive <span>{'>'}</span> Football Manager 26 {'>'} tactics
                                    </li>
                                    <li>Move the downloaded .fmf file into this "tactics" folder.</li>
                                    <li>Launch game, go to Tactics screen, load your new tactic!</li>
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className='footer-heading'>
                    <h2>{'[ Contact ]'}</h2>
                    <h2>{'[ Navigation ]'}</h2>
                </div>
                <div className='footer-subheading'>
                    <div className='footer-contact'>
                        <a href="https://x.com/theSlashMethod?s=20" target='_blank'>
                            <h2>Twitter</h2>
                        </a>
                        <a href="mailto:BUSINESSYT2016@GMAIL.COM">
                            <h2>Email</h2>
                        </a>
                    </div>
                    <div className='footer-navigation'>
                        <a href="/">
                            <h2>Home</h2>
                        </a>
                        <a href="#featured">
                            <h2>Spotlight</h2>
                        </a>
                        <a href="#version">
                            <h2>Editions</h2>
                        </a>
                        <a href="#guide">
                            <h2>Guide</h2>
                        </a>
                    </div>
                </div>
                <div className='footer-carousel'>
                    <div className='footer-carousel--group'>
                        <h1>FM TACTIC HUB</h1>
                        <h1>FM TACTIC HUB</h1>
                    </div>
                    <div aria-hidden className='footer-carousel--group'>
                        <h1>FM TACTIC HUB</h1>
                        <h1>FM TACTIC HUB</h1>
                    </div>
                </div>
                <h2><span>@</span>2026 ALL RIGHTS RESERVED</h2>
            </footer>
        </>
    )
}

export default Installation;