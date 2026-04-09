import { useRef, useEffect} from 'react';
import './EditionFolder.css';
import TacticPreviewList from './TacticPreviewList';

const EditionFolder = ({ prop }) => {
  const tacticRefs = useRef([]);
  const folderBackRef = useRef();
  const folderFrontRef = useRef();
  const labelRef = useRef();

  useEffect(() => {
    const center = (tacticRefs.current.length - 1) / 2;
    tacticRefs.current.forEach((el, i) => {
      if (el) {
        if (prop.isActive) {
          folderBackRef.current.style.filter = 'blur(4px)';
          folderBackRef.current.style.opacity = 0.5;
          folderFrontRef.current.style.filter = 'blur(4px)';
          folderFrontRef.current.style.opacity = 0.5;
          labelRef.current.textContent = 'See more';
          el.style.transform = `scale(1.1) translateX(${(i - center) * 30}em)`;
          el.style.zIndex = 10 - i;
          el.style.boxShadow = '0 40px 40px rgba(0,0,0,.2)';
        } else {
          folderBackRef.current.style.filter = '';
          folderBackRef.current.style.opacity = 1;
          folderFrontRef.current.style.filter = '';
          folderFrontRef.current.style.opacity = 1;
          labelRef.current.textContent = prop.text;
          el.style.transform = '';
          el.style.zIndex = 4 - i;
          el.style.boxShadow = '';
        }
      }
    });
  }, [prop.isActive, prop.text]);

  return (
    <section className={`folder-wrapper ${prop.isInactive ? 'folder-wrapper--inactive' : ''}`}>
      <div className="folder-card" onClick={() => prop.onToggle()}>
        <div className="folder-card__back" ref={folderBackRef} />

        <TacticPreviewList prop={{ Refs: tacticRefs, n: 3, isVersion: false, arr: prop.tactics }} />

        <div className="folder-card__front" ref={folderFrontRef} />
      </div>

      <h3 className="folder-label" ref={labelRef} onClick={()=>prop.handleClick()}>
        {prop.text}
      </h3>
    </section>
  );
};

export default EditionFolder;
