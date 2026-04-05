import home from "../assets/Images/house.png";
import './Navbar.css';

function Navbar() {
    return (
        <div className="floating-nav">
            <div className="floating-nav__featured-btn">
                <a href="#featured"><p>Featured</p></a>
            </div>

            <div className="floating-nav__version-btn">
                <a href="#version"><p>Versions</p></a>
            </div>

            <div className="floating-nav__home-btn">
                <a href="#header">
                    <img className="floating-nav__home-icon" src={home} alt="Home" />
                </a>
            </div>
        </div>
    );
}

export default Navbar;
