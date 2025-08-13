import React from 'react';

const PlaceholderComp = ({ 
  imagePath = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  alt = "Fullscreen image",
  padding = "10px"
}) => {
  return (
    <div 
      style={{ 
        padding, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      <img 
        src={imagePath}
        alt={alt}
        style={{ 
          maxWidth: '100%', 
          maxHeight: '100%', 
          objectFit: 'contain', 
          borderRadius: '8px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' 
        }}
      />
    </div>
  );
};

export default PlaceholderComp;
