import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password?.length >= 8;
    const hasUpperCase = /[A-Z]/?.test(password);
    const hasLowerCase = /[a-z]/?.test(password);
    const hasNumbers = /\d/?.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      requirements: {
        minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    };
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData?.password);
      if (!passwordValidation?.isValid) {
        newErrors.password = 'Password does not meet requirements';
      }
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.fullName);
      
      // Navigate to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          message: 'Account created successfully! Welcome to Mini CRM Pro.',
          type: 'success'
        }
      });
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData?.password);
  const isFormValid = formData?.fullName?.trim() && 
                     validateEmail(formData?.email) && 
                     passwordValidation?.isValid && 
                     formData?.password === formData?.confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.submit && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} className="text-red-600" />
            <p className="text-red-800 text-sm font-medium">{errors?.submit}</p>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          className="w-full"
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {formData?.password && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium text-foreground mb-2">Password Requirements:</p>
            <div className="space-y-1">
              {[
                { key: 'minLength', text: 'At least 8 characters' },
                { key: 'hasUpperCase', text: 'One uppercase letter' },
                { key: 'hasLowerCase', text: 'One lowercase letter' },
                { key: 'hasNumbers', text: 'One number' },
                { key: 'hasSpecialChar', text: 'One special character' }
              ]?.map(({ key, text }) => (
                <div key={key} className="flex items-center space-x-2">
                  <Icon 
                    name={passwordValidation?.requirements?.[key] ? "Check" : "X"} 
                    size={14} 
                    className={passwordValidation?.requirements?.[key] ? "text-green-600" : "text-red-600"} 
                  />
                  <span className={`text-xs ${passwordValidation?.requirements?.[key] ? "text-green-700" : "text-red-700"}`}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid || isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;