import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import AccountRecovery from './components/AccountRecovery';
import AccountUpdate from './components/accountPages/AccountUpdate';
import CheckoutSection from './components/CheckoutSection';
import CreateAdmin from './components/adminPages/CreateAdmin';
import AdminDashboard from './components/adminPages/AdminDashboard';
import AccountManagement from './components/AccountManagement/AccountManagement';
import UpdateEmail from './components/AccountManagement/UpdateEmail';
import UpdatePassword from './components/AccountManagement/UpdatePassword';
import PasswordSuccess from './components/AccountManagement/PasswordSuccess';
import UpdatePayment from './components/AccountManagement/UpdatePayment';
import AdminManageProfile from './components/AdminManageProfile';
import AdminManageInventory from './components/adminPages/AdminManageInventory';
import NotFound from './components/NotFound';
import { CarouselProvider } from './contexts/CarouselContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  const [userRole, setUserRole] = useState('guest');

  const [carousel, setCarousel] = useState(() => {
    const storedCarousel = localStorage.getItem('carousel');
    // Change this line to return an array instead of an object
    return storedCarousel ? JSON.parse(storedCarousel) : [];
  });

  const [carousel1, setCarousel1] = useState(() => {
    const storedCarousel1 = localStorage.getItem('carousel1');
    // Change this line to return an array instead of an object
    return storedCarousel1 ? JSON.parse(storedCarousel1) : [];
  });


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items');
        const items = response.data; // Adjust this based on the API response structure
        setCarousel(items); // Set the carousel state with the fetched items
        setCarousel1(items)
        localStorage.setItem('carousel', JSON.stringify(items)); // Store in localStorage
        localStorage.setItem('carousel1', JSON.stringify(items)); // Store in localStorage
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Only fetch items if carousel is empty (i.e., no items in localStorage)
    if (carousel.length === 0) {
      fetchItems();
    }

  }, [carousel, carousel1]);

  // Store carousel in localStorage whenever it changes
  useEffect(() => {
    if (carousel) {
      localStorage.setItem('carousel', JSON.stringify(carousel));
    }
  }, [carousel]);

  useEffect(() => {
    if (carousel1) {
      localStorage.setItem('carousel1', JSON.stringify(carousel1));
    }
  }, [carousel1]);
  const currentCarouselContext = useMemo(
    () => ({carousel, setCarousel}),
    [carousel]
  );

  const currentCarouselContext1 = useMemo(
    () => ({carousel1, setCarousel1}),
    [carousel1]
  );
  return (
    <CarouselProvider>
      <ToastProvider>
      <Router>
          <NavBar userRole={userRole} setUserRole={setUserRole}/>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/accountrecovery" element={<AccountRecovery />} />
            <Route path="/shop" element={<ShopSection />} />
            <Route path="/commissions" element={<CommisionsSection userRole={userRole} />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/profile" element={<ProfileSection />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/update-account" element={<AccountUpdate />} />
            <Route path="/shoppingcart/checkout" element={<CheckoutSection />} />
            <Route path="/admin/manage-profile" element={<AdminManageProfile />} />
            <Route path="/admin/admin-dashboard" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/40" />} />
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/password-success" element={<PasswordSuccess/>} />
            <Route path="/update-payment" element={<UpdatePayment />} />
            <Route path="/admin/admin-manage-inventory" element={<AdminManageInventory/>} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Router>
        </ToastProvider>
    </CarouselProvider>

  );
}

export default App;