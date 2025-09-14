import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CreateLeadModal = ({ isOpen, onClose, onCreateLead, customerOptions }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerId: '',
    value: '',
    status: 'New'
  });
  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Lost', label: 'Lost' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Lead title is required';
    }

    if (!formData?.customerId) {
      newErrors.customerId = 'Please select a customer';
    }

    if (!formData?.value || parseFloat(formData?.value) <= 0) {
      newErrors.value = 'Please enter a valid lead value';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsCreating(true);
    try {
      const leadData = {
        ...formData,
        value: parseFloat(formData?.value),
        createdAt: new Date()?.toISOString()
      };
      
      await onCreateLead(leadData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        customerId: '',
        value: '',
        status: 'New'
      });
      setErrors({});
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setFormData({
        title: '',
        description: '',
        customerId: '',
        value: '',
        status: 'New'
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevated w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Create New Lead</h2>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={handleClose}
            className="h-8 w-8"
            disabled={isCreating}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Lead Title"
            type="text"
            placeholder="Enter lead title"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              placeholder="Enter lead description (optional)"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <Select
            label="Customer"
            placeholder="Select customer"
            options={customerOptions}
            value={formData?.customerId}
            onChange={(value) => handleInputChange('customerId', value)}
            error={errors?.customerId}
            required
            searchable
          />

          <Input
            label="Lead Value"
            type="number"
            placeholder="Enter lead value in USD"
            value={formData?.value}
            onChange={(e) => handleInputChange('value', e?.target?.value)}
            error={errors?.value}
            required
            min="0"
            step="0.01"
          />

          <Select
            label="Initial Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
          />

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>Lead will be created with current timestamp</span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isCreating}
              iconName="Plus"
              iconPosition="left"
            >
              Create Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;