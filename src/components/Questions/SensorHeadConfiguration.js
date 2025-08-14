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

  return (
    <div className="questioner-step-container">
      <h1 className="questioner-form-title">Sensor Head Configuration</h1>
      <p className="questioner-step-description">Configure your sensor head settings for optimal performance.</p>
      
      <div className="questioner-form-section">
        {/* Sensor Size Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Select Sensor Size</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="sensorSize"
                value="Small"
                checked={formData.sensorSize === 'Small'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Small Sensor</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="sensorSize"
                value="Medium"
                checked={formData.sensorSize === 'Medium'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Medium Sensor</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="sensorSize"
                value="Large"
                checked={formData.sensorSize === 'Large'}
                onChange={(e) => handleChange('sensorSize', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Large Sensor</span>
            </label>
          </div>
        </div>

        {/* More Than One Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Do you have more than one sensor head?</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="moreThanOne"
                value="Yes"
                checked={formData.moreThanOne === 'Yes'}
                onChange={(e) => handleChange('moreThanOne', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Yes</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="moreThanOne"
                value="No"
                checked={formData.moreThanOne === 'No'}
                onChange={(e) => handleChange('moreThanOne', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">No</span>
            </label>
          </div>
        </div>

        {/* Same Wand Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Do you use the same wand for all sensor heads?</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="sameWand"
                value="Yes"
                checked={formData.sameWand === 'Yes'}
                onChange={(e) => handleChange('sameWand', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Yes</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="sameWand"
                value="No"
                checked={formData.sameWand === 'No'}
                onChange={(e) => handleChange('sameWand', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">No</span>
            </label>
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
          disabled={!formData.sensorSize || !formData.moreThanOne || !formData.sameWand}
        >
        </button>
      </div>
    </div>
  );
};

export default SensorHeadConfiguration;