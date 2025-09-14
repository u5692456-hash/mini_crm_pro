import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const getDefaultBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];
    
    if (pathSegments?.length === 0 || location?.pathname === '/dashboard') {
      return breadcrumbs;
    }

    // Map path segments to readable labels
    const pathMap = {
      'customer-list': { label: 'Customers', icon: 'Users' },
      'customer-details': { label: 'Customer Details', icon: 'User' },
      'lead-management': { label: 'Lead Management', icon: 'TrendingUp' },
    };

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const pathInfo = pathMap?.[segment];
      
      if (pathInfo) {
        breadcrumbs?.push({
          label: pathInfo?.label,
          path: currentPath,
          icon: pathInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || getDefaultBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
            )}
            
            {item?.isLast || index === breadcrumbs?.length - 1 ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span>{item?.label}</span>
              </span>
            ) : (
              <Link
                to={item?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-smooth"
              >
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span>{item?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;