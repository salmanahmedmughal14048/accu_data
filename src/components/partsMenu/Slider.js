import React from 'react';

// 🎛️ Reusable Slider Component
const Slider = ({ 
  label, 
  value, 
  min = 0, 
  max = 1, 
  step = 0.01, 
  onChange, 
  showLabels = true, 
  displayValue = true,
  formatValue = (val) => val.toFixed(2)
}) => {
  return (
    <div style={{
      padding: '5px',
      backgroundColor: '#4a5568',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {showLabels && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          fontSize: '12px'
        }}>
          <span>{min}</span>
          {displayValue && <span>{formatValue(value)}</span>}
          <span>{max}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: '4px',
          borderRadius: '2px',
          background: `linear-gradient(to right, #2d3748 0%, #4285f4 ${((value - min) / (max - min)) * 100}%, #2d3748 ${((value - min) / (max - min)) * 100}%, #2d3748 100%)`,
          outline: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

export default Slider;