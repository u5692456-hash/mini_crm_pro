import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import CustomerTable from './components/CustomerTable';
import SearchToolbar from './components/SearchToolbar';
import PaginationControls from './components/PaginationControls';
import EmptyState from './components/EmptyState';
import BulkActionsModal from './components/BulkActionsModal';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });

  // Mock customer data
  const mockCustomers = [
    {
      id: 'CUST-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      lastInteraction: '2025-01-08T10:30:00Z',
      status: 'Active',
      leadCount: 3,
      totalValue: 45000
    },
    {
      id: 'CUST-002',
      name: 'Michael Chen',
      email: 'michael.chen@innovate.io',
      phone: '+1 (555) 234-5678',
      company: 'Innovate Digital',
      lastInteraction: '2025-01-07T14:15:00Z',
      status: 'Active',
      leadCount: 2,
      totalValue: 32000
    },
    {
      id: 'CUST-003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@globaltech.com',
      phone: '+1 (555) 345-6789',
      company: 'Global Tech Industries',
      lastInteraction: '2025-01-06T09:45:00Z',
      status: 'Active',
      leadCount: 5,
      totalValue: 78000
    },
    {
      id: 'CUST-004',
      name: 'David Thompson',
      email: 'david.thompson@startup.co',
      phone: '+1 (555) 456-7890',
      company: 'Startup Ventures Co.',
      lastInteraction: '2025-01-05T16:20:00Z',
      status: 'Inactive',
      leadCount: 1,
      totalValue: 15000
    },
    {
      id: 'CUST-005',
      name: 'Lisa Wang',
      email: 'lisa.wang@enterprise.net',
      phone: '+1 (555) 567-8901',
      company: 'Enterprise Networks',
      lastInteraction: '2025-01-04T11:30:00Z',
      status: 'Active',
      leadCount: 4,
      totalValue: 92000
    },
    {
      id: 'CUST-006',
      name: 'Robert Martinez',
      email: 'robert.martinez@consulting.biz',
      phone: '+1 (555) 678-9012',
      company: 'Martinez Consulting',
      lastInteraction: '2025-01-03T13:45:00Z',
      status: 'Active',
      leadCount: 2,
      totalValue: 28000
    },
    {
      id: 'CUST-007',
      name: 'Jennifer Lee',
      email: 'jennifer.lee@fintech.org',
      phone: '+1 (555) 789-0123',
      company: 'FinTech Solutions',
      lastInteraction: '2025-01-02T08:15:00Z',
      status: 'Active',
      leadCount: 6,
      totalValue: 105000
    },
    {
      id: 'CUST-008',
      name: 'James Wilson',
      email: 'james.wilson@healthcare.com',
      phone: '+1 (555) 890-1234',
      company: 'Healthcare Innovations',
      lastInteraction: '2025-01-01T15:30:00Z',
      status: 'Active',
      leadCount: 3,
      totalValue: 67000
    },
    {
      id: 'CUST-009',
      name: 'Amanda Davis',
      email: 'amanda.davis@retail.store',
      phone: '+1 (555) 901-2345',
      company: 'Retail Solutions Store',
      lastInteraction: '2024-12-30T12:00:00Z',
      status: 'Inactive',
      leadCount: 1,
      totalValue: 8000
    },
    {
      id: 'CUST-010',
      name: 'Christopher Brown',
      email: 'chris.brown@manufacturing.inc',
      phone: '+1 (555) 012-3456',
      company: 'Manufacturing Inc.',
      lastInteraction: '2024-12-29T10:45:00Z',
      status: 'Active',
      leadCount: 4,
      totalValue: 85000
    },
    {
      id: 'CUST-011',
      name: 'Michelle Taylor',
      email: 'michelle.taylor@logistics.pro',
      phone: '+1 (555) 123-4567',
      company: 'Logistics Pro Services',
      lastInteraction: '2024-12-28T14:20:00Z',
      status: 'Active',
      leadCount: 2,
      totalValue: 41000
    },
    {
      id: 'CUST-012',
      name: 'Kevin Anderson',
      email: 'kevin.anderson@energy.corp',
      phone: '+1 (555) 234-5678',
      company: 'Energy Corporation',
      lastInteraction: '2024-12-27T09:30:00Z',
      status: 'Active',
      leadCount: 7,
      totalValue: 125000
    }
  ];

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = mockCustomers;

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(customer =>
        customer?.name?.toLowerCase()?.includes(query) ||
        customer?.email?.toLowerCase()?.includes(query) ||
        customer?.company?.toLowerCase()?.includes(query)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      // Handle date sorting
      if (sortConfig?.key === 'lastInteraction') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCustomers?.length / itemsPerPage);
  const paginatedCustomers = filteredAndSortedCustomers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Reset page when items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSelectCustomer = (customerId, isSelected) => {
    setSelectedCustomers(prev =>
      isSelected
        ? [...prev, customerId]
        : prev?.filter(id => id !== customerId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedCustomers(isSelected ? paginatedCustomers?.map(c => c?.id) : []);
  };

  const handleDeleteCustomer = (customerId) => {
    // In real app, this would make an API call
    console.log('Deleting customer:', customerId);
    setSelectedCustomers(prev => prev?.filter(id => id !== customerId));
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleBulkAction = (action) => {
    setBulkModal({ isOpen: true, action });
  };

  const handleBulkConfirm = async () => {
    const { action } = bulkModal;
    
    if (action === 'delete') {
      // In real app, this would make API calls
      console.log('Bulk deleting customers:', selectedCustomers);
      setSelectedCustomers([]);
    } else if (action === 'export') {
      // In real app, this would generate and download CSV
      console.log('Exporting customers:', selectedCustomers);
      
      // Mock CSV generation
      const selectedData = mockCustomers?.filter(c => selectedCustomers?.includes(c?.id));
      const csvContent = [
        'Name,Email,Phone,Company,Last Interaction,Status',
        ...selectedData?.map(c => 
          `"${c?.name}","${c?.email}","${c?.phone}","${c?.company}","${c?.lastInteraction}","${c?.status}"`
        )
      ]?.join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL?.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `customers-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
      a?.click();
      window.URL?.revokeObjectURL(url);
    }
  };

  const clearSelection = () => {
    setSelectedCustomers([]);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your customer relationships and track interactions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                >
                  Import
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/customer-details', { state: { editMode: true } })}
                >
                  Add Customer
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            totalCustomers={mockCustomers?.length}
            filteredCount={filteredAndSortedCustomers?.length}
            selectedCount={selectedCustomers?.length}
            onBulkExport={() => handleBulkAction('export')}
            onBulkDelete={() => handleBulkAction('delete')}
            onClearSelection={clearSelection}
          />

          {/* Customer Table or Empty State */}
          {filteredAndSortedCustomers?.length === 0 ? (
            <EmptyState
              isSearching={!!searchQuery}
              searchQuery={searchQuery}
              onClearSearch={clearSearch}
            />
          ) : (
            <>
              <CustomerTable
                customers={paginatedCustomers}
                selectedCustomers={selectedCustomers}
                onSelectCustomer={handleSelectCustomer}
                onSelectAll={handleSelectAll}
                onDeleteCustomer={handleDeleteCustomer}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedCustomers?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </>
          )}
        </div>
      </main>
      {/* Bulk Actions Modal */}
      <BulkActionsModal
        isOpen={bulkModal?.isOpen}
        onClose={() => setBulkModal({ isOpen: false, action: null })}
        action={bulkModal?.action}
        selectedCustomers={selectedCustomers}
        customerData={mockCustomers}
        onConfirm={handleBulkConfirm}
      />
    </div>
  );
};

export default CustomerList;