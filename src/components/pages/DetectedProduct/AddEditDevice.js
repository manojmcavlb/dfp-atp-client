import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import './styles.css';

const AddEditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const [product, setProduct] = useState('Remote Head');
  const [serialNumber, setSerialNumber] = useState('12345');
  const [manufacturerName, setManufacturerName] = useState('Acme Corp');
  const [manufacturingCageCode, setManufacturingCageCode] = useState('CAGE123');
  const [executeDateTime, setExecuteDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [hardwarePartNumber, setHardwarePartNumber] = useState('HW-54321');
  const [manufacturingDate, setManufacturingDate] = useState('2023-01-01');
  const [modDot, setModDot] = useState('MD-67890');
  const [pmaNumber, setPmaNumber] = useState('PMA-11223');

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
            <div >
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
            <div className="action-btns">
              <button type="button" className="btn-secondary" onClick={handleCancel}>CANCEL</button>
              <button type="button" className="btn-primary" onClick={handleSave}>SAVE</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditDevice;