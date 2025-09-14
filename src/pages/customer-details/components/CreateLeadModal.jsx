import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CreateLeadModal = ({ isOpen, onClose, onSubmit, customerId, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    status: 'new'
  });
  const [errors, setErrors] = useState({});

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
    
    if (!formData?.value || formData?.value <= 0) {
      newErrors.value = 'Lead value must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    const leadData = {
      ...formData,
      value: parseFloat(formData?.value),
      customerId,
      createdAt: new Date()?.toISOString(),
      id: Date.now() // Mock ID generation
    };
    
    onSubmit(leadData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      value: '',
      status: 'new'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-lg w-full mx-4 animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Create New Lead</h3>
                <p className="text-sm text-muted-foreground">Add a new lead for this customer</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              iconName="X"
              className="h-8 w-8 p-0"
            />
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Lead Title"
              type="text"
              placeholder="Enter lead title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Enter lead description (optional)"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-input placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
            </div>
            
            <Input
              label="Lead Value"
              type="number"
              placeholder="0"
              value={formData?.value}
              onChange={(e) => handleInputChange('value', e?.target?.value)}
              error={errors?.value}
              min="0"
              step="0.01"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Initial Status
              </label>
              <select
                value={formData?.status}
                onChange={(e) => handleInputChange('status', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                iconName="Plus"
                iconPosition="left"
              >
                Create Lead
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLeadModal;