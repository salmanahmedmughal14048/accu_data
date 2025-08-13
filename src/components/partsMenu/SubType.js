import React, { useState, useEffect } from 'react';
import eyeShowIcon from '../../assets/images/ICON_EyeShow.svg';
import eyeHideIcon from '../../assets/images/ICON_EyeHide.svg';

const blueShade = '#4285f4';
const hoverShade = '#8ac5ff';

const styles = {
  sectionContainer: {
    backgroundColor: '#4a5568',
    margin: '0',
  },
  leafHeader: {
    cursor: 'pointer',
    fontWeight: 'normal',
    color: 'white',
    padding: '10px 16px',
    backgroundColor: '#4a5568',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  leafContent: {
    backgroundColor: '#131924',
  },
  eyeIcon: {
    cursor: 'pointer',
    width: '25px',
    height: '25px',
    padding: '4px',
    borderRadius: '2px',
    transition: 'background-color 0.2s',
    marginRight: '8px',
  },
};

// 🔹 Sub-type item (collapsible group like implant types)
const SubType = ({
  title,
  children,
  hasSelection,
  eyeOpen,
  onEyeToggle,
  onSelectDefault,
}) => {
  const [isOpen, setIsOpen] = useState(hasSelection);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (hasSelection) setIsOpen(true);
  }, [hasSelection]);

  const handleClick = () => {
    if (eyeOpen) {
      // If eye is open, close it and hide all implants
      onEyeToggle(title, false);
    } else {
      // If eye is closed, open it and restore previously visible implants
      onEyeToggle(title, true);
    }
  };

  const getBackgroundColor = () => {
    if (isHovered) return hoverShade;
    if (hasSelection || eyeOpen) return blueShade;
    return '#4a5568';
  };

  return (
    <div style={styles.sectionContainer}>
      <div
        style={{
          ...styles.leafHeader,
          backgroundColor: getBackgroundColor(),
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={eyeOpen ? eyeShowIcon : eyeHideIcon}
          alt={eyeOpen ? 'Hide' : 'Show'}
          style={styles.eyeIcon}
        />
        <span>{title}</span>
      </div>
      { (
        <div style={styles.leafContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export default SubType;