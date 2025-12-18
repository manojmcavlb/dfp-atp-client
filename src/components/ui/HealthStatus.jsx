import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { HealthStatusContext } from '../../contexts/HealthStatusContext';

const HealthStatus = () => {
  const navigate = useNavigate();
  const { healthStatusColorAtp } = useContext(HealthStatusContext);

  return (
    <>
      <a href="#" onClick={() => navigate("/atp-health-status")} className="health-status-label">
        Health Status:
      </a>
      <FaCircle color={healthStatusColorAtp} size={20} />
    </>
  );
};

export default HealthStatus;