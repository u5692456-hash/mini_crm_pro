import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CustomerProfileCard from './components/CustomerProfileCard';
import LeadsSection from './components/LeadsSection';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import CreateLeadModal from './components/CreateLeadModal';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams?.get('id') || '1';
  
  const [customer, setCustomer] = useState(null);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null });
  const [createLeadModal, setCreateLeadModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingLead, setIsCreatingLead] = useState(false);

  // Mock customer data
  const mockCustomer = {
    id: customerId,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    status: "active",
    joinDate: "2023-03-15T10:30:00Z",
    lastContact: "2024-01-08T14:20:00Z",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    totalLeads: 8,
    convertedLeads: 3,
    totalValue: 125000,
    conversionRate: 38
  };

  // Mock leads data
  const mockLeads = [
    {
      id: 1,
      customerId: customerId,
      title: "Enterprise Software License",
      description: "Annual enterprise software licensing deal for 500+ users with premium support package",
      status: "contacted",
      value: 45000,
      createdAt: "2024-01-05T09:15:00Z"
    },
    {
      id: 2,
      customerId: customerId,
      title: "Cloud Infrastructure Migration",
      description: "Complete migration of on-premise infrastructure to cloud-based solutions",
      status: "new",
      value: 75000,
      createdAt: "2024-01-03T16:45:00Z"
    },
    {
      id: 3,
      customerId: customerId,
      title: "Security Audit & Compliance",
      description: "Comprehensive security audit and compliance implementation for financial regulations",
      status: "converted",
      value: 28000,
      createdAt: "2023-12-20T11:30:00Z"
    },
    {
      id: 4,
      customerId: customerId,
      title: "Mobile App Development",
      description: "Custom mobile application development for iOS and Android platforms",
      status: "contacted",
      value: 65000,
      createdAt: "2023-12-15T14:20:00Z"
    },
    {
      id: 5,
      customerId: customerId,
      title: "Data Analytics Platform",
      description: "Implementation of advanced data analytics and business intelligence platform",
      status: "lost",
      value: 35000,
      createdAt: "2023-11-28T10:00:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadCustomerData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCustomer(mockCustomer);
      setLeads(mockLeads);
      setIsLoading(false);
    };

    loadCustomerData();
  }, [customerId]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Customers', path: '/customer-list', icon: 'Users' },
    { label: customer?.name || 'Customer Details', path: `/customer-details?id=${customerId}`, icon: 'User', isLast: true }
  ];

  const handleEditCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
    // In real app, make API call to update customer
  };

  const handleDeleteCustomer = () => {
    setDeleteModal({
      isOpen: true,
      type: 'customer',
      id: customer?.id,
      title: 'Delete Customer',
      message: `Are you sure you want to delete ${customer?.name}? This will also delete all associated leads.`
    });
  };

  const handleDeleteLead = (leadId) => {
    const lead = leads?.find(l => l?.id === leadId);
    setDeleteModal({
      isOpen: true,
      type: 'lead',
      id: leadId,
      title: 'Delete Lead',
      message: `Are you sure you want to delete the lead "${lead?.title}"?`
    });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (deleteModal?.type === 'customer') {
      // Navigate back to customer list after deleting customer
      navigate('/customer-list');
    } else if (deleteModal?.type === 'lead') {
      // Remove lead from list
      setLeads(prev => prev?.filter(lead => lead?.id !== deleteModal?.id));
    }
    
    setIsDeleting(false);
    setDeleteModal({ isOpen: false, type: null, id: null });
  };

  const handleCreateLead = () => {
    setCreateLeadModal(true);
  };

  const handleSubmitLead = async (leadData) => {
    setIsCreatingLead(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add new lead to list
    setLeads(prev => [leadData, ...prev]);
    
    // Update customer stats
    setCustomer(prev => ({
      ...prev,
      totalLeads: prev?.totalLeads + 1,
      totalValue: prev?.totalValue + leadData?.value
    }));
    
    setIsCreatingLead(false);
    setCreateLeadModal(false);
  };

  const handleEditLead = (lead) => {
    // Navigate to lead management with edit mode
    navigate(`/lead-management?edit=${lead?.id}&customer=${customerId}`);
  };

  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev?.map(lead => 
      lead?.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    
    // Update customer conversion stats
    const updatedLeads = leads?.map(lead => 
      lead?.id === leadId ? { ...lead, status: newStatus } : lead
    );
    const convertedCount = updatedLeads?.filter(lead => lead?.status === 'converted')?.length;
    const conversionRate = Math.round((convertedCount / updatedLeads?.length) * 100);
    
    setCustomer(prev => ({
      ...prev,
      convertedLeads: convertedCount,
      conversionRate: conversionRate
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-64 mb-6"></div>
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded w-48"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-4 bg-muted rounded w-40"></div>
                        <div className="h-4 bg-muted rounded w-36"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-28"></div>
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-4 bg-muted rounded w-44"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="h-6 bg-muted rounded w-48 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3]?.map(i => (
                    <div key={i} className="h-12 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Customer Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The customer you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/customer-list')}
                className="text-primary hover:underline"
              >
                Return to Customer List
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="space-y-6">
            {/* Customer Profile */}
            <CustomerProfileCard
              customer={customer}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
            />
            
            {/* Associated Leads */}
            <LeadsSection
              leads={leads}
              onCreateLead={handleCreateLead}
              onEditLead={handleEditLead}
              onDeleteLead={handleDeleteLead}
              onUpdateStatus={handleUpdateLeadStatus}
            />
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null })}
        onConfirm={handleConfirmDelete}
        title={deleteModal?.title}
        message={deleteModal?.message}
        isLoading={isDeleting}
      />
      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={createLeadModal}
        onClose={() => setCreateLeadModal(false)}
        onSubmit={handleSubmitLead}
        customerId={customerId}
        isLoading={isCreatingLead}
      />
    </div>
  );
};

export default CustomerDetails;