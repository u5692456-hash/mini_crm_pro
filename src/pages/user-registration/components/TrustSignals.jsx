import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'All information is stored securely and never shared'
    },
    {
      icon: 'CheckCircle',
      title: 'GDPR Compliant',
      description: 'We follow strict data protection regulations'
    }
  ];

  return (
    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-green-600" />
        <h3 className="text-sm font-semibold text-foreground">Your Security Matters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;