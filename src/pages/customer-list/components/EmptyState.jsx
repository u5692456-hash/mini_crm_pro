import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ isSearching, searchQuery, onClearSearch }) => {
  const navigate = useNavigate();

  if (isSearching) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-subtle p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No customers found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any customers matching "<strong>{searchQuery}</strong>". 
          Try adjusting your search terms or browse all customers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onClearSearch}
          >
            Clear Search
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/customer-details', { state: { editMode: true } })}
          >
            Add New Customer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle p-12 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Users" size={40} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">No customers yet</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Get started by adding your first customer. You can import existing customers 
        or create new ones from scratch.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/customer-details', { state: { editMode: true } })}
        >
          Add Your First Customer
        </Button>
        <Button
          variant="outline"
          iconName="Upload"
          iconPosition="left"
        >
          Import Customers
        </Button>
      </div>
      
      {/* Quick Tips */}
      <div className="mt-8 pt-8 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Quick Tips:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="UserPlus" size={16} className="text-primary mt-0.5" />
            <span>Add customer details including contact information and company data</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
            <span>Track leads and opportunities for each customer</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Calendar" size={16} className="text-primary mt-0.5" />
            <span>Monitor interaction history and follow-up dates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;