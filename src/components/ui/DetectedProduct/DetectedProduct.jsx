import React from 'react';
import '../../../assets/styles/main.css';
import './styles.css';

const DetectedProduct = ({ product, handleProductChange }) => {
  return (
    <div className="detected-product">
      <label htmlFor="product-select" className="label-detected-product">
        Detected Product:
      </label>
      <select
        id="product-select"
        className="select select-detected-product"
        value={product}
        onChange={handleProductChange}
      >
        <option value="remote-head">Remote Head</option>
        <option value="iot-gateway">IoT Gateway</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default DetectedProduct;