import {
  DeleteOutlined,
  LeftSquareFilled,
  RightSquareFilled,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../../css/ImagePreview.css";
import addPhoto from "../../images/add-photos.jpg"

function ImagePreview({ imageFiles, onChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const handleCarousal = (step) => {
    if (step >= 0 && step < imageFiles.length) 
      setCurrentStep(step);
  };
  const handleRemoveImage = () => {
    setCurrentStep(currentStep > 0 ? currentStep - 1 : 0);
    onChange(currentStep);
  };
  return (
    <>
      {imageFiles.length === 0 ? (
        <img
          src={addPhoto}
          alt="Selected"
          className="carousal-image"
        />
      ) : (
        <div className="carousal-container">
          <LeftSquareFilled
            className="carousal-icon"
            disabled={currentStep <= 0}
            onClick={() => handleCarousal(currentStep - 1)}
          />
          {imageFiles && (
            <div className="carousal-image-container">
              <img
                src={imageFiles[currentStep]}
                alt="Selected"
                className="carousal-image"
              />
              <DeleteOutlined
                onClick={handleRemoveImage}
                className="delete-icon"
              />
            </div>
          )}
          <RightSquareFilled
            className="carousal-icon"
            disabled={currentStep > imageFiles.length - 1}
            onClick={() => handleCarousal(currentStep + 1)}
          />
        </div>
      )}
    </>
  );
}

export default ImagePreview;
