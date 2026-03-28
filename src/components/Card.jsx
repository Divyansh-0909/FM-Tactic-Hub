import { useRef, useEffect } from 'react';
import './Card.css';
import downloadIcon from "../assets/Images/download.svg";
import threadIcon from "../assets/Images/text-box.svg";

const Card = ({prop}) => {
  const workRefs = useRef([]);
  const work5 = useRef();
  const work1 = useRef();
  const textRef = useRef();

  useEffect(() => {
    const center = (workRefs.current.length - 1) / 2;
    workRefs.current.forEach((el, i) => {
      if (el) {
        if (prop.isActive) {
          work5.current.style.filter = 'blur(4px)';
          work5.current.style.opacity = 0.5;
          work1.current.style.filter = 'blur(4px)';
          work1.current.style.opacity = 0.5;
          textRef.current.textContent = 'See more';
          el.style.transform = `scale(1.1) translateX(${(i - center) * 30}em)`;
          el.style.zIndex = 10 - i;
          el.style.boxShadow = '0 40px 40px rgba(0,0,0,.2)';
        } else {
          work5.current.style.filter = '';
          work5.current.style.opacity = 1;
          work1.current.style.filter = '';
          work1.current.style.opacity = 1;
          textRef.current.textContent = prop.text;
          el.style.transform = '';
          el.style.zIndex = 4 - i;
          el.style.boxShadow = '';
        }
      }
    });
  }, [prop.isActive,prop.text]);

  return (  
    <section className={`container ${prop.isInactive ? 'inactive' : ''}`} >
      <div className="file" onClick={() => prop.onToggle()}>
        <div className="work-5" ref={work5}/>

        {prop.arr.slice(0, 3).map((item, i) => (
          <div className={`work-${i+2}`} ref={(el) => (workRefs.current[i] = el)} key={i}>
            <div className="elements">
              <h2 className="title">{item.title}</h2>

              <div className="information">
                <div>
                  <div className='thumbnail'/>
                  <img src={item.img} alt="Thumbnail"/>
                </div>

                <div className="text">
                  <div>
                    <p>Mentality: <br /> {item.mentality}</p>
                    <p>In Possession: <br /> {item.ip}</p>
                    <p>Out of Possession: <br /> {item.op}</p>
                  </div>
                  <div className="buttons">
                    <button id="download">
                      <a href={item.download} target="_blank" rel="noopener noreferrer"><img src={downloadIcon} alt="read-thread"/></a>
                    </button>
                    <button id="thread">
                      <a href={`https://twitter.com/i/web/status/${item.threadId}`} target="_blank" rel="noopener noreferrer"><img src={threadIcon} alt="read-thread"/></a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="work-1" ref={work1}/>
      </div>
      <h3 className="hover-text" ><a href="" ref={textRef}>{prop.text}</a></h3>
      
    </section>
  );
}

export default Card;