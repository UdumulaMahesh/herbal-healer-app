import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RemedyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const disease = location.state?.disease;

  if (!disease) {
    return (
      <div className="page-container">
        <p>No disease information available.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="remedy-hero">
        <h2>{disease.name}</h2>
        <p>{disease.data.description}</p>
      </div>

      <div className="info-card">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline'}}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Common Symptoms
        </h3>
        <div className="symptom-tags">
          {disease.data.symptoms.map((symptom, i) => (
            <span key={i} style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: '0.5rem 1rem',
              borderRadius: '1.5rem',
              fontSize: '0.85rem'
            }}>
              {symptom}
            </span>
          ))}
        </div>
      </div>

      <h3 style={{fontSize: '1.5rem', color: '#374151', marginBottom: '1rem'}}>
        Herbal Remedies
      </h3>
      
      <div className="remedies-list">
        {disease.data.herbalRemedies.map((remedy, index) => (
          <div key={index} className="remedy-item">
            <div className="remedy-header">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="remedy-icon"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <div style={{flex: 1}}>
                <h4 className="remedy-name">{remedy.name}</h4>
                
                <div className="remedy-detail">
                  <div className="remedy-detail-label">How to Use:</div>
                  <p className="remedy-detail-text">{remedy.usage}</p>
                </div>
                
                <div className="remedy-detail">
                  <div className="remedy-detail-label">Benefits:</div>
                  <p className="remedy-detail-text">{remedy.benefits}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="prevention-card">
        <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>
          Prevention Tips
        </h4>
        <p>{disease.data.prevention}</p>
      </div>

      <div className="warning-card">
        <p>
          <strong>⚠️ Note:</strong> These are natural remedies. If symptoms persist or worsen, 
          please consult a healthcare professional immediately.
        </p>
      </div>
    </div>
  );
};

export default RemedyPage;