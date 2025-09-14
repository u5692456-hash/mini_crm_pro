import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsModal = ({ 
  isOpen, 
  onClose, 
  action, 
  selectedCustomers, 
  customerData, 
  onConfirm 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getSelectedCustomerNames = () => {
    return selectedCustomers?.map(id => customerData?.find(c => c?.id === id)?.name)?.filter(Boolean)?.slice(0, 3);
  };

  const selectedNames = getSelectedCustomerNames();
  const remainingCount = selectedCustomers?.length - selectedNames?.length;

  const getModalContent = () => {
    switch (action) {
      case 'delete':
        return {
          icon: 'Trash2',
          iconColor: 'text-error',
          iconBg: 'bg-error/10',
          title: 'Delete Customers',
          description: 'This action cannot be undone and will permanently remove all customer data including associated leads.',
          confirmText: 'Delete Customers',
          confirmVariant: 'destructive'
        };
      case 'export':
        return {
          icon: 'Download',
          iconColor: 'text-primary',
          iconBg: 'bg-primary/10',
          title: 'Export Customers',
          description: 'Export selected customer data as CSV file including all contact information and interaction history.',
          confirmText: 'Export Data',
          confirmVariant: 'default'
        };
      default:
        return {
          icon: 'AlertCircle',
          iconColor: 'text-warning',
          iconBg: 'bg-warning/10',
          title: 'Bulk Action',
          description: 'Perform bulk action on selected customers.',
          confirmText: 'Confirm',
          confirmVariant: 'default'
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border shadow-elevated p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 ${modalContent?.iconBg} rounded-full flex items-center justify-center`}>
            <Icon name={modalContent?.icon} size={24} className={modalContent?.iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{modalContent?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCustomers?.length} customer{selectedCustomers?.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-foreground mb-4">
            {modalContent?.description}
          </p>

          {/* Selected Customers Preview */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">Selected customers:</div>
            <div className="space-y-1">
              {selectedNames?.map((name, index) => (
                <div key={index} className="text-sm text-foreground flex items-center space-x-2">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                  <span>{name}</span>
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="text-sm text-muted-foreground">
                  ... and {remainingCount} more customer{remainingCount !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant={modalContent?.confirmVariant}
            onClick={handleConfirm}
            loading={isProcessing}
            iconName={modalContent?.icon}
            iconPosition="left"
          >
            {modalContent?.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;