import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SoftwareUpdateModal from '../../ui/SoftwareUpdateModal';
import '../../../assets/styles/main.css';
import './styles.css';

const CameraModal = ({ onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Camera</h2>
        <p>Position the camera toward the device information area.</p>
        <div className="camera-view" style={{
          border: '1px solid #ccc',
          height: '200px',
          margin: '1rem 0',
          position: 'relative'
        }}>
           <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
           }}>
                <svg width="100%" height="100%" >
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
                </svg>
           </div>
        </div>
        <div className="action-btns center">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

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
  const [modalStep, setModalStep] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [noSoftwareDetected, setNoSoftwareDetected] = useState(true);

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
    navigate('/auto-test');
  };

  const handleCancel = () => {
    navigate('/auto-test');
  };

  const handleUpdateClick = () => {
    setModalStep('confirm');
  };

  const handleModalConfirm = () => {
    setModalStep('installing');
    // Simulate installation
    setTimeout(() => {
      setModalStep('completed');
    }, 2000); // 2 seconds for demo
  };

  const handleModalCancel = () => {
    setModalStep(null);
  };

  const handleModalComplete = () => {
    setModalStep(null);
  };

  const handleNoSoftwareModalConfirm = () => {
    setNoSoftwareDetected(false);
    handleModalConfirm();
  };

  const handleNoSoftwareModalCancel = () => {
    setNoSoftwareDetected(false);
  };

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handleCameraCancel = () => {
    setIsCameraOpen(false);
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
            <div className='label'>
              Software update (1.0.1) is available.
              <div className='action-btns action-btns-software' style={{ display: 'inline-block', marginLeft: '1rem' }}>
                <button type='button' className='btn-secondary' onClick={handleCameraClick}>CAMERA</button>
                <button type='button' className='btn-secondary' style={{ marginLeft: '8px' }} onClick={handleUpdateClick}>FACTORY RESET</button>
              </div>
            </div>
            <div className="action-btns action-btns-save">
              <button type="button" className="btn-secondary" onClick={handleCancel}>CANCEL</button>
              <button type="button" className="btn-primary" onClick={handleSave}>SAVE</button>
            </div>
          </form>
        </div>
      </main>
      {noSoftwareDetected ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">No Software Detected</h2>
            <p className="software-version">
              Current Device Software:<span> None Installed</span>
            </p>
            <p className="software-version">
              Latest Factory Software: <span>1.0.1</span>
            </p>
            <p className="msg-warn">
              <div>No software was detected on this device.</div>
              <div>The Factory Software is required to run the tests.</div>
            </p>
            <p>Do you want to install the factory software (1.0.1)?</p>
            <div className="action-btns center">
              <button className="btn-secondary" onClick={handleNoSoftwareModalCancel}>No</button>
              <button className="btn-primary" onClick={handleNoSoftwareModalConfirm}>Yes</button>
            </div>
          </div>
        </div>
      ) : (
        <SoftwareUpdateModal
          step={modalStep}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          onComplete={handleModalComplete}
        />
      )}
      {isCameraOpen && <CameraModal onCancel={handleCameraCancel} />}
    </div>
  );
};

export default AddEditDevice;