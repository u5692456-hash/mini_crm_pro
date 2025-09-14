import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-subtle">
          <Icon name="Building2" size={24} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Welcome Back
      </h1>
      <p className="text-muted-foreground">
        Sign in to your Mini CRM Pro account to continue
      </p>
    </div>
  );
};

export default LoginHeader;