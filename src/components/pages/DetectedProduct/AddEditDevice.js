import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import './styles.css';

const AddEditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [product, setProduct] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturingCageCode, setManufacturingCageCode] = useState('');
  const [executeDateTime, setExecuteDateTime] = useState('');
  const [hardwarePartNumber, setHardwarePartNumber] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [modDot, setModDot] = useState('');
  const [pmaNumber, setPmaNumber] = useState('');

  const handleSave = () => {
    // Implement save logic here
    console.log('Save device:', { 
        product, 
        serialNumber, 
        manufacturerName, 
        manufacturingCageCode, 
        executeDateTime, 
        hardwarePartNumber,
        manufacturingDate,
        modDot,
        pmaNumber
    });
    navigate('/detected-product');
  };

  const handleCancel = () => {
    navigate('/detected-product');
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card">
          <h2 className="card-title">{isEditMode ? 'Edit Device' : 'Add Device'}</h2>
          <form className="form">
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <label className="label">
                  Product:
                  <input className="input" type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
                </label>
                <label className="label">
                  Serial Number:
                  <input className="input" type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                </label>
                <label className="label">
                  Manufacturer's Name:
                  <input className="input" type="text" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} />
                </label>
                <label className="label">
                  Manufacturing Cage Code:
                  <input className="input" type="text" value={manufacturingCageCode} onChange={(e) => setManufacturingCageCode(e.target.value)} />
                </label>
              </div>
              <div style={{ flex: 1 }}>
                <label className="label">
                  Hardware Part Number:
                  <input className="input" type="text" value={hardwarePartNumber} onChange={(e) => setHardwarePartNumber(e.target.value)} />
                </label>
                <label className="label">
                  Manufacturing Date:
                  <input className="input" type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} />
                </label>
                <label className="label">
                  Mod Dot:
                  <input className="input" type="text" value={modDot} onChange={(e) => setModDot(e.target.value)} />
                </label>
                <label className="label">
                  PMA Number:
                  <input className="input" type="text" value={pmaNumber} onChange={(e) => setPmaNumber(e.target.value)} />
                </label>
              </div>
            </div>
            <div className="row-between" style={{ marginTop: '1rem' }}>
              <button type="button" className="secondary-btn" onClick={handleCancel}>Cancel</button>
              <button type="button" className="primary-btn" onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditDevice;