import home from "../assets/Images/house.png";

function Navbar(){
    return (
        <>
            <div className="floating">
                <div className="featuredButton">
                    <a href="#featured"><p>Featured</p></a>
                </div>

                <div className="versionButton">
                    <a href="#version"><p>Versions</p></a>
                </div>

                <div className="indexButton">
                    <a href="#header">
                    <img src={home} alt="Home" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar;