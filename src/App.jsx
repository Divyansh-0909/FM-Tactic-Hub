import './App.css';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const TacticDashboard = lazy(() => import('./components/TacticDashboard'));
const Installation = lazy(() => import('./components/Installation'));

const LoadingScreen = () => (
  <div className="full-page-loader">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Header/>
        <Hero />
        <TacticDashboard />
        <Installation/>
      </Suspense>
    </ErrorBoundary>
  );
}
export default App;
