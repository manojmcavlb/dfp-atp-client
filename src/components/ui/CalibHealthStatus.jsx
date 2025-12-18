import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { HealthStatusContext } from '../../contexts/HealthStatusContext';

const CalibHealthStatus = () => {
  const navigate = useNavigate();
  const { healthStatusColorCalib } = useContext(HealthStatusContext);

  return (
    <>
      <a href="#" onClick={() => navigate("/atp-health-status")} className="health-status-label">
        Calib. Status:
      </a>
      <FaCircle color={healthStatusColorCalib} size={20} />
    </>
  );
};

export default CalibHealthStatus;