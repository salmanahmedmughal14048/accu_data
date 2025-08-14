
import React, { useState } from 'react';
import { styles } from './sharedStyles';
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sensor Head Configuration</h1>
      <p style={styles.description}>Configure your sensor head settings for optimal performance.</p>
      
      <div style={styles.form}>
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
              <img src={sensorSmall} alt="Small sensor" style={styles.sensorImage} />
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
              <img src={sensorMedium} alt="Small sensor" style={styles.sensorImage} />
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
              <img src={sensorLarge} alt="Small sensor" style={styles.sensorImage} />
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