
import React, { useState, useEffect } from 'react';
import { styles } from './sharedStyles';

const CloudAccountForm = ({ onNext, onPrev, initialData = {}, showPrevButton = false }) => {
  // State management
  const [formState, setFormState] = useState({
    selectedAccount: initialData.account || '',
    otherValue: initialData.otherValue || '',
    ipAddress: initialData.ipAddress || '',
    connectionStatus: {}
  });

  // Available accounts
  const accounts = [
    { id: 'IM3000-EGX00', label: 'IM3000-EGX00' },
    { id: 'IM3000-CTC03', label: 'IM3000-CTC03' },
    { id: 'other', label: 'Other' }
  ];

  // Handle form changes
  const handleAccountSelect = (accountId) => {
    setFormState(prev => ({
      ...prev,
      selectedAccount: accountId,
      otherValue: accountId !== 'other' ? '' : prev.otherValue
    }));
  };

  const handleOtherChange = (value) => {
    setFormState(prev => ({
      ...prev,
      otherValue: value
    }));
  };

  const handleIpChange = (value) => {
    setFormState(prev => ({
      ...prev,
      ipAddress: value
    }));
  };

  const handleConnect = (accountId) => {
    // Simulate connection
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        connectionStatus: {
          ...prev.connectionStatus,
          [accountId]: true
        }
      }));
    }, 1000);
  };

  const isConnected = (accountId) => {
    return formState.connectionStatus[accountId] || false;
  };

  const handleSubmit = () => {
    const submissionData = {
      account: formState.selectedAccount,
      otherValue: formState.otherValue,
      ipAddress: formState.ipAddress
    };
    onNext(submissionData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cloud Account Configuration</h1>
      
      <div style={styles.form}>
        {/* Account Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Select an account to connect:</label>
          <div style={styles.radioGroup}>
            {accounts.map(account => (
              <label key={account.id} style={styles.radioOption}>
                <input
                  type="radio"
                  name="account"
                  value={account.id}
                  checked={formState.selectedAccount === account.id}
                  onChange={(e) => handleAccountSelect(e.target.value)}
                  style={styles.radioInput}
                />
                <span style={styles.radioLabel}>{account.label}</span>
                
                {account.id === 'other' && formState.selectedAccount === 'other' && (
                  <input
                    type="text"
                    value={formState.otherValue}
                    onChange={(e) => handleOtherChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter value"
                    style={{...styles.textInput, marginLeft: '10px', flex: 1, maxWidth: '200px' }}
                  />
                )}
                
                {account.id !== 'other' && (
                  <button
                    className={`connect-button ${isConnected(account.id) ? 'connected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleConnect(account.id);
                    }}
                    style={{
                      marginLeft: 'auto',
                      minWidth: '80px',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: isConnected(account.id) ? '#01a101' : '#d7d7d7',
                      color: isConnected(account.id) ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontFamily: "'Montserrat', sans-serif",
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    {isConnected(account.id) ? 'Connected' : 'Connect'}
                  </button>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* IP Address Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Enter I.P. address:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              value={formState.ipAddress}
              onChange={(e) => handleIpChange(e.target.value)}
              placeholder="192.168.1.1"
              style={{...styles.textInput, flex: 1, maxWidth: '300px' }}
            />
            <button
              className={`connect-button ${isConnected('ipAddress') ? 'connected' : ''}`}
              onClick={() => handleConnect('ipAddress')}
              style={{
                minWidth: '80px',
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: isConnected('ipAddress') ? '#01a101' : '#d7d7d7',
                color: isConnected('ipAddress') ? '#ffffff' : '#000000',
                fontSize: '14px',
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {isConnected('ipAddress') ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
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
          // type="button" 
          onClick={handleSubmit} 
          className="questioner-nav-button next"
          // disabled={!formState.selectedAccount || (formState.selectedAccount === 'other' && !formState.otherValue)}
          style={!showPrevButton ? { marginLeft: 'auto' } : {}}
        >
        </button>
      </div>
    </div>
  );
};

export default CloudAccountForm;