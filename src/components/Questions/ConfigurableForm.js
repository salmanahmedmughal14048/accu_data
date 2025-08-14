import React, { useState, useEffect } from 'react';

const ConfigurableForm = ({ 
  onNext, 
  onPrev, 
  initialData = {},
  questions = [],
  title = "Configuration",
  showPrevButton = true,
  nextButtonText = "Next"
}) => {
  // Initialize form data based on questions (excluding description entries)
  const initializeFormData = () => {
    const data = {};
    questions.forEach(question => {
      if (question.type !== 'description') {
        data[question.id] = initialData[question.id] || (question.type === 'checkbox' ? [] : '');
      }
    });
    return data;
  };

  const [formData, setFormData] = useState(initializeFormData());
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#eaeaea',
      padding: '40px',
      overflow: 'visible',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#000000',
      marginBottom: '8px',
      fontFamily: "'Montserrat', sans-serif"
    },
    description: {
      fontSize: '14px',
      color: '#666666',
      marginBottom: '25px',
      fontFamily: "'Montserrat', sans-serif",
      fontStyle: 'italic'
    },
    form: {
      flex: 1,
      paddingBottom: '80px'
    },
    formGroup: {
      marginBottom: '25px',
      padding: '15px',
      marginLeft: '-15px',
      marginRight: '-15px',
      transition: 'background-color 0.3s',
      backgroundColor: 'transparent'
    },
    formGroupHover: {
      backgroundColor: 'rgba(251, 247, 247, 1)'
    },
    label: {
      display: 'block',
      fontSize: '15px',
      color: '#4a5568',
      marginBottom: '15px',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif"
    },
    // Regular radio options - vertical layout
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    radioOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    radioInput: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    radioLabel: {
      fontSize: '15px',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif"
    },
    // Checkbox options
    checkboxGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    checkboxOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    checkboxInput: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    // Text input
    textInput: {
      width: '100%',
      padding: '10px',
      fontSize: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontFamily: "'Montserrat', sans-serif"
    },
    // Select dropdown
    selectInput: {
      width: '100%',
      padding: '10px',
      fontSize: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontFamily: "'Montserrat', sans-serif",
      cursor: 'pointer',
      backgroundColor: '#fff'
    },
    // Image grid options (3x3 layout for images)
    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginBottom: '20px'
    },
    imageOption: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      padding: '10px',
      border: '2px solid transparent',
      borderRadius: '8px',
      transition: 'all 0.3s'
    },
    imageOptionSelected: {
      borderColor: '#1890ff',
      backgroundColor: 'rgba(24, 144, 255, 0.05)'
    },
    imageLabel: {
      fontSize: '14px',
      color: '#2d3748',
      fontFamily: "'Montserrat', sans-serif",
      textAlign: 'center'
    },
    optionImage: {
      width: '100px',
      height: '100px',
      objectFit: 'contain'
    },
    // Mobile styles
    mobileContainer: {
      padding: '20px'
    },
    mobileTitle: {
      fontSize: '20px',
      marginBottom: '15px'
    },
    mobileImageGrid: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'radio':
        return (
          <div style={styles.radioGroup}>
            {question.options.map(option => (
              <div key={option.value} style={styles.radioOption}>
                <input
                  type="radio"
                  id={`${question.id}-${option.value}`}
                  name={question.id}
                  value={option.value}
                  checked={formData[question.id] === option.value}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  style={styles.radioInput}
                />
                <label 
                  htmlFor={`${question.id}-${option.value}`} 
                  style={styles.radioLabel}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div style={styles.checkboxGroup}>
            {question.options.map(option => (
              <div key={option.value} style={styles.checkboxOption}>
                <input
                  type="checkbox"
                  id={`${question.id}-${option.value}`}
                  value={option.value}
                  checked={formData[question.id]?.includes(option.value) || false}
                  onChange={(e) => {
                    const currentValues = formData[question.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    handleChange(question.id, newValues);
                  }}
                  style={styles.checkboxInput}
                />
                <label 
                  htmlFor={`${question.id}-${option.value}`} 
                  style={styles.radioLabel}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            style={styles.textInput}
          />
        );

      case 'select':
        return (
          <select
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            style={styles.selectInput}
          >
            <option value="">Select an option</option>
            {question.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'description':
        return (
          <p style={styles.description}>{question.text}</p>
        );

      case 'image-grid':
        return (
          <div style={{...styles.imageGrid, ...(isMobile ? styles.mobileImageGrid : {})}}>
            {question.options.map(option => (
              <div
                key={option.value}
                style={{
                  ...styles.imageOption,
                  ...(formData[question.id] === option.value ? styles.imageOptionSelected : {})
                }}
                onClick={() => handleChange(question.id, option.value)}
              >
                {option.image && (
                  <img 
                    src={option.image} 
                    alt={option.label} 
                    style={styles.optionImage}
                  />
                )}
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={formData[question.id] === option.value}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  style={styles.radioInput}
                />
                <label style={styles.imageLabel}>{option.label}</label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{...styles.container, ...(isMobile ? styles.mobileContainer : {})}}>
      <h2 style={{...styles.title, ...(isMobile ? styles.mobileTitle : {})}}>{title}</h2>
      
      <div style={styles.form}>
        {questions.map(question => (
          <div 
            key={question.id || Math.random()}
            style={{
              ...styles.formGroup,
              ...(hoveredSection === question.id ? styles.formGroupHover : {})
            }}
            onMouseEnter={() => setHoveredSection(question.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {question.type !== 'description' && question.label && (
              <label style={styles.label}>{question.label}</label>
            )}
            {renderQuestion(question)}
          </div>
        ))}
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

export default ConfigurableForm;