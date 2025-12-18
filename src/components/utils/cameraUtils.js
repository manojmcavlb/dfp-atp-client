import React, { useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

// eslint-disable-next-line prettier/prettier
export const CameraModal = ({ onCancel, onCapture = () => { } }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    console.log('handleCapture called');
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext('2d')
        .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL('image/png');
      console.log('Image captured:', imageSrc);

      try {
        const {
          data: { text },
        } = await Tesseract.recognize(imageSrc, 'eng');
        console.log('OCR Result:', text);
        const lines = text.split('\n');
        const extractedData = {};
        lines.forEach((line) => {
          const parts = line.split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim().toLowerCase();
            const value = parts.slice(1).join(':').trim();
            if (
              (key === 'model' || key === 'head' || key === 'body') &&
              value
            ) {
              extractedData[key] = value;
            }
          }
        });
        console.log('Extracted Data:', extractedData);
        if (Object.keys(extractedData).length > 0) {
          onCapture(imageSrc, extractedData);
        } else {
          alert('Could not extract required information. Please try again.');
        }
      } catch (error) {
        console.error('Error during OCR:', error);
        alert('An error occurred during text recognition. Please try again.');
      }
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Camera</h2>
        <p>Position the camera toward the device information area.</p>
        <div
          className="camera-view"
          style={{
            border: '1px solid #ccc',
            height: '200px',
            margin: '1rem 0',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="action-btns center">
          <button className="btn-primary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleCapture}>
            Capture
          </button>
        </div>
      </div>
    </div>
  );
};

export const detectCamera = async (callback) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some((device) => device.kind === 'videoinput');
    callback(hasCamera);
  } catch (error) {
    console.error('Error detecting camera:', error);
    callback(false);
  }
};
