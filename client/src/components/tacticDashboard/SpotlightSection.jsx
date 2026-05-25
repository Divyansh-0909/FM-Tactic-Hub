import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { tacticsData } from '../tacticData';
import { useAuth } from '../../context/AuthContext';

const SpotlightSection = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery({ maxWidth: 580 });

    const recent   = tacticsData[0].arr[0];
    const topRated = tacticsData[1].arr[3];
    const standOut = tacticsData[0].arr[3];

    const [selected, setSelected] = useState(isMobile ? topRated : recent);
    const [light, setLight] = useState(false);

    return (
        <div id="featured" className="featured-tactic-section">
            <div className="spotlight">
                <div className="mount"></div>
                <div className="arm"></div>
                <h1 style={{
                    color: light ? 'rgb(122, 52, 219)' : 'black',
                    filter: light ? 'drop-shadow(0px 0px 8px rgba(198, 160, 252, 1))' : 'none',
                }}>
                    SPOTLIGHT
                </h1>
            </div>

            <div className="featured-tactic-section--cards">
                <div
                    onMouseMove={() => setSelected(topRated)}
                    onMouseEnter={() => setLight(true)}
                    onMouseLeave={() => setLight(false)}
                    id="standOut"
                    className={`featured-tactic-section--thumbnails ${selected === topRated ? '' : 'inactiveImg'}`}
                >
                    <h3>Top Rated</h3>
                    <img src={topRated.img} alt="thumbnail" />
                    <div className="featured-tactic-section--cards--buttons">
                        <a href={user? topRated.download : "/log-in"} rel="noopener noreferrer">Download</a>
                        <a href={`https://twitter.com/i/web/status/${topRated.threadId}`} target="_blank" rel="noopener noreferrer">Full Thread</a>
                    </div>
                </div>

                <div
                    onMouseMove={() => setSelected(recent)}
                    onMouseEnter={() => setLight(true)}
                    onMouseLeave={() => setLight(false)}
                    id="recent"
                    className={`featured-tactic-section--thumbnails ${selected === recent ? '' : 'inactiveImg'}`}
                >
                    <h3>Recent</h3>
                    <img src={recent.img} alt="thumbnail" />
                    <div className="featured-tactic-section--cards--buttons">
                        <a href={user? recent.download : "/log-in"} rel="noopener noreferrer">Download</a>
                        <a href={`https://twitter.com/i/web/status/${recent.threadId}`} target="_blank" rel="noopener noreferrer">Full Thread</a>
                    </div>
                </div>

                <div
                    onMouseMove={() => setSelected(standOut)}
                    onMouseEnter={() => setLight(true)}
                    onMouseLeave={() => setLight(false)}
                    id="topRated"
                    className={`featured-tactic-section--thumbnails ${selected === standOut ? '' : 'inactiveImg'}`}
                >
                    <h3>Stand Out</h3>
                    <img src={standOut.img} alt="thumbnail" />
                    <div className="featured-tactic-section--cards--buttons">
                        <a href={user? standOut.download : "/log-in"} rel="noopener noreferrer">Download</a>
                        <a href={`https://twitter.com/i/web/status/${standOut.threadId}`} target="_blank" rel="noopener noreferrer">Full Thread</a>
                    </div>
                </div>
            </div>

            <p>
                Tactics worth your time. <br />
                Most liked, freshest drop &amp; my personal pick.
            </p>
        </div>
    );
};

export default SpotlightSection;