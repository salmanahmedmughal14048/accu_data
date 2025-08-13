// ConfigurableForm.js - Complete working generic form component
import React, { useState, useEffect } from 'react';
import prevButton from '../../assets/questions/images/prev-button.svg';
import prevButtonHover from '../../assets/questions/images/prev-button-hover.svg';
import nextButton from '../../assets/questions/next-button.svg';
import nextButtonHover from '../../assets/questions/next-button-hover.svg';

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
      padding: '30px',
      overflowY: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    title: {
      fontSize: '28px',
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
      fontStyle: 'italic',
      lineHeight: '1.4'
    },
    formSection: {
      paddingBottom: '20px'
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
      fontSize: '16px',
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
      fontSize: '16px',
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
    // Select/dropdown input
    selectInput: {
      width: '100%',
      padding: '10px',
      fontSize: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontFamily: "'Montserrat', sans-serif",
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '15px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      fontFamily: "'Montserrat', sans-serif",
      minHeight: '80px',
      resize: 'vertical'
    },
    // Button styles
    buttonWrapper: {
      display: 'flex',
      gap: '15px',
      justifyContent: showPrevButton ? 'space-between' : 'flex-end',
      paddingTop: '15px',
      flexDirection: 'row'
    },
    buttonWrapperMobile: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      paddingTop: '15px',
      flexDirection: 'column',
      alignItems: 'center'
    },
    buttonImg: {
      cursor: 'pointer',
      display: 'block'
    },
    prevButtonContainer: {
      position: 'relative',
      cursor: 'pointer',
      display: 'inline-block'
    },
    prevText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '16px',
      color: '#333333',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '600',
      pointerEvents: 'none'
    }
  };

  const getFormGroupStyle = (sectionId) => {
    return {
      ...styles.formGroup,
      ...(hoveredSection === sectionId ? styles.formGroupHover : {})
    };
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'radio':
        return (
          <div style={styles.radioGroup}>
            {question.options.map(option => (
              <div key={option.id} style={styles.radioOption}>
                <input
                  type="radio"
                  id={`${question.id}-${option.id}`}
                  name={question.id}
                  value={option.id}
                  checked={formData[question.id] === option.id}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  style={styles.radioInput}
                />
                <label htmlFor={`${question.id}-${option.id}`} style={styles.radioLabel}>
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
              <div key={option.id} style={styles.checkboxOption}>
                <input
                  type="checkbox"
                  id={`${question.id}-${option.id}`}
                  name={question.id}
                  value={option.id}
                  checked={(formData[question.id] || []).includes(option.id)}
                  onChange={(e) => {
                    const currentValues = formData[question.id] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.id]
                      : currentValues.filter(val => val !== option.id);
                    handleChange(question.id, newValues);
                  }}
                  style={styles.checkboxInput}
                />
                <label htmlFor={`${question.id}-${option.id}`} style={styles.radioLabel}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            style={styles.selectInput}
          >
            <option value="">Select</option>
            {question.options.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
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

      case 'textarea':
        return (
          <textarea
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            style={styles.textarea}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            min={question.min}
            max={question.max}
            step={question.step}
            style={styles.textInput}
          />
        );

      case 'description':
        return (
          <div style={styles.description}>
            {question.text}
          </div>
        );

      default:
        return <div>Unsupported question type: {question.type}</div>;
    }
  };

  // Find description from questions array
  const descriptionItem = questions.find(q => q.type === 'description');
  const regularQuestions = questions.filter(q => q.type !== 'description');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      {descriptionItem && (
        <p style={styles.description}>{descriptionItem.text}</p>
      )}
      
      <div style={styles.formSection}>
        {regularQuestions.map((question, index) => (
          <div 
            key={question.id}
            style={getFormGroupStyle(question.id)}
            onMouseEnter={() => setHoveredSection(question.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <label style={styles.label}>{question.label}</label>
            {renderQuestion(question)}
          </div>
        ))}
      </div>

      <div style={isMobile ? styles.buttonWrapperMobile : styles.buttonWrapper}>
        {showPrevButton && (
          <div 
            style={styles.prevButtonContainer} 
            onClick={onPrev}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              const span = e.currentTarget.querySelector('span');
              if (img) img.src = prevButtonHover;
              if (span) span.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              const span = e.currentTarget.querySelector('span');
              if (img) img.src = prevButton;
              if (span) span.style.color = '#333333';
            }}
          >
            <img src={prevButton} alt="Previous" style={styles.buttonImg} />
            <span style={styles.prevText}>PREV</span>
          </div>
        )}
        <img 
          src={nextButton}
          alt={nextButtonText}
          style={styles.buttonImg}
          onClick={handleNext}
          onMouseEnter={(e) => e.target.src = nextButtonHover}
          onMouseLeave={(e) => e.target.src = nextButton}
        />
      </div>
    </div>
  );
};

export default ConfigurableForm;