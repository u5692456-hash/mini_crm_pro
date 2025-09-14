import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineStats = ({ leads }) => {
  const calculateStats = () => {
    const stats = {
      total: leads?.length,
      totalValue: 0,
      byStatus: {
        New: { count: 0, value: 0 },
        Contacted: { count: 0, value: 0 },
        Converted: { count: 0, value: 0 },
        Lost: { count: 0, value: 0 }
      }
    };

    leads?.forEach(lead => {
      stats.totalValue += lead?.value;
      if (stats?.byStatus?.[lead?.status]) {
        stats.byStatus[lead.status].count++;
        stats.byStatus[lead.status].value += lead?.value;
      }
    });

    return stats;
  };

  const stats = calculateStats();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'New': return 'Plus';
      case 'Contacted': return 'Phone';
      case 'Converted': return 'CheckCircle';
      case 'Lost': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'text-blue-600 bg-blue-100';
      case 'Contacted': return 'text-yellow-600 bg-yellow-100';
      case 'Converted': return 'text-green-600 bg-green-100';
      case 'Lost': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const conversionRate = stats?.total > 0 ? ((stats?.byStatus?.Converted?.count / stats?.total) * 100)?.toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Pipeline Value */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Pipeline</h3>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(stats?.totalValue)}</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {stats?.total} total leads
        </div>
      </div>
      {/* Conversion Rate */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
              <p className="text-2xl font-bold text-foreground">{conversionRate}%</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {stats?.byStatus?.Converted?.count} converted leads
        </div>
      </div>
      {/* Status Breakdown */}
      {Object.entries(stats?.byStatus)?.slice(0, 2)?.map(([status, data]) => (
        <div key={status} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
                <Icon name={getStatusIcon(status)} size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">{status} Leads</h3>
                <p className="text-2xl font-bold text-foreground">{data?.count}</p>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatCurrency(data?.value)} value
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineStats;