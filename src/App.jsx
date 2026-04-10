import './App.css';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Header = lazy(() => import('./components/Header'));
const TacticDashboard = lazy(() => import('./components/TacticDashboard'));
// const Footer = lazy(() => import('./components/Footer'));

const LoadingScreen = () => (
  <div className="full-page-loader">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        {/* <Navbar /> */}
        <Header/>
        <Hero />
        <TacticDashboard />
        {/* <Footer /> */}
      </Suspense>
    </ErrorBoundary>
  );
}
export default App;