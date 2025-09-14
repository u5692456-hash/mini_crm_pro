import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LeadStatusBadge from './LeadStatusBadge';

const LeadTableRow = ({ lead, onEdit, onDelete, onUpdateStatus }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const statusOptions = [
    { value: 'new', label: 'New', icon: 'Plus' },
    { value: 'contacted', label: 'Contacted', icon: 'Phone' },
    { value: 'converted', label: 'Converted', icon: 'CheckCircle' },
    { value: 'lost', label: 'Lost', icon: 'XCircle' }
  ];

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(lead?.id, newStatus);
    setShowStatusMenu(false);
  };

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-smooth">
      <td className="p-4">
        <div>
          <div className="font-medium text-foreground">{lead?.title}</div>
          {lead?.description && (
            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {lead?.description}
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="flex items-center space-x-1 hover:opacity-80 transition-smooth"
          >
            <LeadStatusBadge status={lead?.status} size="sm" />
            <Icon name="ChevronDown" size={12} className="text-muted-foreground" />
          </button>
          
          {showStatusMenu && (
            <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-10 min-w-[140px]">
              <div className="p-1">
                {statusOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleStatusChange(option?.value)}
                    className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-md transition-smooth ${
                      lead?.status === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={option?.icon} size={14} />
                    <span>{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="font-medium text-foreground">{formatCurrency(lead?.value)}</div>
      </td>
      <td className="p-4">
        <div className="text-sm text-muted-foreground">{formatDate(lead?.createdAt)}</div>
      </td>
      <td className="p-4">
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(lead)}
            iconName="Edit"
            className="h-8 w-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(lead?.id)}
            iconName="Trash2"
            className="h-8 w-8 p-0 text-error hover:text-error"
          />
        </div>
      </td>
    </tr>
  );
};

export default LeadTableRow;