import React, { useState } from 'react';
import prevButton from '../../assets/questions/images/prev-button.svg';
import prevButtonHover from '../../assets/questions/images/prev-button-hover.svg';
import nextButton from '../../assets/questions/next-button.svg';
import nextButtonHover from '../../assets/questions/next-button-hover.svg';

const BarcodeScannerSetup = ({ onNext, onPrev, initialData = {} }) => {
  const [isInitialized, setIsInitialized] = useState(initialData.isInitialized || false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#eaeaea',
      padding: '40px',
      overflowY: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#000000',
      marginBottom: '40px',
      fontFamily: "'Montserrat', sans-serif"
    },
    formSection: {
      flex: 1,
      paddingBottom: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    initializeSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px'
    },
    label: {
      fontSize: '18px',
      color: '#4a5568',
      fontFamily: "'Montserrat', sans-serif"
    },
    initializeButton: {
      backgroundColor: '#d7d7d7',
      color: '#333333',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '6px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      fontFamily: "'Montserrat', sans-serif",
      transition: 'all 0.3s',
      minWidth: '100px'
    },
    initializeButtonActive: {
      backgroundColor: '#008fe0',
      color: '#ffffff'
    },
    initializeButtonDisabled: {
      backgroundColor: '#01a101',
      color: '#ffffff',
      cursor: 'default'
    },
    statusMessage: {
      fontSize: '18px',
      color: '#01a101',
      fontFamily: "'Montserrat', sans-serif",
      marginTop: '20px',
      padding: '12px 20px',
      backgroundColor: '#e6f7e6',
      borderRadius: '6px',
      border: '1px solid #01a101'
    },
    buttonWrapper: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingTop: '20px',
      flexDirection: 'row'
    },
    buttonWrapperMobile: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginTop: 'auto',
      paddingTop: '20px',
      flexDirection: 'column',
      alignItems: 'center'
    },
    buttonImg: {
      cursor: 'pointer',
      display: 'block'
    },
    prevButtonContainer: {
      position: 'relative',
      cursor: 'pointer',
      display: 'inline-block'
    },
    prevText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '16px',
      color: '#333333',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '600',
      pointerEvents: 'none'
    }
  };

  const getButtonStyle = () => {
    if (isInitialized) {
      return { ...styles.initializeButton, ...styles.initializeButtonDisabled };
    }
    if (isInitializing) {
      return { ...styles.initializeButton, ...styles.initializeButtonActive };
    }
    return styles.initializeButton;
  };

  const getButtonText = () => {
    if (isInitialized) return 'Initialized';
    if (isInitializing) return 'Initializing...';
    return 'Initialize';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Barcode scanner setup</h1>
      
      <div style={styles.formSection}>
        <div style={styles.initializeSection}>
          <span style={styles.label}>Initialize handheld wireless barcode scanner:</span>
          <button 
            style={getButtonStyle()}
            onClick={handleInitialize}
            disabled={isInitialized || isInitializing}
            onMouseEnter={(e) => {
              if (!isInitialized && !isInitializing) {
                e.target.style.backgroundColor = '#008fe0';
                e.target.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isInitialized && !isInitializing) {
                e.target.style.backgroundColor = '#d7d7d7';
                e.target.style.color = '#333333';
              }
            }}
          >
            {getButtonText()}
          </button>
        </div>

        {isInitialized && (
          <div style={styles.statusMessage}>
            ✓ Barcode scanner has been successfully initialized and is ready to use.
          </div>
        )}
      </div>

      <div style={isMobile ? styles.buttonWrapperMobile : styles.buttonWrapper}>
        <div 
          style={styles.prevButtonContainer} 
          onClick={onPrev}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector('img').src = prevButtonHover;
            e.currentTarget.querySelector('span').style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('img').src = prevButton;
            e.currentTarget.querySelector('span').style.color = '#333333';
          }}
        >
          <img src={prevButton} alt="Previous" style={styles.buttonImg} />
          <span style={styles.prevText}>PREV</span>
        </div>
        <img 
          src={nextButton}
          alt="Next"
          style={styles.buttonImg}
          onClick={handleNext}
          onMouseEnter={(e) => e.target.src = nextButtonHover}
          onMouseLeave={(e) => e.target.src = nextButton}
        />
      </div>
    </div>
  );
};

export default BarcodeScannerSetup;