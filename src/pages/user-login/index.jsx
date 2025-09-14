import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import SecurityBadges from './components/SecurityBadges';
import DemoCredentials from './components/DemoCredentials';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Handle auto-fill credentials from demo component
  const handleFillCredentials = (credentials) => {
    setFormData(credentials);
    
    // Trigger form update by dispatching events
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (emailInput && passwordInput) {
      // Set values
      emailInput.value = credentials?.email;
      passwordInput.value = credentials?.password;
      
      // Dispatch change events
      emailInput?.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput?.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-elevated p-8">
          {/* Header */}
          <LoginHeader />

          {/* Demo Credentials */}
          <DemoCredentials onFillCredentials={handleFillCredentials} />

          {/* Login Form */}
          <LoginForm />

          {/* Footer Links */}
          <LoginFooter />

          {/* Security Badges */}
          <SecurityBadges />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Mini CRM Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;