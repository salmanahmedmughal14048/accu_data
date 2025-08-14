import React, { useState, useEffect } from 'react';
import './CloudAccountForm.css'; // Move styles to separate CSS file

const CloudAccountForm = ({ onNext, onPrev, initialData = {}, showPrevButton = false }) => {
  // State management
  const [formState, setFormState] = useState({
    selectedAccount: initialData.account || '',
    otherValue: initialData.otherValue || '',
    ipAddress: initialData.ipAddress || '',
    connectionStatus: {},
    hoveredSection: null,
    isMobile: false
  });

  // Configuration data
  const ACCOUNTS = [
    { id: 'baylor1', label: 'Baylor University 444 - Spine' },
    { id: 'baylor2', label: 'Baylor University Cadaver Lab 222 - Spine' },
    { id: 'baylor3', label: 'Baylor University Commons 111' },
    { id: 'other', label: 'Other' }
  ];

  // Effects
  useEffect(() => {
    const checkMobile = () => {
      setFormState(prev => ({ ...prev, isMobile: window.innerWidth <= 768 }));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Event handlers
  const handleAccountChange = (value) => {
    setFormState(prev => ({ ...prev, selectedAccount: value }));
  };

  const handleOtherValueChange = (value) => {
    setFormState(prev => ({ ...prev, otherValue: value }));
  };

  const handleIpAddressChange = (value) => {
    setFormState(prev => ({ ...prev, ipAddress: value }));
  };

  const handleConnect = (accountId) => {
    setFormState(prev => ({
      ...prev,
      connectionStatus: { ...prev.connectionStatus, [accountId]: true }
    }));
  };

  const handleSectionHover = (sectionId, isEntering) => {
    setFormState(prev => ({ 
      ...prev, 
      hoveredSection: isEntering ? sectionId : null 
    }));
  };

  const handleSubmit = () => {
    const formData = {
      account: formState.selectedAccount,
      otherValue: formState.selectedAccount === 'other' ? formState.otherValue : '',
      ipAddress: formState.ipAddress
    };
    onNext(formData);
  };

  // Helper functions
  const isConnected = (accountId) => formState.connectionStatus[accountId];
  const isOtherSelected = () => formState.selectedAccount === 'other';
  const isAccountSelected = (accountId) => formState.selectedAccount === accountId;

  return (
    <div className="questioner-step-container">
      <h1 className="questioner-form-title">ACU Cloud Account Configuration</h1>
      
      <div className="questioner-form-section">
        {/* Cloud Account Selection Section */}
        <FormSection
          id="cloud-account"
          label="Connect to Acuity Surgical – Cloud Account"
          isHovered={formState.hoveredSection === 'cloud-account'}
          onHover={handleSectionHover}
        >
          <div className="account-options">
            {ACCOUNTS.map(account => (
              <AccountOption
                key={account.id}
                account={account}
                isSelected={isAccountSelected(account.id)}
                isConnected={isConnected(account.id)}
                showOtherInput={account.id === 'other' && isOtherSelected()}
                otherValue={formState.otherValue}
                onSelect={handleAccountChange}
                onConnect={handleConnect}
                onOtherChange={handleOtherValueChange}
              />
            ))}
          </div>
        </FormSection>

        {/* IP Address Section */}
        <FormSection
          id="ip-address"
          label="IP Address Configuration"
          isHovered={formState.hoveredSection === 'ip-address'}
          onHover={handleSectionHover}
        >
          <div className="ip-input-container">
            <input
              type="text"
              value={formState.ipAddress}
              onChange={(e) => handleIpAddressChange(e.target.value)}
              placeholder="Enter IP address"
              className="questioner-text-input"
            />
            <ConnectButton
              isConnected={isConnected('ipAddress')}
              onClick={() => handleConnect('ipAddress')}
            />
          </div>
        </FormSection>
      </div>

      {/* Navigation */}
      <div className="questioner-nav-buttons">
        {showPrevButton && (
          <button 
            type="button" 
            onClick={onPrev} 
            className="questioner-nav-button prev"
          >
            Prev
          </button>
        )}
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="questioner-nav-button next"
          disabled={!formState.selectedAccount || (formState.selectedAccount === 'other' && !formState.otherValue)}
          style={!showPrevButton ? { marginLeft: 'auto' } : {}}
        >
        </button>
      </div>
    </div>
  );
};

// Reusable Components
const FormSection = ({ id, label, children, isHovered, onHover }) => (
  <div 
    className={`questioner-form-group ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={() => onHover(id, true)}
    onMouseLeave={() => onHover(id, false)}
  >
    <label className="questioner-form-label">{label}</label>
    {children}
  </div>
);

const AccountOption = ({ 
  account, 
  isSelected, 
  isConnected, 
  showOtherInput, 
  otherValue,
  onSelect, 
  onConnect, 
  onOtherChange 
}) => (
  <div className="questioner-radio-option">
    <input
      type="radio"
      name="account"
      id={account.id}
      value={account.id}
      checked={isSelected}
      onChange={(e) => onSelect(e.target.value)}
      className="questioner-radio-input"
    />
    <label htmlFor={account.id} className="questioner-radio-label">
      {account.label}
    </label>
    
    {showOtherInput && (
      <input
        type="text"
        value={otherValue}
        onChange={(e) => onOtherChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        placeholder="Enter value"
        className="questioner-text-input"
      />
    )}
    
    <ConnectButton
      isConnected={isConnected}
      onClick={(e) => {
        e.stopPropagation();
        onConnect(account.id);
      }}
    />
  </div>
);

const ConnectButton = ({ isConnected, onClick }) => (
  <button
    className={`connect-button ${isConnected ? 'connected' : ''}`}
    onClick={onClick}
  >
    {isConnected ? 'Connected' : 'Connect'}
  </button>
);

export default CloudAccountForm;