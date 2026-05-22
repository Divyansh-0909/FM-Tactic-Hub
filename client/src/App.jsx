import './App.css';
import { lazy, Suspense, useRef , useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Hero from './components/hero/Hero';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollSmoother } from "gsap-trial/all";

gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollSmoother);

const TacticDashboard = lazy(() => import('./components/tacticDashboard/TacticDashboard'));
const Installation = lazy(() => import('./components/footer/Installation'));

const LoadingScreen = () => (
  <div className="full-page-loader">
    <div className="spinner"></div>
  </div>
);

function App() {
  const containerRef = useRef();

  useGSAP(() => {
    const items = gsap.utils.toArray(".scroll-item");

    // Pin everything except the last section
    items.slice(0, -1).forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top top",
        pin: true,
        pinSpacing: false,
      });
    });

    gsap.to(".layer-1", {
      scale: 0.9,
      borderRadius: "24px",
      opacity: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: ".layer-2",
        start: "top bottom",  
        end: "top top",      
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <ErrorBoundary>
      <div ref={containerRef} id='smooth-content' className="scroll-wrapper">

        <div className="scroll-item layer-1">
          <Suspense fallback={<LoadingScreen />}>
            <Hero />
          </Suspense>
        </div>

        <div className="scroll-item layer-2" tabIndex={-1}>
          <Suspense fallback={<LoadingScreen />}>
            <TacticDashboard />
            <Installation />
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;