import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import LeadTableRow from './LeadTableRow';

const LeadsSection = ({ leads, onCreateLead, onEditLead, onDeleteLead, onUpdateStatus }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: 'all', label: 'All Leads', count: leads?.length },
    { value: 'new', label: 'New', count: leads?.filter(lead => lead?.status === 'new')?.length },
    { value: 'contacted', label: 'Contacted', count: leads?.filter(lead => lead?.status === 'contacted')?.length },
    { value: 'converted', label: 'Converted', count: leads?.filter(lead => lead?.status === 'converted')?.length },
    { value: 'lost', label: 'Lost', count: leads?.filter(lead => lead?.status === 'lost')?.length }
  ];

  const filteredLeads = leads?.filter(lead => 
    statusFilter === 'all' || lead?.status === statusFilter
  );

  const sortedLeads = [...filteredLeads]?.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a?.title?.toLowerCase();
        bValue = b?.title?.toLowerCase();
        break;
      case 'value':
        aValue = a?.value;
        bValue = b?.value;
        break;
      case 'created':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Associated Leads</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track all leads for this customer
            </p>
          </div>
          <Button
            variant="default"
            onClick={onCreateLead}
            iconName="Plus"
            iconPosition="left"
            className="mt-4 sm:mt-0"
          >
            Create Lead
          </Button>
        </div>
      </div>
      {/* Status Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {statusOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setStatusFilter(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                statusFilter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <span>{option?.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                statusFilter === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-muted-foreground'
              }`}>
                {option?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Leads Table */}
      <div className="overflow-x-auto">
        {sortedLeads?.length > 0 ? (
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <span>Lead Title</span>
                    <Icon name={getSortIcon('title')} size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('value')}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <span>Value</span>
                    <Icon name={getSortIcon('value')} size={14} />
                  </button>
                </th>
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('created')}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <span>Created</span>
                    <Icon name={getSortIcon('created')} size={14} />
                  </button>
                </th>
                <th className="text-right p-4">
                  <span className="text-sm font-medium text-muted-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLeads?.map((lead) => (
                <LeadTableRow
                  key={lead?.id}
                  lead={lead}
                  onEdit={onEditLead}
                  onDelete={onDeleteLead}
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No leads found</h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter === 'all' ?'This customer doesn\'t have any leads yet.'
                : `No leads with status "${statusFilter}" found.`
              }
            </p>
            <Button
              variant="outline"
              onClick={onCreateLead}
              iconName="Plus"
              iconPosition="left"
            >
              Create First Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsSection;