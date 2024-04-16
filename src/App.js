import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ShoppingCart from './components/ShoppingCart';
import ProfileSection from './components/ProfileSection';
import ShopSection from './components/ShopSection';
import CommisionsSection from './components/CommissionsSection';
import ContactSection from './components/ContactSection';
import CheckoutSection from './components/CheckoutSection';
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
    case "/shop":
      screen = <ShopSection />
      break;
    case "/commissions":
      screen = <CommisionsSection />
      break;
    case "/contact":
      screen = <ContactSection />
      break;
    case "/profile":
      screen = <ProfileSection />
      break;
    case "/shoppingcart":
      screen = <ShoppingCart />
      break;
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