import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  return (
    <div className="mt-8 space-y-4">
      {/* Forgot Password Link */}
      <div className="text-center">
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth inline-flex items-center space-x-1">
          <Icon name="HelpCircle" size={14} />
          <span>Forgot your password?</span>
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">New to Mini CRM Pro?</span>
        </div>
      </div>

      {/* Registration Link */}
      <div className="text-center">
        <Link
          to="/user-registration"
          className="inline-flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-smooth"
        >
          <Icon name="UserPlus" size={14} />
          <span>Create your account</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>

      {/* Session Info */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          Secure session • Auto-logout after 24 hours of inactivity
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;