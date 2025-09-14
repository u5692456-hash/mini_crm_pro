import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LeadFilters from './components/LeadFilters';
import LeadTable from './components/LeadTable';
import BulkActions from './components/BulkActions';
import PipelineStats from './components/PipelineStats';
import CreateLeadModal from './components/CreateLeadModal';

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: '',
    customer: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockLeads = [
    {
      id: 1,
      title: "Enterprise Software License",
      description: "Annual software licensing deal for 500+ users",
      customerId: 1,
      customerName: "Acme Corporation",
      customerEmail: "contact@acme.com",
      status: "Contacted",
      value: 125000,
      createdAt: "2024-12-01T10:30:00Z"
    },
    {
      id: 2,
      title: "Cloud Migration Project",
      description: "Complete infrastructure migration to cloud platform",
      customerId: 2,
      customerName: "TechStart Inc",
      customerEmail: "info@techstart.com",
      status: "New",
      value: 85000,
      createdAt: "2024-12-05T14:15:00Z"
    },
    {
      id: 3,
      title: "Digital Marketing Campaign",
      description: "6-month comprehensive digital marketing strategy",
      customerId: 3,
      customerName: "Global Retail Ltd",
      customerEmail: "marketing@globalretail.com",
      status: "Converted",
      value: 45000,
      createdAt: "2024-11-28T09:45:00Z"
    },
    {
      id: 4,
      title: "Security Audit Services",
      description: "Complete cybersecurity assessment and implementation",
      customerId: 4,
      customerName: "FinanceFirst Bank",
      customerEmail: "security@financefirst.com",
      status: "Contacted",
      value: 95000,
      createdAt: "2024-12-03T16:20:00Z"
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Custom mobile application for iOS and Android",
      customerId: 5,
      customerName: "HealthCare Plus",
      customerEmail: "dev@healthcareplus.com",
      status: "New",
      value: 75000,
      createdAt: "2024-12-07T11:00:00Z"
    },
    {
      id: 6,
      title: "Data Analytics Platform",
      description: "Business intelligence and analytics solution",
      customerId: 6,
      customerName: "Manufacturing Pro",
      customerEmail: "analytics@manufacturingpro.com",
      status: "Lost",
      value: 110000,
      createdAt: "2024-11-25T13:30:00Z"
    },
    {
      id: 7,
      title: "E-commerce Integration",
      description: "Multi-platform e-commerce solution integration",
      customerId: 7,
      customerName: "Fashion Forward",
      customerEmail: "tech@fashionforward.com",
      status: "Contacted",
      value: 65000,
      createdAt: "2024-12-02T08:45:00Z"
    },
    {
      id: 8,
      title: "Training & Development Program",
      description: "Employee skill development and training initiative",
      customerId: 8,
      customerName: "Education Excellence",
      customerEmail: "training@eduexcellence.com",
      status: "Converted",
      value: 35000,
      createdAt: "2024-11-30T15:10:00Z"
    }
  ];

  const mockCustomers = [
    { value: 1, label: "Acme Corporation" },
    { value: 2, label: "TechStart Inc" },
    { value: 3, label: "Global Retail Ltd" },
    { value: 4, label: "FinanceFirst Bank" },
    { value: 5, label: "HealthCare Plus" },
    { value: 6, label: "Manufacturing Pro" },
    { value: 7, label: "Fashion Forward" },
    { value: 8, label: "Education Excellence" }
  ];

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLeads(mockLeads);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filter and sort leads
  const processedLeads = useMemo(() => {
    let filtered = [...leads];

    // Apply filters
    if (filters?.status) {
      filtered = filtered?.filter(lead => lead?.status === filters?.status);
    }

    if (filters?.customer) {
      filtered = filtered?.filter(lead => lead?.customerId === parseInt(filters?.customer));
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(lead => 
        lead?.title?.toLowerCase()?.includes(searchTerm) ||
        lead?.customerName?.toLowerCase()?.includes(searchTerm)
      );
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(lead => 
        new Date(lead.createdAt) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(lead => 
        new Date(lead.createdAt) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
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
  }, [leads, filters, sortConfig]);

  useEffect(() => {
    setFilteredLeads(processedLeads);
  }, [processedLeads]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedLeads([]);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      customer: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
  };

  const handleSelectLead = (leadId, isSelected) => {
    setSelectedLeads(prev => 
      isSelected 
        ? [...prev, leadId]
        : prev?.filter(id => id !== leadId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedLeads(isSelected ? filteredLeads?.map(lead => lead?.id) : []);
  };

  const handleCreateLead = async (leadData) => {
    // Find customer details
    const customer = mockCustomers?.find(c => c?.value === parseInt(leadData?.customerId));
    
    const newLead = {
      id: Math.max(...leads?.map(l => l?.id)) + 1,
      ...leadData,
      customerName: customer?.label || 'Unknown Customer',
      customerEmail: `contact@${customer?.label?.toLowerCase()?.replace(/\s+/g, '')}.com`
    };

    setLeads(prev => [newLead, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleEditLead = (lead) => {
    // Navigate to edit lead page or open edit modal
    console.log('Edit lead:', lead);
  };

  const handleDeleteLead = async (leadId) => {
    setLeads(prev => prev?.filter(lead => lead?.id !== leadId));
    setSelectedLeads(prev => prev?.filter(id => id !== leadId));
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    setLeads(prev => prev?.map(lead => 
      lead?.id === leadId 
        ? { ...lead, status: newStatus, updatedAt: new Date()?.toISOString() }
        : lead
    ));
  };

  const handleBulkStatusUpdate = async (leadIds, newStatus) => {
    setLeads(prev => prev?.map(lead => 
      leadIds?.includes(lead?.id)
        ? { ...lead, status: newStatus, updatedAt: new Date()?.toISOString() }
        : lead
    ));
    setSelectedLeads([]);
  };

  const handleBulkDelete = async (leadIds) => {
    setLeads(prev => prev?.filter(lead => !leadIds?.includes(lead?.id)));
    setSelectedLeads([]);
  };

  const handleExport = async (leadIds) => {
    const leadsToExport = leadIds?.length > 0 
      ? leads?.filter(lead => leadIds?.includes(lead?.id))
      : filteredLeads;
    
    const csvContent = [
      ['Title', 'Customer', 'Status', 'Value', 'Created Date']?.join(','),
      ...leadsToExport?.map(lead => [
        `"${lead?.title}"`,
        `"${lead?.customerName}"`,
        lead?.status,
        lead?.value,
        new Date(lead.createdAt)?.toLocaleDateString()
      ]?.join(','))
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <Icon name="Loader2" size={24} className="animate-spin text-primary" />
                <span className="text-lg text-muted-foreground">Loading leads...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Lead Management</h1>
              <p className="text-muted-foreground">
                Track and manage your sales pipeline with comprehensive lead oversight
              </p>
            </div>
            <Button
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 sm:mt-0"
            >
              Create Lead
            </Button>
          </div>

          {/* Pipeline Stats */}
          <PipelineStats leads={filteredLeads} />

          {/* Filters */}
          <LeadFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            customerOptions={mockCustomers}
            totalResults={filteredLeads?.length}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedLeads={selectedLeads}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkDelete={handleBulkDelete}
            onExport={handleExport}
            onClearSelection={() => setSelectedLeads([])}
          />

          {/* Leads Table */}
          <LeadTable
            leads={filteredLeads}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedLeads={selectedLeads}
            onSelectLead={handleSelectLead}
            onSelectAll={handleSelectAll}
            onEditLead={handleEditLead}
            onDeleteLead={handleDeleteLead}
            onUpdateStatus={handleUpdateStatus}
            searchTerm={filters?.search}
          />

          {/* Create Lead Modal */}
          <CreateLeadModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreateLead={handleCreateLead}
            customerOptions={mockCustomers}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;