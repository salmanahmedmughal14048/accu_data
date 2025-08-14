import React, { useState } from 'react';
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
      marginBottom: '8px',
      fontFamily: "'Montserrat', sans-serif"
    },
    description: {
      fontSize: '14px',
      color: '#666666',
      marginBottom: '25px',
      fontFamily: "'Montserrat', sans-serif",
      fontStyle: 'italic'
    },
    formSection: {
      flex: 1,
      paddingBottom: '80px'
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      fontSize: '15px',
      color: '#4a5568',
      marginBottom: '15px',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: '1.4'
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    radioInput: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    radioLabel: {
      fontSize: '15px',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sensor Head Configuration</h1>
      <p style={styles.description}>Configure your sensor head settings for optimal performance.</p>
      
      <div style={styles.formSection}>
        {/* Sensor Size Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Sensor head size</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="sensorSize-small"
                name="sensorSize"
                value="Small"
                checked={formData.sensorSize === 'Small'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensorSize-small" style={styles.radioLabel}>Small Sensor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="sensorSize-medium"
                name="sensorSize"
                value="Medium"
                checked={formData.sensorSize === 'Medium'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensorSize-medium" style={styles.radioLabel}>Medium Sensor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="sensorSize-large"
                name="sensorSize"
                value="Large"
                checked={formData.sensorSize === 'Large'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sensorSize-large" style={styles.radioLabel}>Large Sensor</label>
            </div>
          </div>
        </div>

        {/* More Than One Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Do you have more than one sensor head?</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="moreThanOne-yes"
                name="moreThanOne"
                value="Yes"
                checked={formData.moreThanOne === 'Yes'}
                onChange={(e) => handleChange('moreThanOne', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="moreThanOne-yes" style={styles.radioLabel}>Yes</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="moreThanOne-no"
                name="moreThanOne"
                value="No"
                checked={formData.moreThanOne === 'No'}
                onChange={(e) => handleChange('moreThanOne', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="moreThanOne-no" style={styles.radioLabel}>No</label>
            </div>
          </div>
        </div>

        {/* Same Wand Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Are all sensor heads the same size haptic wand?</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="sameWand-yes"
                name="sameWand"
                value="Yes"
                checked={formData.sameWand === 'Yes'}
                onChange={(e) => handleChange('sameWand', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sameWand-yes" style={styles.radioLabel}>Yes</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="sameWand-no"
                name="sameWand"
                value="No"
                checked={formData.sameWand === 'No'}
                onChange={(e) => handleChange('sameWand', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="sameWand-no" style={styles.radioLabel}>No</label>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="questioner-nav-buttons">
        <button 
          type="button" 
          onClick={onPrev} 
          className="questioner-nav-button prev"
        >
          Prev
        </button>
        <button 
          type="button" 
          onClick={handleNext} 
          className="questioner-nav-button next"
          // disabled={!formData.sensorSize || !formData.moreThanOne || !formData.sameWand}
        >
        </button>
      </div>
    </div>
  );
};

export default SensorHeadConfiguration;