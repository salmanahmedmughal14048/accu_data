import React, { useState } from 'react';
import prevButton from '../../assets/questions/images/prev-button.svg';
import prevButtonHover from '../../assets/questions/images/prev-button-hover.svg';
import nextButton from '../../assets/questions/next-button.svg';
import nextButtonHover from '../../assets/questions/next-button-hover.svg';

const HardwareConfiguration = ({ onNext, onPrev, initialData = {} }) => {
  const [formData, setFormData] = useState({
    displayMonitor: initialData.displayMonitor || '',
    dataDevice: initialData.dataDevice || '',
    pointingDevice: initialData.pointingDevice || ''
  });
  const [hoveredSection, setHoveredSection] = useState(null);
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

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    onNext(formData);
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
      marginBottom: '30px',
      fontFamily: "'Montserrat', sans-serif"
    },
    formSection: {
      flex: 1,
      paddingBottom: '80px'
    },
    formGroup: {
      marginBottom: '35px',
      padding: '20px',
      marginLeft: '-20px',
      marginRight: '-20px',
      transition: 'background-color 0.3s',
      backgroundColor: 'transparent'
    },
    formGroupHover: {
      backgroundColor: 'rgba(251, 247, 247, 1)'
    },
    label: {
      display: 'block',
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '15px',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif"
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginLeft: '-10px',
      marginRight: '-10px',
      backgroundColor: 'transparent'
    },
    radioInput: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      cursor: 'pointer'
    },
    radioLabel: {
      fontSize: '18px',
      color: '#2d3748',
      cursor: 'pointer',
      fontFamily: "'Montserrat', sans-serif"
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

  const getFormGroupStyle = (sectionId) => {
    return {
      ...styles.formGroup,
      ...(hoveredSection === sectionId ? styles.formGroupHover : {})
    };
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hardware Configuration</h1>
      
      <div style={styles.formSection}>
        <div 
          style={getFormGroupStyle('display-monitor')}
          onMouseEnter={() => setHoveredSection('display-monitor')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.label}>Select number of display monitors to be used:</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="dual-monitor"
                name="displayMonitor"
                value="Dual Monitor"
                checked={formData.displayMonitor === 'Dual Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="dual-monitor" style={styles.radioLabel}>Dual Monitor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="single-monitor"
                name="displayMonitor"
                value="Single Monitor"
                checked={formData.displayMonitor === 'Single Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="single-monitor" style={styles.radioLabel}>Single Monitor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="tablet-display"
                name="displayMonitor"
                value="Tablet Display"
                checked={formData.displayMonitor === 'Tablet Display'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="tablet-display" style={styles.radioLabel}>Tablet Display</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="mobile-display"
                name="displayMonitor"
                value="Mobile Display"
                checked={formData.displayMonitor === 'Mobile Display'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="mobile-display" style={styles.radioLabel}>Mobile Display</label>
            </div>
          </div>
        </div>

        <div 
          style={getFormGroupStyle('data-device')}
          onMouseEnter={() => setHoveredSection('data-device')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.label}>Select data device:</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="local-computer"
                name="dataDevice"
                value="Local Computer Desktop"
                checked={formData.dataDevice === 'Local Computer Desktop'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="local-computer" style={styles.radioLabel}>Local Computer Desktop</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="local-server"
                name="dataDevice"
                value="Local Server HUB"
                checked={formData.dataDevice === 'Local Server HUB'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="local-server" style={styles.radioLabel}>Local Server HUB</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="rolling-computer"
                name="dataDevice"
                value="Rolling Computer Tower"
                checked={formData.dataDevice === 'Rolling Computer Tower'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="rolling-computer" style={styles.radioLabel}>Rolling Computer Tower</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="stationary-computer"
                name="dataDevice"
                value="Stationary Computer System"
                checked={formData.dataDevice === 'Stationary Computer System'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="stationary-computer" style={styles.radioLabel}>Stationary Computer System</label>
            </div>
          </div>
        </div>

        <div 
          style={getFormGroupStyle('pointing-device')}
          onMouseEnter={() => setHoveredSection('pointing-device')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.label}>Select pointing device:</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="usb-mouse"
                name="pointingDevice"
                value="USB Mouse or Tracking pad"
                checked={formData.pointingDevice === 'USB Mouse or Tracking pad'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="usb-mouse" style={styles.radioLabel}>USB Mouse or Tracking pad</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="wireless-keyboard"
                name="pointingDevice"
                value="Wireless keyboard + Tracking pad"
                checked={formData.pointingDevice === 'Wireless keyboard + Tracking pad'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="wireless-keyboard" style={styles.radioLabel}>Wireless keyboard + Tracking pad</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="usb-keyboard"
                name="pointingDevice"
                value="USB keyboard"
                checked={formData.pointingDevice === 'USB keyboard'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="usb-keyboard" style={styles.radioLabel}>USB keyboard</label>
            </div>
          </div>
        </div>
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

export default HardwareConfiguration;