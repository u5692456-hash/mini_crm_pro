import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const LeadFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  customerOptions,
  totalResults 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Lost', label: 'Lost' }
  ];

  const handleFilterChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const hasActiveFilters = filters?.status || filters?.customer || filters?.dateFrom || filters?.dateTo || filters?.search;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Leads</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Search leads by title..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        {/* Status Filter */}
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Customer Filter */}
        <Select
          placeholder="Filter by customer"
          options={[{ value: '', label: 'All Customers' }, ...customerOptions]}
          value={filters?.customer}
          onChange={(value) => handleFilterChange('customer', value)}
          searchable
        />

        {/* Date Range */}
        <div className="flex space-x-2">
          <Input
            type="date"
            placeholder="From date"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            className="flex-1"
          />
          <Input
            type="date"
            placeholder="To date"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            className="flex-1"
          />
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {totalResults} lead{totalResults !== 1 ? 's' : ''} found
          {hasActiveFilters && ' (filtered)'}
        </span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>New</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Contacted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Converted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Lost</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;