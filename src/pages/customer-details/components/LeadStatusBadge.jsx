import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadStatusBadge = ({ status, size = 'default', showIcon = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      new: {
        label: 'New',
        icon: 'Plus',
        className: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      contacted: {
        label: 'Contacted',
        icon: 'Phone',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      },
      converted: {
        label: 'Converted',
        icon: 'CheckCircle',
        className: 'bg-green-100 text-green-800 border-green-200'
      },
      lost: {
        label: 'Lost',
        icon: 'XCircle',
        className: 'bg-red-100 text-red-800 border-red-200'
      }
    };
    
    return configs?.[status] || configs?.new;
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full border font-medium ${config?.className} ${sizeClasses?.[size]}`}>
      {showIcon && <Icon name={config?.icon} size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />}
      <span>{config?.label}</span>
    </span>
  );
};

export default LeadStatusBadge;