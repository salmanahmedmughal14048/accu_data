// AcuLoad.js - Your existing component with dummy questions added
import React, { useState, useEffect } from 'react';
import './Questioner.css';
import ConfigurationListStandalone from './ConfigurationListStandalone';
import ConfigurableForm from './ConfigurableForm';
import Submit from './SubmitAcuLoad';
import welcomeImage from '../../assets/questions/welcome.jpg';
import { useHistory } from "react-router-dom";

// WRONG - This doesn't call the parent
 
const medicalQuestionSteps = [
  { id: 1, text: "What is (are) the level(s) to be treated?" },
  { id: 2, text: "What is your preferred surgical approach?" },
  { id: 3, text: "Is the patient a smoker?" },
  { id: 4, text: "Does the patient have any co-morbidities?" },
  { id: 5, text: "Does the patient have prior surgery at the level(s) to be treated or adjacent levels?" },
  { id: 6, text: "Does the patient have elevated BMI?" },
  { id: 7, text: "Does the patient present a risk of post-surgical non-compliance with your instructions?" },
  { id: 8, text: "Would you prefer a patient specific device?" }, // Change this
  { id: 9, text: "Submit" } // Add step 9
];

// Updated questions to match real formats from images (steps 1-7 only, step 8 uses Submit component)
const stepQuestions = {
  1: {
    title: "Levels to be treated?",
    questions: [
      {
        id: 'treatmentLevel',
        type: 'radio',
        label: 'Which levels do you intend to treat on the patient?',
        options: [
          { id: 'L2-L3', label: 'L2 - L3' },
          { id: 'L3-L4', label: 'L3 - L4' },
          { id: 'L4-L5', label: 'L4 - L5' },
          { id: 'L5-S1', label: 'L5 - S1' }
        ]
      }
    ]
  },
  2: {
    title: "Surgical Approach",
    questions: [
      {
        id: 'preferredApproach',
        type: 'radio',
        label: 'Do you have a preferred approach?',
        options: [
          { id: 'Anterior', label: 'Anterior' },
          { id: 'Lateral', label: 'Lateral' },
          { id: 'TLIF', label: 'TLIF' },
          { id: 'PLIF', label: 'PLIF' }
        ]
      },
      {
        id: 'excludedApproach',
        type: 'radio',
        label: 'Do you have any approach you do not want to analyze?',
        options: [
          { id: 'Anterior', label: 'Anterior' },
          { id: 'Lateral', label: 'Lateral' },
          { id: 'TLIF', label: 'TLIF' },
          { id: 'PLIF', label: 'PLIF' }
        ]
      }
    ]
  },
  3: {
    title: "Smoking Eligibility",
    questions: [
      {
            type: 'description',
            text: 'Answer the following questions to help determine eligibility'
      },

      {
        id: 'patientSmoker',
        type: 'radio',
        label: 'Do you smoke?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'smokingFrequency',
        type: 'select',
        label: 'How frequently does the patient smoke?',
        options: [
          { id: 'Infrequent', label: 'Infrequent Smoker' },
          { id: 'Frequent', label: 'Frequent Smoker' },
          { id: 'Chain', label: 'Chain Smoker' }
        ]
      },
      {
        id: 'smokingYears',
        type: 'select',
        label: 'How many years has the patient smoked?',
        options: [
          { id: '0-5', label: '0 - 5 Years' },
          { id: '6-10', label: '6 - 10 Years' },
          { id: '10+', label: '10+ Years' }
        ]
      }
    ]
  },
  4: {
    title: "Patient Co-Morbidities",
    questions: [
      {
        id: 'hasDiabetes',
        type: 'radio',
        label: 'Does the patient have diabetes?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'diabetesType',
        type: 'radio',
        label: 'If yes: Select type?',
        options: [
          { id: 'Type1', label: 'Type 1 Diabetes' },
          { id: 'Type2', label: 'Type 2 Diabetes' },
          { id: 'Other', label: 'Other' }
        ]
      },
      {
        id: 'hasOsteoporosis',
        type: 'radio',
        label: 'Does the patient have osteoporosis?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'hasOsteopenia',
        type: 'radio',
        label: 'Does the patient have osteopenia?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'hasRheumatoidArthritis',
        type: 'radio',
        label: 'Does the patient have rheumatoid arthritis?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      }
    ]
  },
  5: {
    title: "Patient History",
    questions: [
      {
        id: 'priorSurgery',
        type: 'radio',
        label: 'Does the patient have prior surgery at the level(s) to be treated or adjacent levels?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'surgerySite',
        type: 'radio',
        label: 'Select surgery site:',
        options: [
          { id: 'NotApplicable', label: 'Not Applicable' },
          { id: 'L2-L3', label: 'L2 - L3' },
          { id: 'L3-L4', label: 'L3 - L4' },
          { id: 'L4-L5', label: 'L4 - L5' },
          { id: 'L5-S1', label: 'L5 - S1' }
        ]
      },
      {
        id: 'previousSurgerySite',
        type: 'radio',
        label: 'Select "previous surgery" site:',
        options: [
          { id: 'L2-L3', label: 'L2 - L3' },
          { id: 'L3-L4', label: 'L3 - L4' },
          { id: 'L4-L5', label: 'L4 - L5' },
          { id: 'L5-S1', label: 'L5 - S1' }
        ]
      }
    ]
  },
  6: {
    title: "Elevated BMI",
    questions: [
      {
        id: 'bmiCategory',
        type: 'radio',
        label: 'Describe the patient Body Mass Index (BMI):',
        options: [
          { id: 'Underweight', label: 'Underweight' },
          { id: 'Normal', label: 'Normal' },
          { id: 'Overweight', label: 'Overweight' },
          { id: 'Obese', label: 'Obese' }
        ]
      }
    ]
  },
  7: {
    title: "Post Surgical Compliance",
    questions: [
      {
        id: 'restrictActivity',
        type: 'radio',
        label: 'Is the patient likely to restrict post operative activity? ',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'requireTreatments',
        type: 'radio',
        label: 'Would the patient require other post operative treatments? i.e.: bone stimulation',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      },
      {
        id: 'adjacentLevelRisk',
        type: 'radio',
        label: 'Is the patient at risk for treating adjacent level degeneration?',
        options: [
          { id: 'Yes', label: 'Yes' },
          { id: 'No', label: 'No' }
        ]
      }
    ]
  },
  8: {
  title: "Post Surgical Specific Device",
  questions: [
    {
      id: 'patientSpecificDevice',
      type: 'radio',
      label: 'Would you prefer a patient specific device?',
      options: [
        { id: 'Yes', label: 'Yes' },
        { id: 'No', label: 'No' }
      ]
    },
    {
      id: 'preferredFootprint',
      type: 'text',
      label: 'If yes, do you have a preferred footprint?',
      placeholder: 'Enter preferred footprint'
    },
    {
      id: 'maximumAperture',
      type: 'text',
      label: "What's the maximum aperture you work through?",
      placeholder: 'Enter maximum aperture'
    },
    {
      id: 'fixationHoles',
      type: 'radio',
      label: 'What is the number of "fixation or interfixation" holes?',
      options: [
        { id: '0', label: '0' },
        { id: '2', label: '2' },
        { id: '4', label: '4' }
      ]
    },
    {
      id: 'riskCompliance',
      type: 'radio',
      label: 'Regardless of the analysis, what is the risk of subsidence and the patient\'s anticipated postoperative compliance?',
      options: [
        { id: 'LowRiskGoodCompliance', label: 'Low Risk and Good Compliance' },
        { id: 'MediumRiskGoodCompliance', label: 'Medium Risk and Good Compliance' },
        { id: 'HighRiskGoodCompliance', label: 'High Risk and Good Compliance' },
        { id: 'HighRiskPoorCompliance', label: 'High Risk and Poor Compliance' }
      ]
    }
  ]
}
  // Step 8 uses the Submit component instead of stepQuestions
};

function AcuLoad({ 
  onComplete, 
  onClose, 
  storageKey = 'acu_data_form',
  className = ''
}) {
    const history = useHistory(); // Add this hook inside the component
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

    if (currentStep < 9) {
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
      [`step${currentStep}`]: submitData,
      completedAt: new Date().toISOString()
    };
    
    setFormData(finalFormData);
    localStorage.removeItem(storageKey);
    
    if (onComplete) {
      onComplete(finalFormData);
    }
  };

  const renderStepContent = () => {
    if (currentStep === 0) return null;

    // Use Submit component for step 8
    if (currentStep === 9) {
      return (
        <Submit
          onPrev={handlePrevStep}
          onComplete={handleSubmitComplete}
          formData={formData}
        />
      );
    }

    // Get questions for current step
    const stepConfig = stepQuestions[currentStep];
    
    if (!stepConfig) {
      return <div>No questions configured for step {currentStep}</div>;
    }

    return (
      <ConfigurableForm
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        initialData={formData[`step${currentStep}`] || {}}
        questions={stepConfig.questions}
        title={stepConfig.title}
        showPrevButton={currentStep > 1}
        nextButtonText={currentStep === 8 ? "Review" : "Next"}
      />
    );
  };

  const renderImageColumn = () => {
    if (currentStep === 0) return null;
    
    switch (currentStep) {
      case 20:
        return (
          <div className="questioner-image-container">
            <img 
              src="/src/assets/images/hardware-config.png"
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
      <h1 className="welcome-title">Welcome to ACU Load</h1>
      
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
            steps={medicalQuestionSteps}
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

export default AcuLoad;