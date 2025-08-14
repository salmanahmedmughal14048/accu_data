import React from 'react';
import logo from '../../assets/questions/submit/logo.png';
import emailIcon from '../../assets/questions/submit/email-icon.svg';

const Submit = ({ onPrev, onComplete, formData = {} }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleSubmit = () => {
    setIsUploading(true);
    // Simulate submission process
    setTimeout(() => {
      setIsUploading(false);
      if (onComplete) {
        onComplete(formData);
      }
    }, 3000);
  };

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
      fontSize: '15px',
      color: '#333333',
      lineHeight: '1.6',
      fontFamily: "'Montserrat', sans-serif",
      marginBottom: '15px',
      position: 'relative',
      zIndex: 1,
      padding:'0 10px'
    },
    setupTab: {
      fontWeight: '700',
      color: '#333333'
    },
    contactSection: {
      marginTop: '30px',
      textAlign: 'center',
      width: '100%',
      maxWidth: '600px',
       padding:'0 15px'
      
    },
    contactText: {
      fontSize: '15px',
      color: '#4a5568',
      marginBottom: '15px',
      fontFamily: "'Montserrat', sans-serif"
    },
    emailLink: {
      color: '#008fe0',
      textDecoration: 'underline',
      fontSize: '15px',
      fontFamily: "'Montserrat', sans-serif",
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    },
    emailIcon: {
      width: '20px',
      height: '20px'
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
              <span style={{ ...styles.contactText, fontSize: '15px' }}>
                any time you need.
              </span>
            </div>
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