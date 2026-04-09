import downloadIcon from "../assets/Images/download.svg";
import threadIcon from "../assets/Images/text-box.svg";
import './TacticPreviewList.css';

const TacticPreviewList = ({ prop }) => {
  return (
    <>
      {prop.arr.slice(0, prop.n).map((item, i) => (
        <div
          className={`folder-layer--${prop.isVersion ? 'version' : `${i + 1}`}`}
          ref= {prop.isVersion? null : (el) => (prop.Refs.current[i] = el)}
          key={i}
        >
          <div className="tactic-card">
            <h2 className="tactic-card__title">{item.title}</h2>

            <div className="tactic-card__info">
              <div>
                <div className="tactic-card__thumbnail-overlay" />
                <img className="tactic-card__image" src={item.img} alt="Thumbnail" />
              </div>

              <div className="tactic-card__meta">
                <div>
                  <p>Mentality: <br /> {item.mentality}</p>
                  <p>In Possession: <br /> {item.ip}</p>
                  <p>Out of Possession: <br /> {item.op}</p>
                </div>
                <div className="tactic-card__actions">
                  <button id="download">
                    <a href={item.download} target="_blank" rel="noopener noreferrer">
                      <img src={downloadIcon} alt="Download tactic" />
                    </a>
                  </button>
                  <button id="thread">
                    <a href={`https://twitter.com/i/web/status/${item.threadId}`} target="_blank" rel="noopener noreferrer">
                      <img src={threadIcon} alt="Read thread" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TacticPreviewList;
