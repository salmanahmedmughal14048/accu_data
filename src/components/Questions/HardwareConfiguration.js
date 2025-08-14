import React, { useState } from 'react';

const HardwareConfiguration = ({ onNext, onPrev, initialData = {} }) => {
  const [formData, setFormData] = useState({
    displayMonitor: initialData.displayMonitor || '',
    dataDevice: initialData.dataDevice || '',
    pointingDevice: initialData.pointingDevice || ''
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
      <h1 className="questioner-form-title">Hardware Configuration</h1>
      
      <div className="questioner-form-section">
        {/* Display Monitor Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Display Monitor</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="displayMonitor"
                value="Single Monitor"
                checked={formData.displayMonitor === 'Single Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Single Monitor</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="displayMonitor"
                value="Dual Monitor"
                checked={formData.displayMonitor === 'Dual Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Dual Monitor</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="displayMonitor"
                value="Triple Monitor"
                checked={formData.displayMonitor === 'Triple Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Triple Monitor</span>
            </label>
          </div>
        </div>

        {/* Data Device Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Data Device</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="dataDevice"
                value="Local Computer Desktop"
                checked={formData.dataDevice === 'Local Computer Desktop'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Local Computer Desktop</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="dataDevice"
                value="Local Server HUB"
                checked={formData.dataDevice === 'Local Server HUB'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Local Server HUB</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="dataDevice"
                value="Cloud Server"
                checked={formData.dataDevice === 'Cloud Server'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Cloud Server</span>
            </label>
          </div>
        </div>

        {/* Pointing Device Section */}
        <div className="questioner-form-group">
          <label className="questioner-form-label">Pointing Device</label>
          <div className="questioner-radio-group">
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="pointingDevice"
                value="Mouse"
                checked={formData.pointingDevice === 'Mouse'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Mouse</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="pointingDevice"
                value="Trackball"
                checked={formData.pointingDevice === 'Trackball'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Trackball</span>
            </label>
            <label className="questioner-radio-option">
              <input
                type="radio"
                name="pointingDevice"
                value="Wireless keyboard + Tracking pad"
                checked={formData.pointingDevice === 'Wireless keyboard + Tracking pad'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                className="questioner-radio-input"
              />
              <span className="questioner-radio-label">Wireless keyboard + Tracking pad</span>
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
          disabled={!formData.displayMonitor || !formData.dataDevice || !formData.pointingDevice}
        >
        </button>
      </div>
    </div>
  );
};

export default HardwareConfiguration;