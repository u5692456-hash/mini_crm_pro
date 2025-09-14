import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerProfileCard = ({ customer, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleSave = () => {
    onEdit(editedCustomer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
        {/* Customer Avatar */}
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
              {customer?.avatar ? (
                <Image 
                  src={customer?.avatar} 
                  alt={customer?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-primary" />
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${
              customer?.status === 'active' ? 'bg-success' : 'bg-muted'
            }`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedCustomer?.name}
                  onChange={(e) => setEditedCustomer({...editedCustomer, name: e?.target?.value})}
                  className="text-2xl font-semibold text-foreground bg-transparent border-b border-border focus:border-primary outline-none"
                />
              ) : (
                <h1 className="text-2xl font-semibold text-foreground">{customer?.name}</h1>
              )}
              <p className="text-muted-foreground mt-1">Customer ID: #{customer?.id}</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    iconName="X"
                    iconPosition="left"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    iconName="Check"
                    iconPosition="left"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    iconName="Edit"
                    iconPosition="left"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={onDelete}
                    iconName="Trash2"
                    iconPosition="left"
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedCustomer?.email}
                    onChange={(e) => setEditedCustomer({...editedCustomer, email: e?.target?.value})}
                    className="text-sm text-foreground bg-transparent border-b border-border focus:border-primary outline-none flex-1"
                  />
                ) : (
                  <span className="text-sm text-foreground">{customer?.email}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedCustomer?.phone}
                    onChange={(e) => setEditedCustomer({...editedCustomer, phone: e?.target?.value})}
                    className="text-sm text-foreground bg-transparent border-b border-border focus:border-primary outline-none flex-1"
                  />
                ) : (
                  <span className="text-sm text-foreground">{customer?.phone}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer?.company}
                    onChange={(e) => setEditedCustomer({...editedCustomer, company: e?.target?.value})}
                    className="text-sm text-foreground bg-transparent border-b border-border focus:border-primary outline-none flex-1"
                  />
                ) : (
                  <span className="text-sm text-foreground">{customer?.company}</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedCustomer?.location}
                    onChange={(e) => setEditedCustomer({...editedCustomer, location: e?.target?.value})}
                    className="text-sm text-foreground bg-transparent border-b border-border focus:border-primary outline-none flex-1"
                  />
                ) : (
                  <span className="text-sm text-foreground">{customer?.location}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Joined {formatDate(customer?.joinDate)}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Last contact {formatDate(customer?.lastContact)}</span>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">{customer?.totalLeads}</div>
              <div className="text-xs text-muted-foreground">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-success">{customer?.convertedLeads}</div>
              <div className="text-xs text-muted-foreground">Converted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">${customer?.totalValue?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary">{customer?.conversionRate}%</div>
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileCard;