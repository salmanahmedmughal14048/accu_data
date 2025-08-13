// Questioner.js - Main wrapper component (keeping original name)
import React, { useState } from 'react';
import AcudDataQuestions from './AcudDataQuestions';

import AcuLoad from './AcuLoad';
import SecondComponent from './SecondComponent';



function Questioner({ 
  onComplete,
  onClose, 
  storageKey = 'acu_data_form',
  className = ''
}) {
  const [currentPhase, setCurrentPhase] = useState('questioner');
  const [questionerData, setQuestionerData] = useState(null);

 

  const handleQuestionerComplete = (formData) => {
  // Call parent's onComplete directly
  if (onComplete) {
    onComplete(formData);
  }
};
  const handleSecondComponentComplete = (secondData) => {
    const finalData = {
      questionerData,
      secondComponentData: secondData,
      completedAt: new Date().toISOString()
    };
    
    if (onComplete) {
      onComplete(finalData);
    }
    
    if (onClose) {
      onClose(finalData);
    }
  };

  const handleBackToQuestioner = () => {
    setCurrentPhase('questioner');
  };
/*
  return (
    <div className={`questioner ${className}`}>
      {currentPhase === 'questioner' ? (
        <AcuLoad
          onComplete={handleQuestionerComplete}
          onClose={onClose}
          storageKey={storageKey}
          className={className}
        />
      ) : (
        <SecondComponent
          onComplete={handleSecondComponentComplete}
          onBack={handleBackToQuestioner}
          onClose={onClose}
          questionerData={questionerData}
          className={className}
        />
      )}
    </div>
  );
*/
    return (
    <div className={`questioner ${className}`}>
        {currentPhase === 'questioner' ? (
        <AcuLoad
            onComplete={handleQuestionerComplete}
            onClose={onClose}
            storageKey={storageKey}
            className={className}
        />
        ) : (
        <div>Form completed successfully!</div> // Or some completion message
        )}
    </div>
    );
}

export default Questioner;