import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-md w-full mx-4 animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
          </div>
          
          {/* Warning Message */}
          <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
              <div className="text-sm text-error">
                <p className="font-medium">This action cannot be undone</p>
                <p className="mt-1 opacity-80">
                  All associated data will be permanently removed from the system.
                </p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={isLoading}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;