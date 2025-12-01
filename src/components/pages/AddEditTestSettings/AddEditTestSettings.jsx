import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import './styles.css';

const AddEditTestSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [step, setStep] = useState('');
  const [stepName, setStepName] = useState('');
  const [comparison, setComparison] = useState('');
  const [lowLt, setLowLt] = useState('');
  const [highLt, setHighLt] = useState('');
  const [unit, setUnit] = useState('');
  const [stringLt, setStringLt] = useState('');

  const handleSave = () => {
    // Implement save logic here
    console.log('Save test setting:', { step, stepName, comparison, lowLt, highLt, unit, stringLt });
    navigate('/test-settings');
  };

  const handleCancel = () => {
    navigate('/test-settings');
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card">
          <h2 className="card-title">{isEditMode ? 'Edit Test Setting' : 'Add Test Setting'}</h2>
          <form className="form">
            <label className="label">
              Step ID:
              <input className="input" type="text" value={step} onChange={(e) => setStep(e.target.value)} />
            </label>
            <label className="label">
              Step Name:
              <input className="input" type="text" value={stepName} onChange={(e) => setStepName(e.target.value)} />
            </label>
            <label className="label">
              Comparison:
              <input className="input" type="text" value={comparison} onChange={(e) => setComparison(e.target.value)} />
            </label>
            <label className="label">
              Low Lt:
              <input className="input" type="text" value={lowLt} onChange={(e) => setLowLt(e.target.value)} />
            </label>
            <label className="label">
              High Lt:
              <input className="input" type="text" value={highLt} onChange={(e) => setHighLt(e.target.value)} />
            </label>
            <label className="label">
              Unit:
              <input className="input" type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </label>
            <label className="label">
              String Lt:
              <input className="input" type="text" value={stringLt} onChange={(e) => setStringLt(e.target.value)} />
            </label>
            <div className="row-between">
              <button type="button" className="secondary-btn" onClick={handleCancel}>Cancel</button>
              <button type="button" className="primary-btn" onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditTestSettings;