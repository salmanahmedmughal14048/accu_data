// SecondComponent.js - Component that appears after questioner submit
import React, { useState } from 'react';

function SecondComponent({ 
  onComplete, 
  onBack, 
  onClose, 
  questionerData, 
  className = '' 
}) {
  const [secondFormData, setSecondFormData] = useState({});

  const handleSubmit = () => {
    // Process your second component data
    onComplete(secondFormData);
  };

  const handleInputChange = (field, value) => {
    setSecondFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`second-component ${className}`}>
      {onClose && (
        <button 
          className="questioner-close-button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
      
      <div className="second-component-content">
        <h2>Second Component</h2>
        <p>This is your new component that appears after the questioner is submitted.</p>
        
        {/* Access the questioner data if needed */}
        <div className="previous-data">
          <h3>Data from Questioner:</h3>
          <div className="data-summary">
            <p>Questioner completed at: {questionerData?.completedAt}</p>
            <p>Total steps completed: {Object.keys(questionerData || {}).filter(key => key.startsWith('step')).length}</p>
          </div>
        </div>

        {/* Your second component form content goes here */}
        <div className="second-form">
          <h3>Additional Information</h3>
          
          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes:</label>
            <textarea
              id="additionalNotes"
              value={secondFormData.additionalNotes || ''}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Enter any additional notes..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level:</label>
            <select
              id="priority"
              value={secondFormData.priority || ''}
              onChange={(e) => handleInputChange('priority', e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={secondFormData.confirmationRequired || false}
                onChange={(e) => handleInputChange('confirmationRequired', e.target.checked)}
              />
              Requires confirmation
            </label>
          </div>
        </div>

        <div className="second-component-actions">
          <button type="button" onClick={onBack} className="btn-secondary">
            Back to Questioner
          </button>
          <button type="button" onClick={handleSubmit} className="btn-primary">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecondComponent;