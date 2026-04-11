import './Header.css';
import { Link } from "react-router-dom";
import { HoverText } from './HoverText';

function Header() {
    return (
        <div className="site-header-wrapper">
            <div id="header" className="site-header">
                <Link to="/"><HoverText>FM TACTIC HUB</HoverText></Link>
                <a
                    href="https://x.com/theSlashMethod?s=20"
                    className="site-header__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <HoverText>THESLASHMETHOD</HoverText>
                </a>
            </div>
        </div>
    );
}

export default Header;