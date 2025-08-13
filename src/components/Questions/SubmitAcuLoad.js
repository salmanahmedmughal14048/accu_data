// Submit.js - Modified to show 10-second uploading message
import React from 'react';
import acuDataLogo from '../../assets/questions/submit/load.svg'; // Import the logo

const Submit = ({ 
  onPrev, 
  onComplete, 
  formData
}) => {
  const [isUploading, setIsUploading] = React.useState(false);

  const handleSubmit = () => {
    setIsUploading(true);

    // Show uploading message for 10 seconds then complete
    setTimeout(() => {
      onComplete(formData);
    }, 3000);
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
      textAlign: 'left',
      fontFamily: "'Montserrat', sans-serif"
    },
    logoContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px'
    },
    logoImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    description: {
      fontSize: '18px',
      color: '#4a5568',
      lineHeight: '1.5',
      marginBottom: '40px',
      textAlign: 'left',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '500'
    },
    infoSection: {
      marginBottom: '40px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: 'rgba(251, 247, 247, 1)',
      borderRadius: '8px',
      marginLeft: '-20px',
      marginRight: '-20px',
      transition: 'background-color 0.3s'
    },
    iconContainer: {
      width: '40px',
      height: '40px',
      backgroundColor: '#1e88e5',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      flexShrink: 0
    },
    icon: {
      width: '20px',
      height: '20px',
      fill: 'white'
    },
    infoText: {
      fontSize: '18px',
      color: '#2d3748',
      fontWeight: '500',
      fontFamily: "'Montserrat', sans-serif"
    },
    caseNumber: {
      color: '#999',
      fontStyle: 'italic'
    },
    contactSection: {
      backgroundColor: 'rgba(251, 247, 247, 1)',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
      marginLeft: '-20px',
      marginRight: '-20px'
    },
    contactText: {
      fontSize: '16px',
      color: '#4a5568',
      marginBottom: '15px',
      lineHeight: '1.4',
      fontFamily: "'Montserrat', sans-serif"
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    emailIcon: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
      fill: '#1e88e5'
    },
    emailLink: {
      color: '#1e88e5',
      textDecoration: 'none',
      fontSize: '16px',
      fontFamily: "'Montserrat', sans-serif"
    },
    submitButton: {
      width: '200px',
      padding: '15px',
      backgroundColor: '#1e88e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      fontFamily: "'Montserrat', sans-serif",
      alignSelf: 'center',
      marginTop: '20px'
    },
    submitButtonHover: {
      backgroundColor: '#1565c0'
    },
    uploadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    uploadingContainer: {
      backgroundColor: 'white',
      padding: '60px 40px',
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: '300px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
    uploadingTitle: {
      fontSize: '18px',
      fontWeight: '400',
      color: '#666',
      fontFamily: "'Montserrat', sans-serif",
      lineHeight: '1.5'
    },
    spinner: {
      display: 'inline-block',
      width: '40px',
      height: '40px',
      border: '4px solid #e2e8f0',
      borderRadius: '50%',
      borderTopColor: '#1e88e5',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // Add keyframe animation style to document head
  React.useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Submit your saved session</h1>
        
        <div style={styles.logoContainer}>
          <img 
            src={acuDataLogo}
            alt="ACU DATA"
            style={styles.logoImage}
          />
        </div>
        
        <p style={styles.description}>
          These patient settings will be saved and uploaded to ACU Data upon submission. 
          You can always retrieve these settings and edit them by selecting the:
        </p>
        
        <div style={styles.infoSection}>
          <div style={styles.infoItem}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span style={styles.infoText}>"Patient's Questionnaire"</span>
          </div>
          
          <div style={styles.infoItem}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span style={styles.infoText}>
              "Patient's Case Number: <span style={styles.caseNumber}>SMITH-4569"</span>
            </span>
          </div>
        </div>
        
        <div style={styles.contactSection}>
          <p style={styles.contactText}>
            If you have any comments, questions or need any assistance, feel free to reach out to us at:
          </p>
          <div style={styles.contactInfo}>
            <svg style={styles.emailIcon} viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:ACU_Data_PatientData@acuitysurgical.com" style={styles.emailLink}>
              ACU_Data_PatientData@acuitysurgical.com
            </a>
          </div>
          <p style={styles.contactText}>
            any time you need.
          </p>
        </div>
        
        <button 
          style={{
            ...styles.submitButton,
            ...(isHovered ? styles.submitButtonHover : {}),
            ...(isUploading ? { opacity: 0.7, cursor: 'not-allowed' } : {})
          }}
          onClick={handleSubmit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isUploading}
        >
          {isUploading ? 'UPLOADING...' : 'SUBMIT'}
        </button>
      </div>

      {isUploading && (
        <div style={styles.uploadingOverlay}>
          <div style={styles.uploadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.uploadingTitle}>
              Uploading<br />
              to<br />
              ACU Data
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Submit;