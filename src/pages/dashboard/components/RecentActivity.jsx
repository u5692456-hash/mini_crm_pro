import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'customer_added':
        return { icon: 'UserPlus', color: 'text-success' };
      case 'lead_created':
        return { icon: 'TrendingUp', color: 'text-primary' };
      case 'lead_converted':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'lead_lost':
        return { icon: 'XCircle', color: 'text-error' };
      case 'customer_updated':
        return { icon: 'Edit', color: 'text-warning' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity, index) => {
            const { icon, color } = getActivityIcon(activity?.type);
            
            return (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className={`p-2 rounded-full bg-muted ${color}`}>
                  <Icon name={icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatTimestamp(activity?.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;