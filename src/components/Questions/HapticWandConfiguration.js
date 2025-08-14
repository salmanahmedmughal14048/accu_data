import React, { useState } from 'react';
import { styles } from './sharedStyles';
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
      
      <div style={styles.form}>
        {/* Wand Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Select your ergonomic handle:</label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {wandOptions.map(wand => (
              <div 
                key={wand.id}
                style={{
                  ...styles.radioOption,
                  flexDirection: 'column',
                  border: '2px solid ' + (formData.ergonomicHandle === wand.id ? '#008fe0' : 'transparent'),
                  borderRadius: '8px',
                  backgroundColor: formData.ergonomicHandle === wand.id ? 'rgba(251, 247, 247, 1)' : 'transparent'
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
                  style={styles.radioInput}
                />
                <label htmlFor={`wand-${wand.id}`} style={{...styles.radioLabel, fontWeight: '600'}}>{wand.label}</label>
                <img src={wand.image} alt={`${wand.label} wand`} style={{ width: '80px', height: '120px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Finger Trigger Selection */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Select one or two finger trigger:</label>
          <div style={styles.radioGroup}>
            <label 
              style={{
                ...styles.radioOption,
                border: '2px solid ' + (formData.fingerTrigger === 'One finger trigger' ? '#008fe0' : 'transparent'),
                borderRadius: '8px',
                backgroundColor: formData.fingerTrigger === 'One finger trigger' ? 'rgba(251, 247, 247, 1)' : 'transparent'
              }}
            >
              <input
                type="radio"
                name="fingerTrigger"
                value="One finger trigger"
                checked={formData.fingerTrigger === 'One finger trigger'}
                onChange={(e) => handleChange('fingerTrigger', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>One finger trigger</span>
              <img src={triggerOne} alt="One finger trigger" style={{ height: '60px', width: 'auto', objectFit: 'contain', marginLeft: 'auto' }} />
            </label>

            <label 
              style={{
                ...styles.radioOption,
                border: '2px solid ' + (formData.fingerTrigger === 'Two finger trigger' ? '#008fe0' : 'transparent'),
                borderRadius: '8px',
                backgroundColor: formData.fingerTrigger === 'Two finger trigger' ? 'rgba(251, 247, 247, 1)' : 'transparent'
              }}
            >
              <input
                type="radio"
                name="fingerTrigger"
                value="Two finger trigger"
                checked={formData.fingerTrigger === 'Two finger trigger'}
                onChange={(e) => handleChange('fingerTrigger', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>Two finger trigger</span>
              <img src={triggerTwo} alt="Two finger trigger" style={{ height: '60px', width: 'auto', objectFit: 'contain', marginLeft: 'auto' }} />
            </label>
          </div>
        </div>

        {/* Sensor Sensitivity */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Haptic sensor sensitivity:</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sensorSensitivity"
                value="High sensitivity"
                checked={formData.sensorSensitivity === 'High sensitivity'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>High sensitivity</span>
            </label>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sensorSensitivity"
                value="Low sensitivity"
                checked={formData.sensorSensitivity === 'Low sensitivity'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>Low sensitivity</span>
            </label>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sensorSensitivity"
                value="Custom"
                checked={formData.sensorSensitivity === 'Custom'}
                onChange={(e) => handleChange('sensorSensitivity', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>Custom</span>
            </label>
          </div>
        </div>

        {/* Sensor Options */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Haptic sensor options:</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sensorOptions"
                value="Vibrate + Sound"
                checked={formData.sensorOptions === 'Vibrate + Sound'}
                onChange={(e) => handleChange('sensorOptions', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>Vibrate + Sound</span>
            </label>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sensorOptions"
                value="Vibrate only"
                checked={formData.sensorOptions === 'Vibrate only'}
                onChange={(e) => handleChange('sensorOptions', e.target.value)}
                style={styles.radioInput}
              />
              <span style={styles.radioLabel}>Vibrate only</span>
            </label>
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