import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
// import Footer from './components/Footer';

function App() {
  let screen
  switch (window.location.pathname) {
    case "/":
      screen = <HeroSection />
      break;
    case "/about":
      screen = <AboutSection />
      break;
    // case "/":
    //   screen = <HeroSection />
    //   break;
    // case "/":
    //   screen = <HeroSection />
    //   break;
    // case "/":
    //   screen = <HeroSection />
    //   break;
    // case "/":
    //   screen = <HeroSection />
    //   break;
    default:
      break;
  }
  return (
    <>
      <NavBar />
      {screen}
    </>
  );
}

export default App;
