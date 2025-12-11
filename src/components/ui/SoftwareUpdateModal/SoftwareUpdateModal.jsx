import React from 'react';
import './styles.css';

const SoftwareUpdateModal = ({ step, onConfirm, onCancel, onComplete }) => {
  if (step === null) {
    return null;
  }

  const renderStepContent = () => {
    switch (step) {
      case 'confirm':
        return (
          <>
            <h2 className="modal-title">Software Update</h2>
            <p className="software-version">
              Current Device Software:<span> 1.0.0</span>
            </p>
            <p className="software-version">
              Latest Factory Software: <span>1.0.1</span>
            </p>
            <p className="msg-success">Software update is available.</p>
            <p>Do you want to update the factory software (1.0.1)?</p>
            <div className="action-btns center">
              <button className="btn-primary" onClick={onCancel}>No</button>
              <button className="btn-primary" onClick={onConfirm}>Yes</button>
            </div>
          </>
        );
      case 'noSoftware':
        return (
          <>
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
              <button className="btn-primary" onClick={onCancel}>No</button>
              <button className="btn-primary" onClick={onConfirm}>Yes</button>
            </div>
          </>
        );
      case 'installing':
        return (
          <>
            <h2 className="modal-title">Software Update</h2>
            <p>Installing... 90%</p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '90%' }}></div>
            </div>
          </>
        );
      case 'completed':
        return (
          <>
            <h2 className="modal-title">Software Update</h2>
            <p>Software update completed.</p>
            <p>Please power cycle the device.</p>
            <div className="action-btns center">
              <button className="btn-primary" onClick={onComplete}>OK</button>
            </div>
          </>
        );
      case 'failed':
        return (
          <>
            <h2 className="modal-title">Software Update</h2>
            <p className="msg-error">Software update failed.</p>
            <p>Do you want to try the software update again?</p>
            <div className="action-btns center">
              <button className="btn-primary" onClick={onCancel}>No</button>
              <button className="btn-primary" onClick={onConfirm}>Yes</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-software-update">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SoftwareUpdateModal;