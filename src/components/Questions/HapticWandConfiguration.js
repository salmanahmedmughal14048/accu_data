import React, { useState } from 'react';
import wandW21 from '../../assets/images/wand-w21.png';
import wandWXE from '../../assets/images/wand-wxe.png';
import wandWC3 from '../../assets/images/wand-wc3.png';
import wandWZ3 from '../../assets/images/wand-wz3.png';
import wandWO from '../../assets/images/wand-wo.png';
import triggerOne from '../../assets/images/trigger-one.png';
import triggerTwo from '../../assets/images/trigger-two.png';

const HapticWandConfiguration = ({ onNext, onPrev, initialData = {}, showPrevButton = true }) => {
  const [formData, setFormData] = useState({
    ergonomicHandle: initialData.ergonomicHandle || '',
    fingerTrigger: initialData.fingerTrigger || '',
    sensorSensitivity: initialData.sensorSensitivity || '',
    sensorOptions: initialData.sensorOptions || ''
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
      overflow: 'visible',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    title: {
      fontSize: '24px',
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
      marginBottom: '35px'
    },
    label: {
      display: 'block',
      fontSize: '15px',
      color: '#4a5568',
      marginBottom: '20px',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif"
    },
    wandOptions: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      marginBottom: '30px'
    },
    wandOption: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      padding: '10px',
      border: '2px solid transparent',
      borderRadius: '8px',
      transition: 'all 0.3s',
      backgroundColor: 'transparent'
    },
    wandOptionSelected: {
      borderColor: '#008fe0',
      backgroundColor: 'rgba(251, 247, 247, 1)'
    },
    wandRadio: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    wandLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif"
    },
    wandImage: {
      width: '80px',
      height: '120px',
      objectFit: 'contain'
    },
    triggerOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    triggerOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      cursor: 'pointer',
      padding: '15px',
      border: '2px solid transparent',
      borderRadius: '8px',
      transition: 'all 0.3s',
      backgroundColor: 'transparent'
    },
    triggerOptionSelected: {
      borderColor: '#008fe0',
      backgroundColor: 'rgba(251, 247, 247, 1)'
    },
    triggerRadio: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      flexShrink: 0
    },
    triggerLabel: {
      fontSize: '15px',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif",
      flex: 1
    },
    triggerImage: {
      height: '60px',
      width: 'auto',
      objectFit: 'contain'
    },
    radioGroup: {
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    radioInput: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    },
    radioLabel: {
      fontSize: '15px',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif"
    }
  };

  const wandOptions = [
    { id: 'W21', image: wandW21, label: 'W21' },
    { id: 'WXE', image: wandWXE, label: 'WXE' },
    { id: 'WC3', image: wandWC3, label: 'WC3' },
    { id: 'WZ3', image: wandWZ3, label: 'WZ3' },
    { id: 'WO', image: wandWO, label: 'WO' }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Haptic Wand Configuration</h1>
      
      <div style={styles.formSection}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select your ergonomic handle:</label>
          <div style={styles.wandOptions}>
            {wandOptions.map(wand => (
              <div 
                key={wand.id}
                style={{
                  ...styles.wandOption,
                  ...(formData.ergonomicHandle === wand.id ? styles.wandOptionSelected : {})
                }}
                onClick={() => handleChange('ergonomicHandle', wand.id)}
              >
                <input
                  type="radio"
                  id={`wand-${wand.id}`}
                  name="ergonomicHandle"
                  value={wand.id}
                  checked={formData.ergonomicHandle === wand.id}
                  onChange={(e) => handleChange('ergonomicHandle', e.target.value)}
                  style={styles.wandRadio}
                />
                <label htmlFor={`wand-${wand.id}`} style={styles.wandLabel}>{wand.label}</label>
                <img src={wand.image} alt={`${wand.label} wand`} style={styles.wandImage} />
              </div>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select one or two finger trigger:</label>
          <div style={styles.triggerOptions}>
            <div 
              style={{
                ...styles.triggerOption,
                ...(formData.fingerTrigger === 'One finger trigger' ? styles.triggerOptionSelected : {})
              }}
              onClick={() => handleChange('fingerTrigger', 'One finger trigger')}
            >
              <input
                type="radio"
                id="trigger-one"
                name="fingerTrigger"
                value="One finger trigger"
                checked={formData.fingerTrigger === 'One finger trigger'}
                onChange={(e) => handleChange('fingerTrigger', e.target.value)}
                style={styles.triggerRadio}
              />
              <label htmlFor="trigger-one" style={styles.triggerLabel}>One finger trigger</label>
              <img src={triggerOne} alt="One finger trigger" style={styles.triggerImage} />
            </div>

            <div 
              style={{
                ...styles.triggerOption,
                ...(formData.fingerTrigger === 'Two finger trigger' ? styles.triggerOptionSelected : {})
              }}
              onClick={() => handleChange('fingerTrigger', 'Two finger trigger')}
            >
              <input
                type="radio"
                id="trigger-two"
                name="fingerTrigger"
                value="Two finger trigger"
                checked={formData.fingerTrigger === 'Two finger trigger'}
                onChange={(e) => handleChange('fingerTrigger', e.target.value)}
                style={styles.triggerRadio}
              />
              <label htmlFor="trigger-two" style={styles.triggerLabel}>Two finger trigger</label>
              <img src={triggerTwo} alt="Two finger trigger" style={styles.triggerImage} />
            </div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Haptic sensor sensitivity:</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="high-sensitivity"
                name="sensorSensitivity"
                value="High sensitivity"
                checked={formData.sensorSensitivity === 'High sensitivity'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="high-sensitivity" style={styles.radioLabel}>High sensitivity</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="low-sensitivity"
                name="sensorSensitivity"
                value="Low sensitivity"
                checked={formData.sensorSensitivity === 'Low sensitivity'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="low-sensitivity" style={styles.radioLabel}>Low sensitivity</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="custom-sensitivity"
                name="sensorSensitivity"
                value="Custom"
                checked={formData.sensorSensitivity === 'Custom'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="custom-sensitivity" style={styles.radioLabel}>Custom</label>
            </div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Haptic sensor options:</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="vibrate-sound"
                name="sensorOptions"
                value="Vibrate + Sound"
                checked={formData.sensorOptions === 'Vibrate + Sound'}
                onChange={(e) => handleChange('sensorOptions', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="vibrate-sound" style={styles.radioLabel}>Vibrate + Sound</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="vibrate-only"
                name="sensorOptions"
                value="Vibrate only"
                checked={formData.sensorOptions === 'Vibrate only'}
                onChange={(e) => handleChange('sensorOptions', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="vibrate-only" style={styles.radioLabel}>Vibrate only</label>
            </div>
          </div>
        </div>
      </div>

      <div className="questioner-nav-buttons">
        {showPrevButton && (
          <button
            onClick={onPrev}
            className="questioner-nav-button prev"
          >
            Prev
          </button>
        )}
        <button
          onClick={handleNext}
          className="questioner-nav-button next"
          style={!showPrevButton ? { marginLeft: 'auto' } : {}}
        >
        </button>
      </div>
    </div>
  );
};

export default HapticWandConfiguration;