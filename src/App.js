import NavBar from './components/NavBar';
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
import CreateAdmin from './components/adminPages/CreateAdmin';
import AdminDashboard from './components/adminPages/AdminDashboard';
import AdminManageProfile from './components/AdminManageProfile'
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
    case "/accountrecovery":
      screen = <AccountRecovery/>
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
    case "/admin/manage-profile":
      screen = <AdminManageProfile />
      break;
    case "/admin/admin-dashboard":
      screen = <AdminDashboard />
      break;
      case "/admin/create-admin":
      screen = <CreateAdmin />
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