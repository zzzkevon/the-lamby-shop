import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AccountManagement from './components/AccountManagement/AccountManagement';
import UpdateEmail from './components/AccountManagement/UpdateEmail';
import UpdatePassword from './components/AccountManagement/UpdatePassword';
import UpdatePayment from './components/AccountManagement/UpdatePayment';
import AdminManageProfile from './components/AdminManageProfile';
import AdminManageInventory from './components/adminPages/AdminManageInventory';
import NotFound from './components/NotFound';
import RoleBasedView from './components/roles/RoleBasedView';
import { CarouselProvider } from './contexts/CarouselContext';

function App() {
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);
  return (
    <CarouselProvider>
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
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/update-email" element={<UpdateEmail />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-payment" element={<UpdatePayment />} />
            <Route path="/admin/admin-manage-inventory" element={<AdminManageInventory/>} />
            <Route path="/role-based-view" element={<RoleBasedView userRole={userRole} />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Router>
    </CarouselProvider>
  );
}

export default App;
