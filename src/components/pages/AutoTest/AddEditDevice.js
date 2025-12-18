import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SoftwareUpdateModal from '../../ui/SoftwareUpdateModal';
import { CameraModal, detectCamera } from '../../utils/cameraUtils';
import '../../../assets/styles/main.css';
import './styles.css';

const AddEditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState('Remote Head');
  const [serialNumber, setSerialNumber] = useState('12345');
  const [manufacturerName, setManufacturerName] = useState('Acme Corp');
  const [manufacturingCageCode, setManufacturingCageCode] = useState('CAGE123');
  // eslint-disable-next-line no-unused-vars
  const [executeDateTime, setExecuteDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [hardwarePartNumber, setHardwarePartNumber] = useState('HW-54321');
  const [manufacturingDate, setManufacturingDate] = useState('2023-01-01');
  const [modDot, setModDot] = useState('MD-67890');
  const [pmaNumber, setPmaNumber] = useState('PMA-11223');
  const [modalStep, setModalStep] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isCameraDetected, setIsCameraDetected] = useState(false);

  useEffect(() => {
    detectCamera(setIsCameraDetected);
  }, []);

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
      pmaNumber,
    });
    navigate('/auto-test');
  };

  const handleCancel = () => {
    navigate('/auto-test');
  };

  const handleUpdateClick = () => {
    setModalStep('noSoftware');
  };

  const handleModalConfirm = () => {
    setModalStep('installing');
    // Simulate installation
    setTimeout(() => {
      // setModalStep('completed');
      setModalStep('failed');
    }, 2000); // 2 seconds for demo
  };

  const handleModalCancel = () => {
    setModalStep(null);
  };

  const handleModalComplete = () => {
    setModalStep(null);
  };

  const handleCameraClick = () => {
    console.log('camera:', isCameraOpen);
    setIsCameraOpen(true);
  };

  const handleCameraCancel = () => {
    setIsCameraOpen(false);
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card card-edit-device">
          <h2 className="card-title">
            {isEditMode ? 'Edit Device' : 'Add Device'}
          </h2>

          <form className="form">
            <div className="row">
              <div className="col-md-6">
                <label className="label">
                  Hardware Part Number:
                  <input
                    className="input"
                    type="text"
                    value={hardwarePartNumber}
                    onChange={(e) => setHardwarePartNumber(e.target.value)}
                  />
                </label>
                <label className="label">
                  Serial Number:
                  <input
                    className="input"
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                </label>
                <label className="label">
                  Manufacturer's Name:
                  <input
                    className="input"
                    type="text"
                    value={manufacturerName}
                    onChange={(e) => setManufacturerName(e.target.value)}
                  />
                </label>
                <label className="label">
                  Manufacturing Cage Code:
                  <input
                    className="input"
                    type="text"
                    value={manufacturingCageCode}
                    onChange={(e) => setManufacturingCageCode(e.target.value)}
                  />
                </label>
              </div>
              <div className="col-md-6">
                <label className="label">
                  Manufacturing Date:
                  <input
                    className="input"
                    type="date"
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                  />
                </label>
                <label className="label">
                  Mod Dot:
                  <input
                    className="input"
                    type="text"
                    value={modDot}
                    onChange={(e) => setModDot(e.target.value)}
                  />
                </label>
                <label className="label">
                  PMA Number:
                  <input
                    className="input"
                    type="text"
                    value={pmaNumber}
                    onChange={(e) => setPmaNumber(e.target.value)}
                  />
                </label>
                <div className="action-btns" style={{ marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleCameraClick}
                  >
                    Camera
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginLeft: '8px' }}
                    onClick={handleUpdateClick}
                  >
                    Factory Reset
                  </button>
                </div>
              </div>
            </div>
            <div className="action-btns action-btns-save center">
              <button
                type="button"
                className="btn-primary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
      <SoftwareUpdateModal
        step={modalStep}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        onComplete={handleModalComplete}
      />
      {isCameraOpen && <CameraModal onCancel={handleCameraCancel} />}
    </div>
  );
};

export default AddEditDevice;
