import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LeadDeleteModal = ({ isOpen, lead, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(lead?.id);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevated w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-error">Delete Lead</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-2">
                Are you sure you want to delete this lead?
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Lead:</strong> {lead?.title}</p>
                <p><strong>Customer:</strong> {lead?.customerName}</p>
                <p><strong>Value:</strong> ${lead?.value?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-red-800">
              <Icon name="AlertCircle" size={14} />
              <span className="font-medium">This action cannot be undone</span>
            </div>
            <p className="text-sm text-red-700 mt-1">
              All lead data and associated history will be permanently removed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete Lead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadDeleteModal;