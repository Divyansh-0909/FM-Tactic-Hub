import PropTypes from 'prop-types';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import TacticDashboard from './components/TacticDashboard';
import './App.css';

function App() {
  return (
    <>
      {/* <Navbar />  */}
      <Hero />
      <TacticDashboard/>
      {/* <Footer /> */}
    </>
  );
}

export default App;