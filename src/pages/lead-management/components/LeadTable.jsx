import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import LeadStatusBadge from './LeadStatusBadge';
import LeadStatusUpdateModal from './LeadStatusUpdateModal';
import LeadDeleteModal from './LeadDeleteModal';

const LeadTable = ({ 
  leads, 
  sortConfig, 
  onSort, 
  selectedLeads, 
  onSelectLead, 
  onSelectAll, 
  onEditLead, 
  onDeleteLead,
  onUpdateStatus,
  searchTerm 
}) => {
  const [statusUpdateModal, setStatusUpdateModal] = useState({ isOpen: false, lead: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, lead: null });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const handleStatusUpdate = (lead) => {
    setStatusUpdateModal({ isOpen: true, lead });
  };

  const handleDelete = (lead) => {
    setDeleteModal({ isOpen: true, lead });
  };

  const handleStatusUpdateConfirm = (leadId, newStatus) => {
    onUpdateStatus(leadId, newStatus);
    setStatusUpdateModal({ isOpen: false, lead: null });
  };

  const handleDeleteConfirm = (leadId) => {
    onDeleteLead(leadId);
    setDeleteModal({ isOpen: false, lead: null });
  };

  if (leads?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No leads found</h3>
        <p className="text-muted-foreground mb-6">
          {searchTerm ? 'Try adjusting your search or filters' : 'Get started by creating your first lead'}
        </p>
        <Button iconName="Plus" iconPosition="left">
          Create Lead
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={selectedLeads?.length === leads?.length && leads?.length > 0}
                    indeterminate={selectedLeads?.length > 0 && selectedLeads?.length < leads?.length}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => onSort('title')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Lead Title</span>
                    {getSortIcon('title')}
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => onSort('customerName')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Customer</span>
                    {getSortIcon('customerName')}
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => onSort('status')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => onSort('value')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Value</span>
                    {getSortIcon('value')}
                  </button>
                </th>
                <th className="text-left px-4 py-3">
                  <button
                    onClick={() => onSort('createdAt')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Created</span>
                    {getSortIcon('createdAt')}
                  </button>
                </th>
                <th className="w-32 px-4 py-3 text-center">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads?.map((lead) => (
                <tr key={lead?.id} className="hover:bg-muted/30 transition-smooth">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedLeads?.includes(lead?.id)}
                      onChange={(e) => onSelectLead(lead?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-foreground">
                      {highlightText(lead?.title, searchTerm)}
                    </div>
                    {lead?.description && (
                      <div className="text-sm text-muted-foreground mt-1 truncate max-w-xs">
                        {lead?.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-foreground">
                      {highlightText(lead?.customerName, searchTerm)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {lead?.customerEmail}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <LeadStatusBadge status={lead?.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-foreground">
                      {formatCurrency(lead?.value)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">
                      {formatDate(lead?.createdAt)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Edit"
                        onClick={() => onEditLead(lead)}
                        className="h-8 w-8"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="RefreshCw"
                        onClick={() => handleStatusUpdate(lead)}
                        className="h-8 w-8"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Trash2"
                        onClick={() => handleDelete(lead)}
                        className="h-8 w-8 text-error hover:text-error"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {leads?.map((lead) => (
          <div key={lead?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  checked={selectedLeads?.includes(lead?.id)}
                  onChange={(e) => onSelectLead(lead?.id, e?.target?.checked)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">
                    {highlightText(lead?.title, searchTerm)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {highlightText(lead?.customerName, searchTerm)}
                  </p>
                  <div className="flex items-center space-x-4 mb-2">
                    <LeadStatusBadge status={lead?.status} size="sm" />
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(lead?.value)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(lead?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => onEditLead(lead)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => handleStatusUpdate(lead)}
              >
                Status
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => handleDelete(lead)}
                className="text-error hover:text-error"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Status Update Modal */}
      <LeadStatusUpdateModal
        isOpen={statusUpdateModal?.isOpen}
        lead={statusUpdateModal?.lead}
        onClose={() => setStatusUpdateModal({ isOpen: false, lead: null })}
        onConfirm={handleStatusUpdateConfirm}
      />
      {/* Delete Modal */}
      <LeadDeleteModal
        isOpen={deleteModal?.isOpen}
        lead={deleteModal?.lead}
        onClose={() => setDeleteModal({ isOpen: false, lead: null })}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default LeadTable;