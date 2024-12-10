// src/components/Form.js
import React, { useState, useEffect } from 'react';
import ReportGenerator from './ReportGenerator';

const initialData = {
  date: new Date().toISOString().slice(0,10),
  taskObserved: '',
  observerNumber: '', // Будет инициализироваться отдельно
  coachNumber: '',
  peopleObserved: '',
  employeeType: '',
  department: '',
  location: '',
  timeOfDay: '',
  weather: '',
  categories: {
    lineOfFire: {
      safe: false,
      risk: false
    },
    pinchPoints: {
      safe: false,
      risk: false
    },
    liftingAndLowering: {
      safe: false,
      risk: false
    },
    assistance: {
      safe: false,
      risk: false
    }
  },
  comments: ''
};

const employeeOptions = ['Dragon Oil Employee', 'Contractor', 'Visitor'];
const departmentOptions = ['Production', 'Maintenance', 'Construction', 'Drilling', 'Logistics'];
const locationOptions = ['Inside', 'Outside'];
const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
const weatherOptions = ['Dry', 'Wet', 'Hot', 'Cold', 'Windy', 'Icy'];

function Form() {
  const [formData, setFormData] = useState(initialData);
  const [showPDF, setShowPDF] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    bodyPosition: false,
    bodyUseErgonomics: false
  });

  useEffect(() => {
    const savedData = localStorage.getItem('observationData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      // Инициализация observerNumber при первом открытии формы
      let observerNumber = localStorage.getItem('observerNumber');
      if (!observerNumber) {
        observerNumber = 1;
      } else {
        observerNumber = parseInt(observerNumber) + 1;
      }
      localStorage.setItem('observerNumber', observerNumber);
      setFormData({ ...initialData, observerNumber: observerNumber.toString() });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem('observationData', JSON.stringify(updated));
  };

  const handleCheckboxChange = (category, type) => {
    const updated = { 
      ...formData, 
      categories: { 
        ...formData.categories, 
        [category]: { 
          ...formData.categories[category], 
          [type]: !formData.categories[category][type] 
        }
      }
    };
    setFormData(updated);
    localStorage.setItem('observationData', JSON.stringify(updated));
  };

  const handleGenerateReport = () => {
    setShowPDF(true);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const resetForm = () => {
    // Увеличение observerNumber
    let observerNumber = localStorage.getItem('observerNumber');
    if (!observerNumber) {
      observerNumber = 1;
    } else {
      observerNumber = parseInt(observerNumber) + 1;
    }
    localStorage.setItem('observerNumber', observerNumber);

    // Сброс формы
    const newFormData = { ...initialData, observerNumber: observerNumber.toString() };
    setFormData(newFormData);
    localStorage.setItem('observationData', JSON.stringify(newFormData));
    setShowPDF(false);
  };

  if (showPDF) {
    return <ReportGenerator data={formData} onReportGenerated={resetForm} />;
  }

  return (
    <div className="mt-4">
      <h2>New Observation</h2>
      <form>
        {/* Date */}
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input 
            className="form-control" 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange}
          />
        </div>

        {/* Task Observed */}
        <div className="mb-3">
          <label className="form-label">Task Observed:</label>
          <input 
            className="form-control" 
            type="text" 
            name="taskObserved" 
            value={formData.taskObserved} 
            onChange={handleChange}
          />
        </div>

        {/* Observer Number */}
        <div className="mb-3">
          <label className="form-label">Observer Number:</label>
          <input 
            className="form-control" 
            type="number" 
            name="observerNumber" 
            value={formData.observerNumber} 
            onChange={handleChange}
          />
        </div>

        {/* Coach Number */}
        <div className="mb-3">
          <label className="form-label">Coach Number:</label>
          <input 
            className="form-control" 
            type="number" 
            name="coachNumber" 
            value={formData.coachNumber} 
            onChange={handleChange}
          />
        </div>

        {/* No. of People Observed */}
        <div className="mb-3">
          <label className="form-label">No. of People Observed:</label>
          <input 
            className="form-control" 
            type="number" 
            name="peopleObserved" 
            value={formData.peopleObserved} 
            onChange={handleChange}
          />
        </div>

        {/* Employee Type */}
        <div className="mb-3">
          <label className="form-label">Employee Type:</label>
          <select 
            className="form-select" 
            name="employeeType" 
            value={formData.employeeType} 
            onChange={handleChange}
          >
            <option value="">Select</option>
            {employeeOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select 
            className="form-select" 
            name="department" 
            value={formData.department} 
            onChange={handleChange}
          >
            <option value="">Select</option>
            {departmentOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <select 
            className="form-select" 
            name="location" 
            value={formData.location} 
            onChange={handleChange}
          >
            <option value="">Select</option>
            {locationOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Time of Day */}
        <div className="mb-3">
          <label className="form-label">Time of Day:</label>
          <select 
            className="form-select" 
            name="timeOfDay" 
            value={formData.timeOfDay} 
            onChange={handleChange}
          >
            <option value="">Select</option>
            {timeOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Weather Conditions */}
        <div className="mb-3">
          <label className="form-label">Weather Conditions:</label>
          <select 
            className="form-select" 
            name="weather" 
            value={formData.weather} 
            onChange={handleChange}
          >
            <option value="">Select</option>
            {weatherOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <h3>Observation Categories</h3>

        {/* 1. Body Position */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label">1. Body Position:</label>
            <button 
              type="button" 
              className="btn btn-link" 
              onClick={() => toggleCategory('bodyPosition')}
            >
              {expandedCategories.bodyPosition ? 'Hide' : 'Show'}
            </button>
          </div>
          {/* Subcategories */}
          {expandedCategories.bodyPosition && (
            <div className="ms-3">
              <div className="mb-2">
                <label className="form-label">1.1 Line of Fire</label>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="lineOfFireSafe" 
                    checked={formData.categories.lineOfFire.safe}
                    onChange={() => handleCheckboxChange('lineOfFire', 'safe')}
                  />
                  <label className="form-check-label" htmlFor="lineOfFireSafe">Safe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="lineOfFireRisk" 
                    checked={formData.categories.lineOfFire.risk}
                    onChange={() => handleCheckboxChange('lineOfFire', 'risk')}
                  />
                  <label className="form-check-label" htmlFor="lineOfFireRisk">Risk</label>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">1.2 Pinch Points</label>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="pinchPointsSafe" 
                    checked={formData.categories.pinchPoints.safe}
                    onChange={() => handleCheckboxChange('pinchPoints', 'safe')}
                  />
                  <label className="form-check-label" htmlFor="pinchPointsSafe">Safe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="pinchPointsRisk" 
                    checked={formData.categories.pinchPoints.risk}
                    onChange={() => handleCheckboxChange('pinchPoints', 'risk')}
                  />
                  <label className="form-check-label" htmlFor="pinchPointsRisk">Risk</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Body Use/Ergonomics */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label">2. Body Use/Ergonomics:</label>
            <button 
              type="button" 
              className="btn btn-link" 
              onClick={() => toggleCategory('bodyUseErgonomics')}
            >
              {expandedCategories.bodyUseErgonomics ? 'Hide' : 'Show'}
            </button>
          </div>
          {/* Subcategories */}
          {expandedCategories.bodyUseErgonomics && (
            <div className="ms-3">
              <div className="mb-2">
                <label className="form-label">2.1 Lifting and Lowering</label>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="liftingSafe" 
                    checked={formData.categories.liftingAndLowering.safe}
                    onChange={() => handleCheckboxChange('liftingAndLowering', 'safe')}
                  />
                  <label className="form-check-label" htmlFor="liftingSafe">Safe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="liftingRisk" 
                    checked={formData.categories.liftingAndLowering.risk}
                    onChange={() => handleCheckboxChange('liftingAndLowering', 'risk')}
                  />
                  <label className="form-check-label" htmlFor="liftingRisk">Risk</label>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">2.2 Assistance</label>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="assistanceSafe" 
                    checked={formData.categories.assistance.safe}
                    onChange={() => handleCheckboxChange('assistance', 'safe')}
                  />
                  <label className="form-check-label" htmlFor="assistanceSafe">Safe</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="assistanceRisk" 
                    checked={formData.categories.assistance.risk}
                    onChange={() => handleCheckboxChange('assistance', 'risk')}
                  />
                  <label className="form-check-label" htmlFor="assistanceRisk">Risk</label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="mb-3">
          <label className="form-label">Comments:</label>
          <textarea 
            className="form-control" 
            name="comments" 
            value={formData.comments} 
            onChange={handleChange} 
            rows="3"
          ></textarea>
        </div>

        <button 
          type="button" 
          className="btn btn-success" 
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </form>
    </div>
  );
}

export default Form;