import React from 'react';
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
import AdminDashboard from './components/adminPages/AdminDashboard';
import AccountManagement from './components/AccountManagement/AccountManagement';
import UpdateEmail from './components/AccountManagement/UpdateEmail';
import UpdatePassword from './components/AccountManagement/UpdatePassword';
import UpdatePayment from './components/AccountManagement/UpdatePayment';
import AdminManageProfile from './components/AdminManageProfile';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/accountrecovery" element={<AccountRecovery />} />
        <Route path="/shop" element={<ShopSection />} />
        <Route path="/commissions" element={<CommisionsSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/update-account" element={<AccountUpdate />} />
        <Route path="/shoppingcart/checkout" element={<CheckoutSection />} />
        <Route path="/admin/manage-profile" element={<AdminManageProfile />} />
        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-admin" element={<CreateAdmin />} />
        <Route path="/account-management" element={<AccountManagement />} />
        <Route path="/update-email" element={<UpdateEmail />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-payment" element={<UpdatePayment />} />
      </Routes>
    </Router>
  );
}

export default App;
