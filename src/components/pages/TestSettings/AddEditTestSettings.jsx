import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const AddEditTestSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [step, setStep] = useState('01');
  const [stepName, setStepName] = useState('Measure Resistance across 48V_OUT & 48V_RET (TB3/TB4 & TB6/TB8)');
  const [comparison, setComparison] = useState('Equal');
  const [lowLt, setLowLt] = useState('10');
  const [highLt, setHighLt] = useState('20');
  const [unit, setUnit] = useState('cm');
  const [stringLt, setStringLt] = useState('Initial');

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
        <div className="card form-card card-test-limit">
          <h2 className="card-title">{isEditMode ? 'Edit Test Limit' : 'Add Test Limit'}</h2>
          <form className="form">
            <div className="form-row">
              <div className="form-col">
                <label className="label">
                  Step ID:
                  <input className="input input-disabled" type="text" value={step} onChange={(e) => setStep(e.target.value)} disabled={isEditMode} />
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
                  String Lt:
                  <input className="input" type="text" value={stringLt} onChange={(e) => setStringLt(e.target.value)} />
                </label>
              </div>
              <div className="form-col">
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
              </div>
            </div>
            <div className="action-btns center">
              <button
                type="button"
                className="btn-primary"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditTestSettings;