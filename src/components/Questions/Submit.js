import React, { useState } from 'react';
import logo from '../../assets/questions/submit/logo.png'
import emailIcon from '../../assets/questions/submit/email-icon.svg';
import submitButton from '../../assets/questions/submit/submit-button.svg';
import submitButtonHover from '../../assets/questions/submit/submit-button-hover.svg';

const Submit = ({ onPrev, onComplete, formData = {} }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      if (onComplete) {
        onComplete(formData);
      }
    }, 2000);
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#eaeaea',
      padding: '40px',
      overflowY: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#000000',
      marginBottom: '30px',
      fontFamily: "'Montserrat', sans-serif"
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: '80px',
      marginLeft: '-40px',
      marginRight: '-40px'
    },
    greenSection: {
      backgroundColor: 'rgba(22, 94, 69, 1)',
      width: '100vw',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '30px',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)'
    },
    logo: {
      height: '100px',
      width: 'auto'
    },
    messageBox: {
      width: '100%',
      maxWidth: '600px',
      textAlign: 'left',
      position: 'relative',
      marginBottom: '30px'
    },
    message: {
      fontSize: '18px',
      color: '#333333',
      lineHeight: '1.6',
      fontFamily: "'Montserrat', sans-serif",
      marginBottom: '15px',
      position: 'relative',
      zIndex: 1
    },
    setupTab: {
      fontWeight: '700',
      color: '#333333'
    },
    contactSection: {
      marginTop: '30px',
      textAlign: 'center',
      width: '100%',
      maxWidth: '600px'
    },
    contactText: {
      fontSize: '18px',
      color: '#4a5568',
      marginBottom: '15px',
      fontFamily: "'Montserrat', sans-serif"
    },
    emailLink: {
      color: '#008fe0',
      textDecoration: 'underline',
      fontSize: '18px',
      fontFamily: "'Montserrat', sans-serif",
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    emailIcon: {
      width: '20px',
      height: '20px'
    },
    submitButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px'
    },
    submitButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'transform 0.2s ease',
      position: 'relative'
    },
    submitButtonImg: {
      height: '50px',
      width: 'auto'
    },
    submitButtonText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '700',
      fontFamily: "'Montserrat', sans-serif",
      pointerEvents: 'none',
      textTransform: 'uppercase'
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'default'
    },
    successMessage: {
      fontSize: '16px',
      color: '#01a101',
      fontWeight: '600',
      fontFamily: "'Montserrat', sans-serif",
      marginTop: '20px',
      padding: '15px 25px',
      backgroundColor: '#e6f7e6',
      borderRadius: '8px',
      border: '2px solid #01a101',
      textAlign: 'center'
    }
  };

  const getSubmitButtonImage = () => {
    if (isSubmitted || isSubmitting) {
      return submitButton;
    }
    return isButtonHovered 
      ? submitButtonHover
      : submitButton;
  };

  const getSubmitButtonText = () => {
    if (isSubmitted) return 'SUBMITTED';
    if (isSubmitting) return 'SUBMITTING...';
    return 'SUBMIT';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Submit saved configuration</h1>
      
      <div style={styles.content}>
        <div style={styles.greenSection}>
          <img src={logo} alt="ACU DATA" style={styles.logo} />
        </div>
        
        <div style={styles.messageBox}>
          <p style={styles.message}>
            These system configuration settings will be saved and uploaded to 
            ACU Data upon submission. You retrieve these settings and edit 
            them by selecting the: <span style={styles.setupTab}>"Setup Tab"</span>
          </p>
        </div>

        <div style={styles.contactSection}>
          <p style={styles.contactText}>
            If you have any comments, questions or need any assistance, feel 
            free to reach out to us at:
          </p>
          <a href="mailto:ACU_Data_PatientData@acuitysurgical.com" style={styles.emailLink}>
            <img src={emailIcon} alt="Email" style={styles.emailIcon} />
            ACU_Data_PatientData@acuitysurgical.com
          </a>
          <div style={{ marginTop: '10px' }}>
            <span style={{ ...styles.contactText, fontSize: '18px' }}>
              any time you need.
            </span>
          </div>
        </div>

        {isSubmitted && (
          <div style={styles.successMessage}>
            ✓ Configuration has been successfully submitted!
          </div>
        )}

        <div style={styles.submitButtonContainer}>
          <button 
            style={{
              ...styles.submitButton,
              ...(isSubmitted || isSubmitting ? styles.submitButtonDisabled : {})
            }}
            onClick={handleSubmit}
            disabled={isSubmitted || isSubmitting}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <img 
              src={getSubmitButtonImage()} 
              alt={getSubmitButtonText()}
              style={styles.submitButtonImg}
            />
            <span style={styles.submitButtonText}>
              {getSubmitButtonText()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;