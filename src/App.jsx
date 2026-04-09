import './App.css';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const TacticDashboard = lazy(() => import('./components/TacticDashboard'));
// const Footer = lazy(() => import('./components/Footer'));

const LoadingScreen = () => (
  <div className="full-page-loader">
    <h1>LOADING...</h1>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        {/* <Navbar /> */}
        <Hero />
        <TacticDashboard />
        {/* <Footer /> */}
      </Suspense>
    </ErrorBoundary>
  );
}
export default App;