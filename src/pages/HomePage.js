import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { diseaseDatabase } from '../data/diseaseData';
import Footer from './Footer';
import TranslateDropdown from '../components/TranslateDropdown.js';

const HomePage = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [identifiedDiseases, setIdentifiedDiseases] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const healthTips = [
    "💧 Stay hydrated — drink at least 2–3 liters of water daily.",
    "🌿 Tulsi tea boosts immunity and reduces stress.",
    "🥦 Eat more greens to detox your body naturally.",
    "🧘 Practice meditation daily for mental clarity.",
    "☀️ Morning sunlight helps balance your circadian rhythm."
  ];

  // ✅ Prevent access if not logged in
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ Prevent back navigation to login/signup when logged in
  useEffect(() => {
    const handlePopState = () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        navigate("/", { replace: true });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // Auto-rotating health tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const analyzeImage = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { disease: 'Skin Allergies', confidence: 0.85, reason: 'Detected redness and rash patterns' },
          { disease: 'Fever', confidence: 0.65, reason: 'Visual indicators of illness' }
        ]);
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

    // Text-based symptom match
    if (symptoms.trim()) {
      const symptomList = symptoms.toLowerCase().split(',').map(s => s.trim());
      Object.keys(diseaseDatabase).forEach(disease => {
        const diseaseSymptoms = diseaseDatabase[disease].symptoms;
        let matchCount = 0;
        symptomList.forEach(symptom => {
          diseaseSymptoms.forEach(dSymptom => {
            if (dSymptom.includes(symptom) || symptom.includes(dSymptom)) matchCount++;
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

    // Image-based findings
    if (uploadedImage) {
      const imageFindings = await analyzeImage();
      imageFindings.forEach(finding => {
        const existing = matches.find(m => m.name === finding.disease);
        if (existing) {
          existing.matchScore += 2;
          existing.imageConfidence = finding.confidence;
          existing.imageReason = finding.reason;
        } else if (diseaseDatabase[finding.disease]) {
          matches.push({
            name: finding.disease,
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

    if (matches.length === 0) alert('No matching diseases found.');
  };

  const viewRemedy = (disease) => navigate('/remedy', { state: { disease } });

  return (
    <div
      className={`page-container ${darkMode ? 'dark-mode' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* 🔹 Top Controls (Translate + Dark Mode Only) */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '1rem',
          zIndex: 10
        }}
      >
        <TranslateDropdown />
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          title="Toggle Dark Mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#059669', fontWeight: '700' }}>
          🌿 Herbal Healer
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
          Identify Diseases & Discover Natural Remedies
        </p>
      </div>

      {/* Main Identification Card */}
      <div
        className="identification-card"
        style={{
          background: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          maxWidth: '700px',
          margin: '2rem auto',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#065f46' }}>Disease Identification</h2>
        <textarea
          rows="3"
          placeholder="Enter your symptoms separated by commas (e.g., headache, fever, cough)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginTop: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db'
          }}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <label htmlFor="file-upload" className="upload-box">
            📁 Upload Image
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileUpload}
              hidden
            />
          </label>

          <label htmlFor="camera-upload" className="upload-box">
            📷 Take Photo
            <input
              ref={cameraInputRef}
              type="file"
              id="camera-upload"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              hidden
            />
          </label>
        </div>

        {imagePreview && (
          <div style={{ marginTop: '1rem' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100%', borderRadius: '0.5rem' }}
            />
            <button
              onClick={removeImage}
              style={{
                marginTop: '0.5rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        )}

        <button
          onClick={identifyDisease}
          disabled={isAnalyzing}
          style={{
            width: '100%',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginTop: '1.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Identify Disease'}
        </button>
      </div>

      {/* Results */}
      {identifiedDiseases.length > 0 && (
        <div
          className="results-section"
          style={{ maxWidth: '700px', margin: '1rem auto', textAlign: 'left' }}
        >
          <h3 style={{ color: '#065f46' }}>Possible Conditions:</h3>
          {identifiedDiseases.map((disease, i) => (
            <div
              key={i}
              onClick={() => viewRemedy(disease)}
              style={{
                background: '#ecfdf5',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginTop: '1rem',
                cursor: 'pointer',
                transition: '0.3s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <h4 style={{ color: '#065f46' }}>{disease.name}</h4>
              <p style={{ color: '#374151' }}>{disease.data.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Health Tip Section */}
      <div
        style={{
          background: 'linear-gradient(90deg, #d1fae5, #a7f3d0)',
          color: '#065f46',
          margin: '2rem auto',
          padding: '1.5rem',
          borderRadius: '1rem',
          textAlign: 'center',
          maxWidth: '700px'
        }}
      >
        <strong>Tip of the Moment:</strong>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
          {healthTips[currentTip]}
        </p>
      </div>

      {/* Featured Herbs */}
      <div style={{ margin: '2rem auto', maxWidth: '900px', textAlign: 'center' }}>
        <h3 style={{ color: '#059669', marginBottom: '1rem' }}>🌿 Featured Herbs</h3>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1rem',
            padding: '1rem'
          }}
        >
          {['Tulsi', 'Neem', 'Turmeric', 'Amla', 'Ashwagandha'].map((herb) => (
            <div
              key={herb}
              style={{
                minWidth: '140px',
                background: '#ecfdf5',
                padding: '1rem',
                borderRadius: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                color: '#065f46',
                fontWeight: '600'
              }}
            >
              {herb}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <div
        className="chat-fab"
        onClick={() => navigate('/assistant')}
        title="Chat with Assistant"
      >
        💬
        <div className="badge">1</div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
