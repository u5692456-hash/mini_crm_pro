import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import LeadStatusChart from './components/LeadStatusChart';
import LeadValueChart from './components/LeadValueChart';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock dashboard data
  const mockDashboardData = {
    metrics: [
      {
        title: "Total Customers",
        value: "1,247",
        change: "+12%",
        changeType: "increase",
        icon: "Users",
        color: "primary"
      },
      {
        title: "Active Leads",
        value: "89",
        change: "+8%",
        changeType: "increase",
        icon: "TrendingUp",
        color: "warning"
      },
      {
        title: "Conversion Rate",
        value: "24.5%",
        change: "+3.2%",
        changeType: "increase",
        icon: "Target",
        color: "success"
      },
      {
        title: "Monthly Revenue",
        value: "$127,450",
        change: "-2.1%",
        changeType: "decrease",
        icon: "DollarSign",
        color: "error"
      }
    ],
    leadStatusData: [
      { name: "New", value: 35, total: 89 },
      { name: "Contacted", value: 28, total: 89 },
      { name: "Converted", value: 18, total: 89 },
      { name: "Lost", value: 8, total: 89 }
    ],
    leadValueData: [
      { month: "Jan", value: 85000 },
      { month: "Feb", value: 92000 },
      { month: "Mar", value: 78000 },
      { month: "Apr", value: 105000 },
      { month: "May", value: 98000 },
      { month: "Jun", value: 127000 }
    ],
    recentActivities: [
      {
        type: "customer_added",
        title: "New customer added",
        description: "Sarah Johnson from TechCorp was added to the system",
        timestamp: new Date(Date.now() - 300000) // 5 minutes ago
      },
      {
        type: "lead_converted",
        title: "Lead converted to customer",
        description: "Michael Rodriguez - $15,000 deal closed successfully",
        timestamp: new Date(Date.now() - 900000) // 15 minutes ago
      },
      {
        type: "lead_created",
        title: "New lead created",
        description: "Emma Davis from StartupXYZ - $8,500 potential value",
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        type: "customer_updated",
        title: "Customer information updated",
        description: "Contact details updated for James Wilson",
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        type: "lead_lost",
        title: "Lead marked as lost",
        description: "Alex Thompson - $12,000 opportunity closed as lost",
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        type: "customer_added",
        title: "New customer added",
        description: "David Chen from InnovateLab joined as a customer",
        timestamp: new Date(Date.now() - 10800000) // 3 hours ago
      }
    ]
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-muted rounded-lg"></div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
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
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardData?.metrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LeadStatusChart data={dashboardData?.leadStatusData || []} />
            <LeadValueChart data={dashboardData?.leadValueData || []} />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity activities={dashboardData?.recentActivities || []} />
            </div>
            
            {/* Additional Info Panel */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-4">Today's Goals</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Follow up calls</span>
                    <span className="text-sm font-medium text-foreground">8/12</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New leads target</span>
                    <span className="text-sm font-medium text-foreground">5/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Proposals sent</span>
                    <span className="text-sm font-medium text-foreground">3/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Deal Size</span>
                    <span className="text-sm font-medium text-foreground">$7,850</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sales Cycle</span>
                    <span className="text-sm font-medium text-foreground">28 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="text-sm font-medium text-success">24.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pipeline Value</span>
                    <span className="text-sm font-medium text-foreground">$698,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;