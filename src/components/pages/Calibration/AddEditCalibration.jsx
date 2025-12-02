import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import './styles.css';

const AddEditCalibration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [deviceName, setDeviceName] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [calibrationDate, setCalibrationDate] = useState('');
  const [calibrationDueDate, setCalibrationDueDate] = useState('');

  const handleSave = () => {
    // Implement save logic here
    console.log('Save calibration:', { deviceName, partNumber, serialNumber, calibrationDate, calibrationDueDate });
    navigate('/calibration');
  };

  const handleCancel = () => {
    navigate('/calibration');
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card">
          <h2 className="card-title">{isEditMode ? 'Edit Calibration' : 'Add Calibration'}</h2>
          <form className="form">
            <label className="label">
              Device Name:
              <input className="input" type="text" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
            </label>
            <label className="label">
              Part Number:
              <input className="input" type="text" value={partNumber} onChange={(e) => setPartNumber(e.target.value)} />
            </label>
            <label className="label">
              Serial Number:
              <input className="input" type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            </label>
            <label className="label">
              Calibration Date:
              <input className="input" type="date" value={calibrationDate} onChange={(e) => setCalibrationDate(e.target.value)} />
            </label>
            <label className="label">
              Calibration Due Date:
              <input className="input" type="date" value={calibrationDueDate} onChange={(e) => setCalibrationDueDate(e.target.value)} />
            </label>
            <div className="action-btns">
              <button type="button" className="btn-secondary" onClick={handleCancel}>Cancel</button>
              <button type="button" className="btn-primary" onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditCalibration;