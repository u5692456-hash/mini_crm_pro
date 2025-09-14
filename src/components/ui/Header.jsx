import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Customers', path: '/customer-list', icon: 'Users' },
    { label: 'Leads', path: '/lead-management', icon: 'TrendingUp' },
  ];

  const isActivePath = (path) => {
    if (path === '/customer-list' && location?.pathname === '/customer-details') {
      return true;
    }
    return location?.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/user-login');
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/dashboard" 
          className="flex items-center space-x-2 hover-scale"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Building2" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">Mini CRM Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-muted ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/customer-list')}
            >
              Add Customer
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="TrendingUp"
              iconPosition="left"
              onClick={() => navigate('/lead-management')}
            >
              New Lead
            </Button>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">John Doe</span>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated animate-fade-in">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border mb-1">
                    john.doe@company.com
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted rounded-md transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-card border-r border-border w-80 h-full shadow-elevated animate-slide-in-from-left">
            <div className="p-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-6">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Quick Actions */}
              <div className="space-y-2 pt-4 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground px-4 mb-2">Quick Actions</h3>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => {
                    navigate('/customer-list');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Add Customer
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="TrendingUp"
                  iconPosition="left"
                  onClick={() => {
                    navigate('/lead-management');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  New Lead
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;