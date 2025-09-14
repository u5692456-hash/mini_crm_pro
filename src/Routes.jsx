import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import CustomerList from './pages/customer-list';
import Dashboard from './pages/dashboard';
import UserRegistration from './pages/user-registration';
import CustomerDetails from './pages/customer-details';
import LeadManagement from './pages/lead-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomerDetails />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/lead-management" element={<LeadManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
