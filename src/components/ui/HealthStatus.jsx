import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { HealthStatusContext } from '../../contexts/HealthStatusContext';

const HealthStatus = () => {
  const navigate = useNavigate();
  const healthStatusColorAtp = useSelector((state) => state.healthStatus.healthStatusColorAtp);

  return (
    <>
      <a href="#" onClick={() => navigate("/health-status")} className="health-status-label">
        Health Status:
      </a>
      <FaCircle color={healthStatusColorAtp} size={20} />
    </>
  );
};

export default HealthStatus;