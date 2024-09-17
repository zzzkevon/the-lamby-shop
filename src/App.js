import axios from 'axios';
import NavBar from './components/NavBar';
import { useEffect, useReducer, useState } from 'react';
import HeroSection from './components/HeroSectionV2';
import AboutSection from './components/AboutSection';
import ShoppingCart from './components/ShoppingCart';
import ProfileSection from './components/ProfileSection';
import ShopSection from './components/ShopSection';
import CommisionsSection from './components/CommissionsSection';
import ContactSection from './components/ContactSection';
import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import AccountRecovery from './components/AccountRecovery'
import AccountUpdate from './components/accountPages/AccountUpdate';
import CheckoutSection from './components/CheckoutSection';
import { cartReducer, CartTypes, initialCartState} from './components/reducers/cartReducer';
import { type } from '@testing-library/user-event/dist/cjs/utility/type.js';
// import Footer from './components/Footer';

function loadCartFromStorage() {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : initialCartState;
}

function App() {
  const [items, setItems] = useState([]);
  const [cart, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (itemId) => dispatch({type: CartTypes.ADD, itemId})
  
  
  useEffect(() => {
      axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  },[]);

  

  let screen
  switch (window.location.pathname) {
    case "/":
      screen = <HeroSection />
      break;
    case "/about":
      screen = <AboutSection />
      break;
    case "/shop":
      screen = <ShopSection cart={cart} items={items} addToCart={addToCart}/>
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
      screen = <ShoppingCart cart={cart} item={items} />
      break;
    case "/forgotpass":
      screen = <ForgotPassword />
      break;
    case "/createaccount":
      screen = <CreateAccount />
      break;
    case "/update-account":
      screen = <AccountUpdate/>
      break;
    case "/shoppingcart/checkout":
      screen = <CheckoutSection />
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