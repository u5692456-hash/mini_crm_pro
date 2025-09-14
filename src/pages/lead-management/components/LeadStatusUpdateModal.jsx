import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LeadStatusUpdateModal = ({ isOpen, lead, onClose, onConfirm }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Lost', label: 'Lost' }
  ];

  useEffect(() => {
    if (lead) {
      setSelectedStatus(lead?.status);
    }
  }, [lead]);

  const handleConfirm = async () => {
    if (!selectedStatus || selectedStatus === lead?.status) return;
    
    setIsUpdating(true);
    try {
      await onConfirm(lead?.id, selectedStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevated w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Update Lead Status</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="h-8 w-8"
          />
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium text-foreground mb-1">{lead?.title}</h3>
            <p className="text-sm text-muted-foreground">
              Customer: {lead?.customerName}
            </p>
          </div>

          <div className="mb-6">
            <Select
              label="New Status"
              options={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
              required
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Status will be updated with current timestamp</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            loading={isUpdating}
            disabled={!selectedStatus || selectedStatus === lead?.status}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Update Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadStatusUpdateModal;