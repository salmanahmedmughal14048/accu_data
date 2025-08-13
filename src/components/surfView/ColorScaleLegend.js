// ColorScaleLegend.js - New React component
import React, { useState, useEffect } from 'react';
import './ColorScaleLegend.css';

const ColorScaleLegend = ({ 
  colorMap, 
  scalarRange, 
  isVisible, 
  onClose, 
  position = 'bottom-right' 
}) => {
  if (!isVisible || !colorMap) return null;

  const getPositionClass = () => {
    switch (position) {
      case 'bottom-left': return 'position-bottom-left';
      case 'bottom-right': return 'position-bottom-right';
      case 'top-left': return 'position-top-left';
      case 'top-right': return 'position-top-right';
      default: return 'position-bottom-right';
    }
  };

  return (
    <div className={`color-scale-legend ${getPositionClass()}`}>
      <div className="legend-header">
        <span className="legend-title">Surface Color Scale</span>
        {onClose && (
          <button className="legend-close-btn" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      
      <div className="color-segments">
        {colorMap.map(([minVal, maxVal, color], index) => (
          <div key={index} className="color-segment">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: color }}
            />
            <span className="range-label">
              {minVal.toFixed(1)} - {maxVal === 12000 ? '∞' : maxVal.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
      
      {scalarRange && (
        <div className="data-range">
          Data Range: {scalarRange.min.toFixed(2)} - {scalarRange.max.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ColorScaleLegend;