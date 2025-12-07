import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaUpload, FaImage, FaTimes } from 'react-icons/fa';
import { CameraModal, detectCamera } from '../../utils/cameraUtils';
import "../../../assets/styles/main.css";
import './styles.css';

const AddEditTestSuite = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Full Kit Test');
    const [objective, setObjective] = useState('To verify all equipment are connected properly.');
    const [testSteps, setTestSteps] = useState([
        { text: 'Connect all equipment according to the diagram.', selected: true },
    ]);
    const [selectAll, setSelectAll] = useState(true);
    const [currentStep, setCurrentStep] = useState('This is the detailed step of this test. To verify all equipment are connected properly.');
    const [images, setImages] = useState([]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isCameraDetected, setIsCameraDetected] = useState(false);

    useEffect(() => {
        detectCamera(setIsCameraDetected);
    }, []);

    const handleImageUpload = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const handleDeleteImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        navigate('/manual-test');
    };

    const handleCancel = () => {
        navigate('/manual-test');
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setTestSteps(testSteps.map(step => ({ ...step, selected: checked })));
    };

    const handleStepChange = (index) => {
        const newTestSteps = [...testSteps];
        newTestSteps[index].selected = !newTestSteps[index].selected;
        setTestSteps(newTestSteps);
        setSelectAll(newTestSteps.every(step => step.selected));
    };

    const handleCameraClick = () => {
        setIsCameraOpen(true);
    };

    const handleCameraCancel = () => {
        setIsCameraOpen(false);
    };

    const handleCapture = (imageSrc) => {
        setImages((prevImages) => [...prevImages, imageSrc]);
        setIsCameraOpen(false);
    };

    return (
        <div className="add-edit-test-suite-page">
            <div className="add-edit-test-suite">
                <form className="form">

                    <div className="modal-header-test-step">Add/Edit Test Step</div>
                    <div >
                        <label className="label" htmlFor="name">
                        Name:
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                        </label>
                        <label className="label"  htmlFor="objective">
                        Objective:
                        <input
                            type="text"
                            id="objective"
                            value={objective}
                            onChange={(e) => setObjective(e.target.value)}
                            className="input custom-input"
                        />
                        </label>
                    </div>

                    <div className="form-group">
                        <div className='flex items-center mb-4'>
                            <label className='label mr-4'>Add Image (Optional)</label>
                            <button
                                type='button'
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 flex items-center'
                                onClick={handleCameraClick}
                                // disabled={!isCameraDetected}
                            >
                                <FaCamera className="mr-2" />
                                Scan Image
                            </button>
                            <button
                                type='button'
                                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center'
                                onClick={() => document.getElementById('imageUpload').click()}
                            >
                                <FaUpload className="mr-2" />
                                Upload from Gallery
                            </button>
                            <input
                                type='file'
                                id='imageUpload'
                                style={{ display: 'none' }}
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="image-gallery">
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <div key={index} className="image-placeholder">
                                        <img src={image} alt={`Preview ${index}`} className="image-preview" />
                                        <button
                                            type="button"
                                            className="delete-image-button"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="image-placeholder">
                                    <FaImage className="no-image-icon" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='label'>Detail Step (*)</label>
                        <textarea
                            value={currentStep}
                            onChange={(e) => setCurrentStep(e.target.value)}
                            className="textarea custom-textarea"
                        />
                    </div>

                    <div className="form-group">
                        <label className='label'>Test Steps</label>
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <span>Select All</span>
                        </label>
                        {testSteps.map((step, index) => (
                            <div key={index} className="test-step">
                                <input
                                    type="checkbox"
                                    checked={step.selected}
                                    onChange={() => handleStepChange(index)}
                                />
                                <span>{index + 1}</span>
                                <div className="test-step-text">{step.text}</div>
                                <div className="test-step-actions">
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-btns center">
                        <button onClick={() =>handleCancel()} className="btn-secondary">Cancel</button>
                        <button onClick={handleSave} className="btn-primary">Create/Execute</button>
                    </div>
                </form>
            </div>
            {isCameraOpen && <CameraModal onCancel={handleCameraCancel} onCapture={handleCapture} />}
        </div>
    );
};

export default AddEditTestSuite;