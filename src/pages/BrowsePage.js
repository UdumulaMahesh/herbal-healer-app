import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseaseDatabase } from '../data/diseaseData';

const BrowsePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const searchDiseases = () => {
    return Object.keys(diseaseDatabase).filter(disease =>
      disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diseaseDatabase[disease].description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diseaseDatabase[disease].symptoms.some(symptom => 
        symptom.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const diseases = searchQuery ? searchDiseases() : Object.keys(diseaseDatabase);

  const viewRemedy = (diseaseName) => {
    const disease = {
      name: diseaseName,
      data: diseaseDatabase[diseaseName]
    };
    navigate('/remedy', { state: { disease } });
  };

  return (
    <div className="page-container">
      <h2 style={{fontSize: '2rem', color: '#065f46', marginBottom: '1.5rem'}}>
        Browse Diseases
      </h2>

      <div className="search-container">
        <svg 
          className="search-icon"
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search diseases or symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="disease-list">
        {diseases.length > 0 ? (
          diseases.map((disease) => (
            <div
              key={disease}
              className="disease-card"
              onClick={() => viewRemedy(disease)}
            >
              <h3 className="disease-name">{disease}</h3>
              <p className="disease-description">
                {diseaseDatabase[disease].description}
              </p>
              <div className="symptom-tags">
                {diseaseDatabase[disease].symptoms.slice(0, 4).map((symptom, i) => (
                  <span key={i} className="symptom-tag">
                    {symptom}
                  </span>
                ))}
                {diseaseDatabase[disease].symptoms.length > 4 && (
                  <span className="symptom-tag">
                    +{diseaseDatabase[disease].symptoms.length - 4} more
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280'
          }}>
            <p>No diseases found matching "{searchQuery}"</p>
            <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
              Try different keywords or browse all diseases
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;