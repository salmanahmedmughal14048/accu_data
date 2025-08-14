
import React, { useState } from 'react';
import { styles } from './sharedStyles';

const BarcodeScannerSetup = ({ onNext, onPrev, initialData = {} }) => {
  const [isInitialized, setIsInitialized] = useState(initialData.isInitialized || false);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = () => {
    setIsInitializing(true);
    // Simulate initialization process
    setTimeout(() => {
      setIsInitialized(true);
      setIsInitializing(false);
    }, 2000);
  };

  const handleNext = () => {
    onNext({ isInitialized });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Barcode Scanner Setup</h1>
      
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Initialize the barcode scanner:
          </label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleInitialize}
              disabled={isInitialized || isInitializing}
              style={{
                backgroundColor: isInitialized ? '#01a101' : (isInitializing ? '#008fe0' : '#d7d7d7'),
                color: isInitialized || isInitializing ? '#ffffff' : '#333333',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isInitialized ? 'default' : 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                transition: 'all 0.3s',
                minWidth: '100px'
              }}
            >
              {isInitialized ? 'Initialized' : (isInitializing ? 'Initializing...' : 'Initialize')}
            </button>
          </div>

          {isInitialized && (
            <div style={{
              fontSize: '15px',
              color: '#01a101',
              fontFamily: "'Montserrat', sans-serif",
              marginTop: '20px',
              padding: '12px 20px',
              backgroundColor: '#e6f7e6',
              borderRadius: '6px',
              border: '1px solid #01a101'
            }}>
              ✓ Barcode scanner successfully initialized
            </div>
          )}
        </div>
      </div>

      <div className="questioner-nav-buttons">
        <button
          onClick={onPrev}
          className="questioner-nav-button prev"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="questioner-nav-button next"
        >
        </button>
      </div>
    </div>
  );
};

export default BarcodeScannerSetup;