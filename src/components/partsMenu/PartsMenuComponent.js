import React, { useState, useEffect } from 'react';
import { usePartsMenuLogic } from './visibilityLogic';
import eyeShowIcon from '../../assets/images/ICON_EyeShow.svg';
import eyeHideIcon from '../../assets/images/ICON_EyeHide.svg';
import Slider from './Slider';
import SubType from './SubType'; // 🔹 NEW IMPORT

const blueShade = '#4285f4';
const hoverShade = '#8ac5ff';

// 🔹 IMPLANTS SECTION FIXED HEIGHT VARIABLE
const IMPLANTS_SECTION_HEIGHT = '250px';

const styles = {
  container: {
    backgroundColor: '#4a5568',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    minWidth: '160px',
    maxWidth: '160px',
    boxShadow: 'none',
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    backgroundColor: '#2d3748',
    color: 'white',
    fontWeight: 'normal',
    fontSize: '14px',
    padding: '0 8px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  sectionContainer: {
    backgroundColor: '#4a5568',
    margin: '0',
  },
  // 🔹 NEW: Implants container with fixed height and scroll
  implantsContainer: {
    backgroundColor: '#4a5568',
    margin: '0',
  },
  implantsContent: {
    height: IMPLANTS_SECTION_HEIGHT,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#4a5568',
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

// CSS-in-JS for webkit scrollbar (since inline styles don't support pseudo-elements)
// 🔹 CHANGED: Increased scrollbar width and added !important for specificity
const scrollbarStyles = `
  .implants-scrollable::-webkit-scrollbar {
    width: 12px !important;
  }
  .implants-scrollable::-webkit-scrollbar-track {
    background-color: #2d3748 !important;
  }
  .implants-scrollable::-webkit-scrollbar-thumb {
    background-color:rgb(169, 169, 179) !important;
    border-radius: 3px;
  }
  .implants-scrollable::-webkit-scrollbar-thumb:hover {
    background-color: #8ac5ff !important;
  }
`;

// 🔹 Section wrapper
const TitleSection = ({ title, children }) => (
  <div style={styles.sectionContainer}>
    <div style={styles.sectionTitle}>{title}</div>
    <div>{children}</div>
  </div>
);

// 🔹 Implants section wrapper with fixed height and scroll
const ImplantsTitleSection = ({ title, children }) => (
  <div style={styles.implantsContainer}>
    <div style={styles.sectionTitle}>{title}</div>
    <div style={styles.implantsContent} className="implants-scrollable">
      {children}
    </div>
  </div>
);

// 🔹 Simple toggle item
const SimpleItem = ({ title, isVisible, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => onToggle(title, !isVisible);

  const getBackgroundColor = () => {
    if (isHovered) return hoverShade;
    if (isVisible) return blueShade;
    return '#4a5568';
  };

  return (
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
        src={isVisible ? eyeShowIcon : eyeHideIcon}
        alt={isVisible ? 'Hide' : 'Show'}
        style={styles.eyeIcon}
      />
      <span>{title}</span>
    </div>
  );
};

// 🔹 Implant position row
const ImplantItem = ({
  label,
  isSelected,
  isVisible,
  fileName,
  onSelect,
  onEyeToggle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isHovered) return hoverShade;
    if (isSelected || isVisible) return blueShade;
    return '#131924';
  };

  const getTextColor = () => {
    if (isHovered || isSelected || isVisible) return 'white';
    return '#999';
  };

  const handleEyeClick = (e) => {
    e.stopPropagation();
    onEyeToggle(!isVisible);
  };

  return (
    <div
      onClick={onSelect}
      style={{
        padding: '6px 32px',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        fontSize: '11px',
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={fileName ? `File: ${fileName}` : ''}
    >
      <img
        src={isVisible ? eyeShowIcon : eyeHideIcon}
        alt={isVisible ? 'Hide' : 'Show'}
        onClick={handleEyeClick}
        style={styles.eyeIcon}
      />
      <span>{label}</span>
    </div>
  );
};

// 🔹 Main component
const PartsMenuComponent = () => {
  const {
    menuData,
    opacity,
    selected,
    updateOpacity,
    toggleVertebrae,
    toggleSurface,
    isUpperSurfaceVisible,
    isLowerSurfaceVisible,
    isBaseplateVisible,
    isBoundaryVisible,
    toggleImplantGroup,
    selectDefaultImplant,
    toggleImplantPosition,
    togglePositionVisibility,
    isAnyPositionVisible,
  } = usePartsMenuLogic();

  // 🔹 Inject scrollbar styles into DOM
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = scrollbarStyles;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!menuData?.length) {
    return (
      <div style={styles.container}>
        <div style={{ color: 'white', padding: '20px', textAlign: 'center', fontSize: '14px' }}>
          No menu data available
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.container}>
        {/* OPACITY */}
        <TitleSection title="OPACITY">
          <Slider value={opacity} onChange={updateOpacity} />
        </TitleSection>

        {/* VERTEBRAE */}
        <div style={{ height: '10px', backgroundColor: '#000' }} />
        {menuData.map((section, i) => (
          <div key={i}>
            {Object.entries(section).map(([sectionTitle, group]) => {
              if (sectionTitle === "Vertebrae") {
                return (
                  <TitleSection key={sectionTitle} title="VERTEBRAE">
                    {Object.entries(group).map(([itemKey, item]) => (
                      <SimpleItem
                        key={itemKey}
                        title={itemKey}
                        isVisible={item.isVisible || false}
                        onToggle={toggleVertebrae}
                      />
                    ))}
                  </TitleSection>
                );
              }
              return null;
            })}
          </div>
        ))}

        {/* SURFACE(s) */}
        <div style={{ height: '10px', backgroundColor: '#000' }} />
        <TitleSection title="SURFACE(s)">
          <SimpleItem title="Upper Surface" isVisible={isUpperSurfaceVisible()} onToggle={toggleSurface} />
          <SimpleItem title="Lower Surface" isVisible={isLowerSurfaceVisible()} onToggle={toggleSurface} />
          <SimpleItem title="Baseplate" isVisible={isBaseplateVisible()} onToggle={toggleSurface} />
          <SimpleItem title="Boundary" isVisible={isBoundaryVisible()} onToggle={toggleSurface} />
        </TitleSection>

        {/* IMPLANT(s) - FIXED HEIGHT WITH SCROLL */}
        {menuData.map((section, i) => (
          <div key={`implants-${i}`}>
            {Object.entries(section).map(([sectionTitle, group]) => {
              if (sectionTitle === "Implants") {
                return (
                  <div key={sectionTitle}>
                    <div style={{ height: '10px', backgroundColor: '#000' }} />
                    <ImplantsTitleSection title="IMPLANT(s)">
                      {Object.entries(group).map(([itemKey, item]) => {
                        const hasSelection = item.positions?.some((pos) => selected[`${itemKey}::${pos}`]) || false;
                        const eyeOpen = isAnyPositionVisible(itemKey);

                        return (
                          <SubType
                            key={itemKey}
                            title={itemKey}
                            hasSelection={hasSelection}
                            eyeOpen={eyeOpen}
                            onEyeToggle={toggleImplantGroup}
                            onSelectDefault={selectDefaultImplant}
                          >
                            {item.positions?.map((position, idx) => {
                              const fileName = Array.isArray(item.fileName)
                                ? item.fileName[idx] || ''
                                : item.fileName || '';

                              const isPositionVisible = Array.isArray(item.isVisible)
                                ? item.isVisible[idx] || false
                                : false;

                              return (
                                <ImplantItem
                                  key={idx}
                                  label={position}
                                  isSelected={!!selected[`${itemKey}::${position}`]}
                                  isVisible={isPositionVisible}
                                  fileName={fileName}
                                  onSelect={() => toggleImplantPosition(itemKey, position)}
                                  onEyeToggle={(makeVisible) =>
                                    togglePositionVisibility(itemKey, position, makeVisible)
                                  }
                                />
                              );
                            })}
                          </SubType>
                        );
                      })}
                    </ImplantsTitleSection>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default PartsMenuComponent;