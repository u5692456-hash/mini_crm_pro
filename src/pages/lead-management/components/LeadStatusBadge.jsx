import React from 'react';
import Icon from '../../../components/AppIcon';

const LeadStatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'New':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: 'Plus',
          iconColor: 'text-blue-600'
        };
      case 'Contacted':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: 'Phone',
          iconColor: 'text-yellow-600'
        };
      case 'Converted':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: 'CheckCircle',
          iconColor: 'text-green-600'
        };
      case 'Lost':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: 'XCircle',
          iconColor: 'text-red-600'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: 'Circle',
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span className={`inline-flex items-center space-x-1 ${sizeClasses} font-medium rounded-full border ${config?.color}`}>
      <Icon name={config?.icon} size={iconSize} className={config?.iconColor} />
      <span>{status}</span>
    </span>
  );
};

export default LeadStatusBadge;