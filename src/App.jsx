import PropTypes from 'prop-types';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Tactic from './components/Tactic';
import './App.css';

function App() {
  return (
    <>
      <Navbar /> 
      <Hero />
      <Tactic/>
      {/* <Footer /> */}
    </>
  );
}

export default App;