import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { HealthStatusContext } from '../../contexts/HealthStatusContext';

const CalibHealthStatus = () => {
  const navigate = useNavigate();
  const healthStatusColorCalib = useSelector((state) => state.healthStatus.healthStatusColorCalib);

  return (
    <>
      <a href="#" onClick={() => navigate("/calibration")} className="health-status-label">
        Calib. Status:
      </a>
      <FaCircle color={healthStatusColorCalib} size={20} />
    </>
  );
};

export default CalibHealthStatus;