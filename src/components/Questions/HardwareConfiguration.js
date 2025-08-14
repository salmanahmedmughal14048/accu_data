
import React, { useState } from 'react';
import { styles } from './sharedStyles';

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
    <div style={styles.container}>
      <h1 style={styles.title}>Hardware Configuration</h1>
      
      <div style={styles.form}>
        {/* Display Monitor Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Display Monitor</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="displayMonitor-single"
                name="displayMonitor"
                value="Single Monitor"
                checked={formData.displayMonitor === 'Single Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="displayMonitor-single" style={styles.radioLabel}>Single Monitor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="displayMonitor-dual"
                name="displayMonitor"
                value="Dual Monitor"
                checked={formData.displayMonitor === 'Dual Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="displayMonitor-dual" style={styles.radioLabel}>Dual Monitor</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="displayMonitor-triple"
                name="displayMonitor"
                value="Triple Monitor"
                checked={formData.displayMonitor === 'Triple Monitor'}
                onChange={(e) => handleChange('displayMonitor', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="displayMonitor-triple" style={styles.radioLabel}>Triple Monitor</label>
            </div>
          </div>
        </div>

        {/* Data Device Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Data Device</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="dataDevice-local"
                name="dataDevice"
                value="Local Computer Desktop"
                checked={formData.dataDevice === 'Local Computer Desktop'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="dataDevice-local" style={styles.radioLabel}>Local Computer Desktop</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="dataDevice-server"
                name="dataDevice"
                value="Local Server HUB"
                checked={formData.dataDevice === 'Local Server HUB'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="dataDevice-server" style={styles.radioLabel}>Local Server HUB</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="dataDevice-cloud"
                name="dataDevice"
                value="Cloud Server"
                checked={formData.dataDevice === 'Cloud Server'}
                onChange={(e) => handleChange('dataDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="dataDevice-cloud" style={styles.radioLabel}>Cloud Server</label>
            </div>
          </div>
        </div>

        {/* Pointing Device Section */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Pointing Device</label>
          <div style={styles.radioGroup}>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="pointingDevice-mouse"
                name="pointingDevice"
                value="Mouse"
                checked={formData.pointingDevice === 'Mouse'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="pointingDevice-mouse" style={styles.radioLabel}>Mouse</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="pointingDevice-wired"
                name="pointingDevice"
                value="Wired keyboard"
                checked={formData.pointingDevice === 'Wired keyboard'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="pointingDevice-wired" style={styles.radioLabel}>Wired keyboard</label>
            </div>
            <div style={styles.radioOption}>
              <input
                type="radio"
                id="pointingDevice-wireless"
                name="pointingDevice"
                value="Wireless keyboard + Tracking pad"
                checked={formData.pointingDevice === 'Wireless keyboard + Tracking pad'}
                onChange={(e) => handleChange('pointingDevice', e.target.value)}
                style={styles.radioInput}
              />
              <label htmlFor="pointingDevice-wireless" style={styles.radioLabel}>Wireless keyboard + Tracking pad</label>
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
          // disabled={!formData.displayMonitor || !formData.dataDevice || !formData.pointingDevice}
        >
        </button>
      </div>
    </div>
  );
};

export default HardwareConfiguration;