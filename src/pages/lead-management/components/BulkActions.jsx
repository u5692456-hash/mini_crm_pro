import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedLeads, onBulkStatusUpdate, onBulkDelete, onExport, onClearSelection }) => {
  const [bulkStatus, setBulkStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const statusOptions = [
    { value: '', label: 'Select status...' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Lost', label: 'Lost' }
  ];

  const handleBulkStatusUpdate = async () => {
    if (!bulkStatus || selectedLeads?.length === 0) return;
    
    setIsProcessing(true);
    try {
      await onBulkStatusUpdate(selectedLeads, bulkStatus);
      setBulkStatus('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads?.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedLeads?.length} lead${selectedLeads?.length > 1 ? 's' : ''}? This action cannot be undone.`
    );
    
    if (confirmed) {
      setIsProcessing(true);
      try {
        await onBulkDelete(selectedLeads);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleExport = async () => {
    setIsProcessing(true);
    try {
      await onExport(selectedLeads);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedLeads?.length === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedLeads?.length} lead{selectedLeads?.length > 1 ? 's' : ''} selected
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          {/* Bulk Status Update */}
          <div className="flex items-center space-x-2">
            <Select
              placeholder="Update status..."
              options={statusOptions}
              value={bulkStatus}
              onChange={setBulkStatus}
              className="w-40"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={handleBulkStatusUpdate}
              disabled={!bulkStatus || isProcessing}
              loading={isProcessing}
            >
              Update
            </Button>
          </div>

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            disabled={isProcessing}
          >
            Export
          </Button>

          {/* Bulk Delete */}
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={handleBulkDelete}
            disabled={isProcessing}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;