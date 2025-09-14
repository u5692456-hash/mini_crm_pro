import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = ({ onFillCredentials }) => {
  const [isVisible, setIsVisible] = useState(false);

  const demoCredentials = {
    email: 'admin@minicrm.com',
    password: 'admin123'
  };

  const handleFillCredentials = () => {
    onFillCredentials(demoCredentials);
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="Info" size={14} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-1">Demo Access</h3>
          <p className="text-sm text-blue-700 mb-3">
            Use the demo credentials below to explore the CRM application features.
          </p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-smooth inline-flex items-center space-x-1"
            >
              <Icon name={isVisible ? "EyeOff" : "Eye"} size={14} />
              <span>{isVisible ? 'Hide' : 'Show'} Credentials</span>
            </button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleFillCredentials}
              iconName="Copy"
              iconPosition="left"
            >
              Auto Fill
            </Button>
          </div>

          {isVisible && (
            <div className="mt-3 p-3 bg-white border border-blue-200 rounded-md">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <code className="text-foreground bg-muted px-2 py-1 rounded text-xs">
                    {demoCredentials?.email}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Password:</span>
                  <code className="text-foreground bg-muted px-2 py-1 rounded text-xs">
                    {demoCredentials?.password}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoCredentials;