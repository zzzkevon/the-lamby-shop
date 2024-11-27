import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar'
//Nav bar left
import { signOut as amplifySignOut } from '@aws-amplify/auth'; // Correct imports

//Nav bar left
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSectionV2';
import AboutSection from './components/AboutSection';
import ShopSection from './components/ShopSection';
import CommissionsSection from './components/CommissionsSection/CommissionsSection';
import ContactSection from './components/ContactSection';

//Right side of nav bar
import ShoppingCart from './components/ShoppingCart';
import ProfileSection from './components/ProfileSection';

import CreateAccount from './components/CreateAccount';
import ForgotPassword from './components/ForgotPassword';
import AccountRecovery from './components/AccountRecovery';
import AccountUpdate from './components/accountPages/AccountUpdate';
import CheckoutSection from './components/CheckoutSection';
import CreateAdmin from './components/adminPages/CreateAdmin';
import AccountManagement from './components/AccountManagement/AccountManagement';
import UpdateEmail from './components/AccountManagement/UpdateEmail';
import UpdatePassword from './components/AccountManagement/UpdatePassword';
import PasswordSuccess from './components/AccountManagement/PasswordSuccess';
import UpdatePayment from './components/AccountManagement/UpdatePayment';
import AdminManageProfile from './components/AdminManageProfile';
import AdminManageInventory from './components/adminPages/AdminManageInventory';
import AdminDashboard from './components/adminPages/AdminDashboard';
import NotFound from './components/NotFound';
import RoleBasedProfile from './components/profiles/RoleBasedProfile';
import CarouselContext from './contexts/CarouselContext';
import CarouselContext1 from './contexts/CarouselContext1';
import { ToastProvider } from './contexts/ToastContext';
import PaymentSuccess from './components/checkout/PaymentSuccess';
import MessageSubscribers from './components/adminPages/MessageSubscribers';
import axios from 'axios';


function App() {
  const [email, setEmail] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if(storedEmail)
      setEmail(storedEmail);
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if(storedUsername)
      setUsername(storedUsername);
  }, [])

  useEffect(() => {
    console.log(`Email is ${email} with role ${userRole} with user ID ${username}`);
  }, [email, userRole, username])

  const handleSignOut = async () => {
    try {
      await amplifySignOut(); // Use Amplify's sign out
      localStorage.clear();
      setUserRole('guest');
      window.location = '/'; // Send user to the home page after sign out
    } catch (error) {
      console.error('Sign-out error:', error); // Clear email from storage
    }
  };

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
    // Check if this is the first time loading in the session
    if (!sessionStorage.getItem('initialLoadDone')) {
      // Clear localStorage items on first load
      localStorage.removeItem('carousel');
      localStorage.removeItem('carousel1');

      // Set a sessionStorage flag to prevent this from running again
      sessionStorage.setItem('initialLoadDone', 'true');
    }

    // Proceed with your usual data-fetching logic
    const storedCarousel = localStorage.getItem('carousel');
    const storedCarousel1 = localStorage.getItem('carousel1');

    if (!storedCarousel) {
      axios
        .get("https://d65k2g0qm3.execute-api.us-west-2.amazonaws.com/dev/items")
        .then(response => {
          setCarousel(response.data);
          // setCarousel1(response.data);
          localStorage.setItem('carousel', JSON.stringify(response.data));
          // localStorage.setItem('carousel1', JSON.stringify(response.data));
        })
        .catch(error => console.error("Error fetching items:", error));
    } else {
      setCarousel(JSON.parse(storedCarousel));
    }
  }, []);


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
    () => ({ carousel, setCarousel }),
    [carousel]
  );

  const currentCarouselContext1 = useMemo(
    () => ({ carousel1, setCarousel1 }),
    [carousel1]
  );
  return (
    <CarouselContext1.Provider value={currentCarouselContext1}>
      <CarouselContext.Provider value={currentCarouselContext}>
        <SnackbarProvider>
          <ToastProvider>
            <Router>
              <NavBar userRole={userRole} setUserRole={setUserRole} />
              <Routes>
                {/*Left side of the nav bar functions*/}
                <Route path="/" element={<HeroSection />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/shop" element={<ShopSection />} />
                {/* Fix added to commission section: added email and username props as they were removed */}
                <Route path="/commissions" element={
                  <CommissionsSection userRole={userRole} email={email} username={username} />} />
                <Route path="/contact" element={<ContactSection />} />

                <Route path="/accountrecovery" element={<AccountRecovery />} />
                <Route path="/profile" element={
                  <ProfileSection handleSignOut={handleSignOut} />} />
                <Route path="/shoppingcart" element={<ShoppingCart />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/createaccount" element={<CreateAccount />} />
                <Route path="/update-account" element={<AccountUpdate />} />
                <Route path="/shoppingcart/checkout" element={<CheckoutSection />} />

                {/*Admin route pathings*/}
                <Route path="/admin/manage-profile" element={<AdminManageProfile />} />
                <Route path="/admin/admin-dashboard" element={
                  <AdminDashboard handleSignOut={handleSignOut} userRole={userRole} />} />
                <Route path="/admin/create-admin" element={<CreateAdmin />} />
                <Route path="/admin/admin-manage-inventory" element={<AdminManageInventory />} />

                <Route path="/account-management" element={<AccountManagement />} />
                <Route path="/update-email" element={<UpdateEmail />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/password-success" element={<PasswordSuccess />} />
                <Route path="/update-payment" element={<UpdatePayment />} />
                <Route path="/role-based-profile" element={
                  <RoleBasedProfile userRole={userRole} handleSignOut={handleSignOut} />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                {/*Page routing for 404 or not found*/}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ToastProvider>
        </SnackbarProvider>
      </CarouselContext.Provider>
    </CarouselContext1.Provider>
  );
}

export default App;