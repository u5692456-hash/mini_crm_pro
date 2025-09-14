import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  totalCustomers, 
  filteredCount, 
  selectedCount,
  onBulkExport,
  onBulkDelete,
  onClearSelection 
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localSearch, onSearchChange]);

  const handleSearchClear = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={18} className="text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search customers by name or email..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e?.target?.value)}
              className="pl-10 pr-10"
            />
            {localSearch && (
              <button
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon name="X" size={18} className="text-muted-foreground hover:text-foreground transition-smooth" />
              </button>
            )}
          </div>
        </div>

        {/* Results Info & Actions */}
        <div className="flex items-center justify-between lg:justify-end space-x-4">
          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {searchQuery ? (
              <span>
                {filteredCount} of {totalCustomers} customers
                {filteredCount !== totalCustomers && (
                  <span className="text-primary font-medium"> (filtered)</span>
                )}
              </span>
            ) : (
              <span>{totalCustomers} customers total</span>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-foreground bg-primary/10 px-3 py-1 rounded-full">
                {selectedCount} selected
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={onBulkExport}
              >
                Export
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={onBulkDelete}
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClearSelection}
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Search Results Indicator */}
      {searchQuery && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Search results for: <strong>"{searchQuery}"</strong>
              </span>
            </div>
            {filteredCount === 0 && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="AlertCircle" size={16} />
                <span>No customers found</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchToolbar;