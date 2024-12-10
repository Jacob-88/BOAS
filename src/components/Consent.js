// src/components/Consent.js
import React from 'react';

function Consent({ onAgree }) {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Terms and Consent</h2>
          <p className="card-text">
            By using this application, you acknowledge that all information you enter is confidential and should not be shared outside the organization. All data entered into this application will be stored locally on your device and will not be transmitted to company servers.
          </p>
          <p className="card-text">
            By proceeding, you agree to the processing of information within this system. You are responsible for the confidentiality of the data you enter and agree not to share it with third parties.
          </p>
          <button className="btn btn-primary" onClick={onAgree}>Agree</button>
        </div>
      </div>
    </div>
  );
}

export default Consent;