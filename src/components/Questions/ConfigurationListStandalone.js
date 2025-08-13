import React from 'react';
import arrowActive from '../../assets/questions/arrow-active.svg';
import arrowInactive from '../../assets/questions/arrow-inactive.svg';
import checkIcon from '../../assets/questions/images/check-icon.svg';
import './ConfigurationListStandalone.css';

// Default steps
const defaultSteps = [
  { id: 1, text: "Connect to the ACU Cloud Account" },
  { id: 2, text: "Hardware configuration" },
  { id: 3, text: "Sensor head configuration" },
  { id: 4, text: "Haptic wand configuration" },
  { id: 5, text: "Barcode scanner setup" },
  { id: 6, text: "Submit" }
];

// Standalone ConfigurationList Component with configurable steps
const ConfigurationList = ({ 
  currentStep = 1, 
  onStepClick,
  steps = defaultSteps,
  title = "Configuration"
}) => {
  const configSteps = steps;

  const [verticalLineBottom, setVerticalLineBottom] = React.useState('10px');
  const lastConfigRef = React.useRef(null);
  const listRef = React.useRef(null);

  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Calculate vertical line position
  const calculateVerticalLinePosition = () => {
    if (lastConfigRef.current && listRef.current) {
      const lastConfigRect = lastConfigRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      const lastConfigCenter = lastConfigRect.top + (lastConfigRect.height / 2);
      const bottomOffset = listRect.bottom - lastConfigCenter;
      setVerticalLineBottom(`${bottomOffset}px`);
    }
  };

  // Check window width on mount and resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate vertical line position when component mounts or configs change
  React.useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      calculateVerticalLinePosition();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentStep, windowWidth, configSteps]);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  // Check if we should show the vertical line
  const shouldShowVerticalLine = currentStep < configSteps.length;

  const getItemClassName = (stepId) => {
    const isActive = stepId === currentStep;
    const isNavigated = stepId < currentStep;
    const isHovered = hoveredItem === stepId && !isActive && !isMobile;
    
    let className = 'config-item';
    
    if (isActive) {
      className += ' active';
    } else if (isNavigated) {
      className += ' navigated';
    }
    
    return className;
  };

  const getNumberClassName = (stepId) => {
    const isInactive = stepId > currentStep;
    let className = 'config-number';
    
    if (isInactive) {
      className += ' inactive';
    }
    
    return className;
  };

  const getTextClassName = (stepId) => {
    const isActive = stepId === currentStep;
    const isNavigated = stepId < currentStep;
    const isHovered = hoveredItem === stepId && !isActive && !isMobile;
    
    let className = 'config-text';
    
    if (isActive) {
      className += ' active';
    } else if (isNavigated) {
      className += ' navigated';
    } else if (isHovered) {
      className += ' hover';
    }
    
    return className;
  };

  return (
    <div className="config-list-wrapper">
      {/* Add Montserrat font */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" 
        rel="stylesheet" 
      />
      
      <div className="config-list-container">
        <div className="config-list-header">{title}</div>
        <div className="config-list" ref={listRef}>
          {/* Vertical line - only show if not on last item */}
          {shouldShowVerticalLine && (
            <div 
              className="config-vertical-line"
              style={{ bottom: verticalLineBottom }}
            ></div>
          )}
          
          {configSteps.map((step, index) => (
            <div
              key={step.id}
              ref={index === configSteps.length - 1 ? lastConfigRef : null}
              className={getItemClassName(step.id)}
              onClick={() => onStepClick && onStepClick(step.id)}
              onMouseEnter={() => !isMobile && setHoveredItem(step.id)}
              onMouseLeave={() => !isMobile && setHoveredItem(null)}
            >
              {step.id < currentStep ? (
                <div className="config-check-icon">
                  <img src={checkIcon} alt="completed" />
                </div>
              ) : (
                <div className={getNumberClassName(step.id)}>
                  {step.id}
                </div>
              )}
              <span className={getTextClassName(step.id)}>{step.text}</span>
              <img 
                src={step.id === currentStep ? arrowActive : arrowInactive} 
                alt="arrow" 
                className="config-arrow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationList;