import React, { useRef, useEffect, useState } from 'react';

export const CameraModal = ({ onCancel, onCapture }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    const handleCapture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/png');
        onCapture(imageSrc);
    };

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
                    <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="action-btns center">
                    <button className="btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn-primary" onClick={handleCapture}>Capture</button>
                </div>
            </div>
        </div>
    );
};

export const detectCamera = async (callback) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    callback(hasCamera);
  } catch (error) {
    console.error('Error detecting camera:', error);
    callback(false);
  }
};