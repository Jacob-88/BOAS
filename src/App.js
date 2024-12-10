// src/App.js
import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Consent from './components/Consent';
import './styles/main.css';
import logo from './assets/app_logo.png'; // Убедитесь, что логотип находится в src/assets

function App() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('consentGiven');
    if (consent === 'true') {
      setConsentGiven(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('consentGiven', 'true');
    setConsentGiven(true);
  };

  const handleStartObservation = () => {
    setShowForm(true);
  };

  if (!consentGiven) {
    return <Consent onAgree={handleAgree} />;
  }

  return (
    <div className="container mt-5">
      {!showForm ? (
        <div className="text-center">
          <img src={logo} alt="App Logo" className="mb-4" style={{ width: '100px', height: '100px' }} />
          <h1 className="mb-4">Observation App</h1>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleStartObservation}
          >
            Start New Observation
          </button>
        </div>
      ) : (
        <Form />
      )}
    </div>
  );
}

export default App;