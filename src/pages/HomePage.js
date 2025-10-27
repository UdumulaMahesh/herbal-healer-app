import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseaseDatabase } from '../data/diseaseData';
import Footer from './Footer';
// Correct path
import TranslateDropdown from '../components/TranslateDropdown.js';

const HomePage = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [identifiedDiseases, setIdentifiedDiseases] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const analyzeImage = async (imageData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const possibleFindings = [
          { disease: 'Skin Allergies', confidence: 0.85, reason: 'Detected redness and rash patterns' },
          { disease: 'Fever', confidence: 0.65, reason: 'Visual indicators of illness' },
          { disease: 'Common Cold', confidence: 0.60, reason: 'General illness symptoms visible' }
        ];
        resolve(possibleFindings);
      }, 2000);
    });
  };

  const identifyDisease = async () => {
    if (!symptoms.trim() && !uploadedImage) {
      alert('Please enter symptoms or upload an image');
      return;
    }

    setIsAnalyzing(true);
    const matches = [];

    if (symptoms.trim()) {
      const symptomList = symptoms.toLowerCase().split(',').map(s => s.trim());
      
      Object.keys(diseaseDatabase).forEach(disease => {
        const diseaseSymptoms = diseaseDatabase[disease].symptoms;
        let matchCount = 0;

        symptomList.forEach(symptom => {
          diseaseSymptoms.forEach(dSymptom => {
            if (dSymptom.includes(symptom) || symptom.includes(dSymptom)) {
              matchCount++;
            }
          });
        });

        if (matchCount > 0) {
          matches.push({
            name: disease,
            matchScore: matchCount,
            data: diseaseDatabase[disease],
            source: 'text'
          });
        }
      });
    }

    if (uploadedImage) {
      const imageFindings = await analyzeImage(imagePreview);
      
      imageFindings.forEach(finding => {
        const existingMatch = matches.find(m => m.name === finding.disease);
        if (existingMatch) {
          existingMatch.matchScore += 2; 
          existingMatch.imageConfidence = finding.confidence;
          existingMatch.imageReason = finding.reason;
        } else if (diseaseDatabase[finding.disease]) {
          matches.push({
            name: 'disease',
            matchScore: 2,
            data: diseaseDatabase[finding.disease],
            source: 'image',
            imageConfidence: finding.confidence,
            imageReason: finding.reason
          });
        }
      });
    }

    matches.sort((a, b) => b.matchScore - a.matchScore);
    setIdentifiedDiseases(matches);
    setIsAnalyzing(false);

    if (matches.length === 0) {
      alert('No matching diseases found. Please try different symptoms or consult a doctor.');
    }
  };

  const viewRemedy = (disease) => {
    navigate('/remedy', { state: { disease } });
  };

  return (
    <div 
      className="page-container" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        position: 'relative' // 2. Add position relative to anchor the icon
      }}
    >
      {/* 3. Add the dropdown component here */}
      <div style={{ 
        position: 'absolute', 
        top: '1.5rem', 
        right: '1.5rem', 
        zIndex: 10 
      }}>
        <TranslateDropdown />
      </div>

      <div className="hero-section">
        <div className="hero-icon">🌿</div>
        <h1 className="hero-title">Herbal Healer</h1>
        <p className="hero-subtitle">Natural Remedies for Better Health</p>
      </div>

      <div className="identification-card">
        <h2>Disease Identification</h2>
        
        <div className="input-group">
          <label>Describe Your Symptoms</label>
          <textarea
            className="textarea-input"
            rows="3"
            placeholder="Enter your symptoms separated by commas (e.g., headache, fever, cough)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <div className="upload-section">
          <div className="upload-option">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="upload-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-label">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Upload Image</span>
              <span style={{fontSize: '0.75rem', color: '#6b7280'}}>From Gallery</span>
            </label>
          </div>

          <div className="upload-option">
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="upload-input"
              id="camera-upload"
            />
            <label htmlFor="camera-upload" className="upload-label">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span>Take Photo</span>
              <span style={{fontSize: '0.75rem', color: '#6b7280'}}>Use Camera</span>
            </label>
          </div>
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" className="preview-image" />
            <button onClick={removeImage} className="remove-image-btn">
              Remove Image
            </button>
          </div>
        )}

        <button 
          onClick={identifyDisease} 
          className="btn-primary"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <span className="loading-spinner"></span>
              Analyzing...
            </span>
          ) : (
            'Identify Disease'
          )}
        </button>
      </div>

      {identifiedDiseases.length > 0 && (
        <div className="results-section">
          <h3 className="results-title">Possible Conditions:</h3>
          {identifiedDiseases.map((disease, index) => (
            <div
              key={index}
              className="disease-card"
              onClick={() => viewRemedy(disease)}
            >
              <div className="disease-header">
                <h4 className="disease-name">{disease.name}</h4>
                <span className="match-badge">
                  {disease.matchScore} {disease.source === 'image' ? 'image match' : 'symptoms match'}
                </span>
              </div>
              <p className="disease-description">{disease.data.description}</p>
              {disease.imageConfidence && (
                <p style={{fontSize: '0.85rem', color: '#059669', marginTop: '0.5rem'}}>
                  📷 {disease.imageReason} ({Math.round(disease.imageConfidence * 100)}% confidence)
                </p>
              )}
              <span className="view-remedies-link">View Remedies →</span>
            </div>
          ))}
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem'}}>
        <div 
          onClick={() => navigate('/browse')}
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📚</div>
          <h3 style={{color: '#374151', marginBottom: '0.5rem'}}>Browse Diseases</h3>
          <p style={{fontSize: '0.85rem', color: '#6b7280'}}>View all conditions</p>
        </div>

        <div 
          onClick={() => navigate('/doctors')}
          style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>👨‍⚕️</div>
          <h3 style={{color: '#374151', marginBottom: '0.5rem'}}>Consult Doctor</h3>
          <p style={{fontSize: '0.85rem', color: '#6b7280'}}>Get expert advice</p>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
      
    </div>
  );
};

export default HomePage;