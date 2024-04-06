import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{background: '#cfcfcf'}}>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <Footer />
    </div>
  );
}

export default App;
