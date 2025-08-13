import React, { useState } from 'react';
import prevButton from '../../assets/questions/images/prev-button.svg';
import prevButtonHover from '../../assets/questions/images/prev-button-hover.svg';
import nextButton from '../../assets/questions/next-button.svg';
import nextButtonHover from '../../assets/questions/next-button-hover.svg';
import sensorSmall from '../../assets/questions/images/sensor-small.png';
import sensorMedium from '../../assets/questions/images/sensor-medium.png';
import sensorLarge from '../../assets/questions/images/sensor-large.png';

const SensorHeadConfiguration = ({ onNext, onPrev, initialData = {} }) => {
  const [formData, setFormData] = useState({
    sensorSize: initialData.sensorSize || '',
    moreThanOne: initialData.moreThanOne || 'No',
    sameWand: initialData.sameWand || 'Yes'
  });

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
      marginBottom: '10px',
      fontFamily: "'Montserrat', sans-serif"
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '30px',
      fontStyle: 'italic',
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
      marginBottom: '20px',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif"
    },
    sensorOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    sensorOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      cursor: 'pointer',
      padding: '10px',
      transition: 'background-color 0.3s',
      backgroundColor: 'transparent',
      marginLeft: '-10px',
      marginRight: '-10px'
    },
    sensorOptionHover: {
      backgroundColor: 'rgba(251, 247, 247, 1)'
    },
    radioInput: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      flexShrink: 0
    },
    sensorLabel: {
      fontSize: '18px',
      color: '#2d3748',
      cursor: 'pointer',
      fontFamily: "'Montserrat', sans-serif",
      minWidth: '80px',
      fontWeight: '500'
    },
    sensorImage: {
      width: '120px',
      height: 'auto',
      objectFit: 'contain'
    },
    dropdown: {
      width: '200px',
      padding: '10px 12px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '15px',
      color: '#2d3748',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      fontFamily: "'Montserrat', sans-serif"
    },
    questionLabel: {
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '12px',
      display: 'block',
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

  const getFormGroupStyle = (sectionId) => {
    return {
      ...styles.formGroup,
      ...(hoveredSection === sectionId ? styles.formGroupHover : {})
    };
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sensor head configuration</h1>
      <p style={styles.subtitle}>Select the sensor head you wish to use first for sizing</p>
      
      <div style={styles.formSection}>
        <div 
          style={getFormGroupStyle('sensor-selection')}
          onMouseEnter={() => setHoveredSection('sensor-selection')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.label}>Select sensor:</label>
          <div style={styles.sensorOptions}>
            <div 
              style={styles.sensorOption}
              onClick={() => handleChange('sensorSize', 'Small')}
            >
              <input
                type="radio"
                id="sensor-small"
                name="sensorSize"
                value="Small"
                checked={formData.sensorSize === 'Small'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensor-small" style={styles.sensorLabel}>Small</label>
              <img src={sensorSmall} alt="Small sensor" style={styles.sensorImage} />
            </div>

            <div 
              style={styles.sensorOption}
              onClick={() => handleChange('sensorSize', 'Medium')}
            >
              <input
                type="radio"
                id="sensor-medium"
                name="sensorSize"
                value="Medium"
                checked={formData.sensorSize === 'Medium'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensor-medium" style={styles.sensorLabel}>Medium</label>
              <img src={sensorMedium} alt="Medium sensor" style={styles.sensorImage} />
            </div>

            <div 
              style={styles.sensorOption}
              onClick={() => handleChange('sensorSize', 'Large')}
            >
              <input
                type="radio"
                id="sensor-large"
                name="sensorSize"
                value="Large"
                checked={formData.sensorSize === 'Large'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensor-large" style={styles.sensorLabel}>Large</label>
              <img src={sensorLarge} alt="Large sensor" style={styles.sensorImage} />
            </div>
          </div>
        </div>

        <div 
          style={getFormGroupStyle('more-than-one')}
          onMouseEnter={() => setHoveredSection('more-than-one')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.questionLabel}>Will you be using more than one sensor head size?</label>
          <select 
            style={styles.dropdown}
            value={formData.moreThanOne}
            onChange={(e) => handleChange('moreThanOne', e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div 
          style={getFormGroupStyle('same-wand')}
          onMouseEnter={() => setHoveredSection('same-wand')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <label style={styles.questionLabel}>Will you be using the same wand throughout this process?</label>
          <select 
            style={styles.dropdown}
            value={formData.sameWand}
            onChange={(e) => handleChange('sameWand', e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div style={isMobile ? styles.buttonWrapperMobile : styles.buttonWrapper}>
        <div 
          style={styles.prevButtonContainer} 
          onClick={onPrev}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').src = prevButtonHover}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').src = prevButton}
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

export default SensorHeadConfiguration;