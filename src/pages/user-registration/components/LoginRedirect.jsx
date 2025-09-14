import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginRedirect = () => {
  return (
    <div className="mt-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Already have an account?</span>
        </div>
      </div>
      
      <div className="mt-4">
        <Link
          to="/user-login"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium text-sm transition-smooth"
        >
          <Icon name="LogIn" size={16} />
          <span>Sign in to your account</span>
        </Link>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Need help? Contact our support team</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <a href="mailto:support@minicrmpro.com" className="hover:text-foreground transition-smooth">
            Email Support
          </a>
          <span>•</span>
          <a href="tel:+1-555-0123" className="hover:text-foreground transition-smooth">
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginRedirect;