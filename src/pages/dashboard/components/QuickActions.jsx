import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add Customer',
      icon: 'UserPlus',
      variant: 'default',
      onClick: () => navigate('/customer-list'),
      description: 'Create a new customer record'
    },
    {
      label: 'Create Lead',
      icon: 'TrendingUp',
      variant: 'outline',
      onClick: () => navigate('/lead-management'),
      description: 'Add a new sales opportunity'
    },
    {
      label: 'View Customers',
      icon: 'Users',
      variant: 'outline',
      onClick: () => navigate('/customer-list'),
      description: 'Browse customer database'
    },
    {
      label: 'Manage Leads',
      icon: 'Target',
      variant: 'outline',
      onClick: () => navigate('/lead-management'),
      description: 'Track sales pipeline'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action, index) => (
          <div key={index} className="group">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="h-auto p-4 flex-col space-y-2"
            >
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-smooth">
                {action?.description}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;