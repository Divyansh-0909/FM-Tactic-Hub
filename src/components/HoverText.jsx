import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from 'gsap/all';

gsap.registerPlugin(useGSAP,SplitText);

export const HoverText = ({type,children})=>{
    const spanRef1=useRef();
    const spanRef2=useRef();

    let splitText1;
    let splitText2;

    const {contextSafe}=useGSAP(()=>{
        document.fonts.ready.then(()=>{
            splitText1=SplitText.create(spanRef1.current, {
            type: "chars",
            autoSplit: true
            });
            splitText2=SplitText.create(spanRef2.current, {
                type: "chars",
                autoSplit: true
            });
        });        
    });

    const handleMouseOver=contextSafe(()=>{
        gsap.to(splitText1.chars, {
            yPercent: -100,
            stagger: 0.04,
            duration: 0.4
        });
        gsap.to(splitText2.chars, {
            yPercent: -100,
            stagger: 0.04,
            duration: 0.4
        });
    })

    const handleMouseLeave=contextSafe(()=>{
        gsap.to(splitText1.chars, {
            yPercent: 0,
            stagger: 0.04,
            duration: 0.4
        });
        gsap.to(splitText2.chars, {
            yPercent: 0,
            stagger: 0.04,
            duration: 0.4
        });
    })

    return (
        <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={`text-container ${type? type : ''}`}>
            <span className="text-hover" ref={spanRef1}>{children}</span>
            <span className="text-hover" aria-hidden={true} ref={spanRef2}>{children}</span>
        </div>
    )
}