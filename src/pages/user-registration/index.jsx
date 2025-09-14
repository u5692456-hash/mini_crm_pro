import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import LoginRedirect from './components/LoginRedirect';

const UserRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - Mini CRM Pro</title>
        <meta name="description" content="Create your Mini CRM Pro account to start managing customers and leads efficiently. Secure registration with enterprise-grade protection." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6 hover-scale">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-subtle">
                <Icon name="Building2" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Mini CRM Pro</span>
            </Link>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Join thousands of professionals managing their customer relationships efficiently
            </p>
          </div>

          {/* Registration Card */}
          <div className="bg-card rounded-xl shadow-elevated border border-border p-8">
            <RegistrationForm />
            <LoginRedirect />
          </div>

          {/* Trust Signals */}
          <TrustSignals />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Mini CRM Pro. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;