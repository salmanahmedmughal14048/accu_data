// Questioner.js - Main wrapper component for multi-questionnaire flow
import React, { useState, useEffect } from 'react';
import AcudDataQuestions from './AcudDataQuestions';
import AcuLoad from './AcuLoad';
import SecondComponent from './SecondComponent';

function Questioner({ 
  onComplete,
  onClose, 
  storageKey = 'acu_data_form',
  className = ''
}) {
  const [currentPhase, setCurrentPhase] = useState('medical'); // Start with medical questionnaire
  const [medicalData, setMedicalData] = useState(null);
  const [hardwareData, setHardwareData] = useState(null);

   

  

  // Handle completion of medical questionnaire
  const handleMedicalComplete = (formData) => {
    setMedicalData(formData);
    setCurrentPhase('hardware'); // Move to hardware questionnaire
  };

  // Clean and normalize questionnaire data for database storage
  const normalizeQuestionnaireData = (medicalData, hardwareData) => {
    // Define all expected medical fields to ensure completeness
    const expectedMedicalFields = [
      'treatmentLevel',
      'preferredApproach', 
      'excludedApproach',
      'patientSmoker',
      'smokingFrequency',
      'smokingYears',
      'hasDiabetes',
      'diabetesType',
      'hasOsteoporosis',
      'hasOsteopenia',
      'hasRheumatoidArthritis',
      'priorSurgery',
      'surgerySite',
      'previousSurgerySite',
      'bmiCategory',
      'restrictActivity',
      'requireTreatments',
      'adjacentLevelRisk',
      'patientSpecificDevice',
      'preferredFootprint',
      'maximumAperture',
      'fixationHoles',
      'riskCompliance'
    ];

    // Extract the most recent/complete medical data
    let cleanMedicalData = {};
    
    if (medicalData) {
      // Find the most complete medical data by looking for the deepest step with the most fields
      let deepestStep = null;
      let maxFields = 0;
      
      // Recursively find the step with the most fields
      const findDeepestStep = (data, depth = 0) => {
        if (typeof data === 'object' && data !== null) {
          Object.keys(data).forEach(key => {
            if (key.startsWith('step') && typeof data[key] === 'object') {
              const fieldCount = Object.keys(data[key]).filter(k => !k.startsWith('step') && k !== 'completedAt').length;
              if (fieldCount > maxFields) {
                maxFields = fieldCount;
                deepestStep = data[key];
              }
              findDeepestStep(data[key], depth + 1);
            }
          });
        }
      };
      
      findDeepestStep(medicalData);
      
      // Use the deepest step or fallback to step8
      if (deepestStep && Object.keys(deepestStep).length > 0) {
        cleanMedicalData = { ...deepestStep };
      } else if (medicalData.step8) {
        cleanMedicalData = { ...medicalData.step8 };
      }
      
      // Remove any step references and completedAt from medical data
      Object.keys(cleanMedicalData).forEach(key => {
        if (key.startsWith('step') || key === 'completedAt') {
          delete cleanMedicalData[key];
        }
      });

      // Ensure all expected fields are present (set to null if missing)
      expectedMedicalFields.forEach(field => {
        if (!(field in cleanMedicalData)) {
          cleanMedicalData[field] = null;
        }
      });
    }
    
    // Clean hardware data by completely removing step6 and ensuring all steps are captured
    let cleanHardwareData = {};
    
    if (hardwareData) {
      // Only copy steps 1-5, completely ignore step6 (which contains duplicates)
      for (let i = 1; i <= 5; i++) {
        const stepKey = `step${i}`;
        if (hardwareData[stepKey]) {
          cleanHardwareData[stepKey] = { ...hardwareData[stepKey] };
          
          // Remove any nested step references or completedAt from each step
          Object.keys(cleanHardwareData[stepKey]).forEach(key => {
            if (key.startsWith('step') || key === 'completedAt') {
              delete cleanHardwareData[stepKey][key];
            }
          });
        } else {
          // Initialize empty step if it doesn't exist
          cleanHardwareData[stepKey] = {};
        }
      }
    }
    
    return {
      medical: cleanMedicalData,
      hardware: cleanHardwareData,
      completedAt: new Date().toISOString()
    };
  };

  // Validate and log field completeness
  const validateFieldCompleteness = (normalizedData) => {
    const { medical, hardware } = normalizedData;
    // Medical fields validation
    Object.keys(medical).forEach(field => {
      const value = medical[field];
      const status = value && value !== '' ? '✅' : '❌';
    });
    
    Object.keys(hardware).forEach(stepKey => {
      if (hardware[stepKey] && typeof hardware[stepKey] === 'object') {
        Object.keys(hardware[stepKey]).forEach(field => {
          const value = hardware[stepKey][field];
          const status = value && value !== '' ? '✅' : '❌';
        });
      }
    });
  };

  // Handle completion of hardware questionnaire
  const handleHardwareComplete = (formData) => {
    setHardwareData(formData);
    // Clean and normalize the data for database storage
    const normalizedData = normalizeQuestionnaireData(medicalData, formData);
    // Validate field completeness
    validateFieldCompleteness(normalizedData);
    console.log(JSON.stringify(normalizedData, null, 2));
    if (onComplete) {
      onComplete(normalizedData);
    }
  };

  // Handle close/cancel
  const handleClose = () => {
    if (onClose) {
      const normalizedData = normalizeQuestionnaireData(medicalData, hardwareData);
      onClose(normalizedData);
    }
  };

  // Render current phase
  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'medical':
        return (
          <AcuLoad
            onComplete={handleMedicalComplete}
            onClose={handleClose}
            storageKey={`${storageKey}_medical`}
            className={className}
          />
        );
      
      case 'hardware':
        return (
          <AcudDataQuestions
            onComplete={handleHardwareComplete}
            onClose={handleClose}
            storageKey={`${storageKey}_hardware`}
            className={className}
            previousData={medicalData}
          />
        );
      
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className={`questioner ${className}`}>
      {/* Current questionnaire content */}
      {renderCurrentPhase()}
    </div>
  );
}

export default Questioner;