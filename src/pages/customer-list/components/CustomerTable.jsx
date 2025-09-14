import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomerTable = ({ 
  customers, 
  selectedCustomers, 
  onSelectCustomer, 
  onSelectAll, 
  onDeleteCustomer, 
  sortConfig, 
  onSort 
}) => {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground/50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleDeleteClick = (customer) => {
    setDeleteConfirm(customer);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      onDeleteCustomer(deleteConfirm?.id);
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const allSelected = customers?.length > 0 && selectedCustomers?.length === customers?.length;
  const someSelected = selectedCustomers?.length > 0 && selectedCustomers?.length < customers?.length;

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Customer Name</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Email</span>
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('phone')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Phone</span>
                    {getSortIcon('phone')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('company')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Company</span>
                    {getSortIcon('company')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('lastInteraction')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    <span>Last Interaction</span>
                    {getSortIcon('lastInteraction')}
                  </button>
                </th>
                <th className="px-4 py-3 text-center w-32">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers?.map((customer) => (
                <tr 
                  key={customer?.id} 
                  className="hover:bg-muted/30 transition-smooth group"
                >
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedCustomers?.includes(customer?.id)}
                      onChange={(e) => onSelectCustomer(customer?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => navigate('/customer-details', { state: { customer } })}
                      className="flex items-center space-x-3 hover:text-primary transition-smooth"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={18} className="text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground">{customer?.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {customer?.id}</div>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{customer?.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{customer?.phone}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{customer?.company}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-foreground">{formatDate(customer?.lastInteraction)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Eye"
                        onClick={() => navigate('/customer-details', { state: { customer } })}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Edit"
                        onClick={() => navigate('/customer-details', { state: { customer, editMode: true } })}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Trash2"
                        onClick={() => handleDeleteClick(customer)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
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
        {customers?.map((customer) => (
          <div key={customer?.id} className="bg-card rounded-lg border border-border shadow-subtle p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedCustomers?.includes(customer?.id)}
                  onChange={(e) => onSelectCustomer(customer?.id, e?.target?.checked)}
                />
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{customer?.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {customer?.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Eye"
                  onClick={() => navigate('/customer-details', { state: { customer } })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Edit"
                  onClick={() => navigate('/customer-details', { state: { customer, editMode: true } })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  onClick={() => handleDeleteClick(customer)}
                  className="text-error hover:text-error"
                />
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{customer?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{customer?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{customer?.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-foreground">Last: {formatDate(customer?.lastInteraction)}</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => navigate('/customer-details', { state: { customer } })}
              className="mt-4"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg border border-border shadow-elevated p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Customer</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-foreground mb-6">
              Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? 
              This will also remove all associated leads and interaction history.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Customer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;