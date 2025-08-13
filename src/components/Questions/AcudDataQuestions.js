// QuestionerForm.js - Your existing Questioner component (renamed)
import React, { useState, useEffect } from 'react';
import './Questioner.css';
import ConfigurationListStandalone from './ConfigurationListStandalone';
import CloudAccountForm from './CloudAccountForm';
import HardwareConfiguration from './HardwareConfiguration';
import SensorHeadConfiguration from './SensorHeadConfiguration';
import HapticWandConfiguration from './HapticWandConfiguration';
import BarcodeScannerSetup from './BarcodeScannerSetup';
import Submit from './Submit';
import welcomeImage from '../../assets/questions/welcome.jpg';

function AcudDataQuestions({ 
  onComplete, 
  onClose, 
  storageKey = 'acu_data_form',
  className = ''
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        if (Object.keys(parsedData).length > 0) {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error('Error parsing saved questioner data:', error);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  }, [formData, storageKey]);

  const handleBeginConfiguration = () => {
    setCurrentStep(1);
  };

  const handleStepClick = (step) => {
    if (step === 0) return;
    if (currentStep === 0 && step === 1) {
      handleBeginConfiguration();
    } else {
      setCurrentStep(step);
    }
  };

  const handleNextStep = (stepData) => {
    const updatedFormData = {
      ...formData,
      [`step${currentStep}`]: stepData
    };
    
    setFormData(updatedFormData);

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete(updatedFormData);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitComplete = (submitData) => {
    const finalFormData = {
      ...formData,
      step6: submitData,
      completedAt: new Date().toISOString()
    };
    
    setFormData(finalFormData);
    localStorage.removeItem(storageKey);
    
    if (onComplete) {
      onComplete(finalFormData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return null;
      case 1:
        return (
          <CloudAccountForm 
            onNext={handleNextStep} 
            onPrev={handlePrevStep}
            initialData={formData.step1 || {}}
          />
        );
      case 2:
        return (
          <HardwareConfiguration
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            initialData={formData.step2 || {}}
          />
        );
      case 3:
        return (
          <SensorHeadConfiguration
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            initialData={formData.step3 || {}}
          />
        );
      case 4:
        return (
          <HapticWandConfiguration
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            initialData={formData.step4 || {}}
          />
        );
      case 5:
        return (
          <BarcodeScannerSetup
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            initialData={formData.step5 || {}}
          />
        );
      case 6:
        return (
          <Submit
            onPrev={handlePrevStep}
            onComplete={handleSubmitComplete}
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  const renderImageColumn = () => {
    if (currentStep === 0) return null;
    
    switch (currentStep) {
      case 2:
        return (
          <div className="questioner-image-container">
            <img 
              src="/assets/images/hardware-config.png"
              alt="Hardware Configuration" 
              className="questioner-config-image" 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const WelcomeScreen = () => (
    <div className="welcome-screen">
      <h1 className="welcome-title">Welcome to ACU Data</h1>
      
      <div className="welcome-content">
        <div className="welcome-message">
          <p className="welcome-text">
            Begin by completing the configuration questions<br />
            and the corresponding fields. If you have any questions<br />
            or connection issues, please call or text us at: <span className="phone-number">1-888-ACU-HELP</span>
          </p>
        </div>

        <div className="welcome-icon">
          <img 
            src={welcomeImage}
            alt="Welcome" 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`questioner ${className}`}>
      {onClose && (
        <button 
          className="questioner-close-button"
          onClick={onClose}
          aria-label="Close questionnaire"
        >
          ×
        </button>
      )}
      
      <div className="questioner-content-area">
        <div className="questioner-left-panel">
          <ConfigurationListStandalone 
            currentStep={currentStep} 
            onStepClick={handleStepClick} 
          />
        </div>
        
        {currentStep === 0 ? (
          <div className="questioner-welcome-panel">
            <WelcomeScreen />
          </div>
        ) : (
          <>
            <div className="questioner-middle-panel">
              {renderStepContent()}
            </div>
            
            <div className={`questioner-right-panel ${renderImageColumn() ? 'has-images' : ''}`}>
              {renderImageColumn()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AcudDataQuestions;