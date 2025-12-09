import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';

const HealthStatus = ({ healthStatus }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <a href="#" onClick={() => navigate("/health-status")} style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
        Health Status:
      </a>
      <FaCircle color={healthStatus} size={20} />
    </div>
  );
};

export default HealthStatus;