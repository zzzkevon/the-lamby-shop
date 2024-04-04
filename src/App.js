import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CustomRequests from './components/CustomRequests';

function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <Footer />
      
      <CustomRequests />
    </div>
  );
}

export default App;