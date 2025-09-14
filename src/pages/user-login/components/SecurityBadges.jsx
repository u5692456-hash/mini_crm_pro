import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'JWT token-based authentication for enhanced security'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never store or share your login credentials'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
        Your Security is Our Priority
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/30">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;