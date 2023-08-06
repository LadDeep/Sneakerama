import React from "react";

function ImagePreview({ imageFiles }) {
  return (
    <div>
      {imageFiles &&
        imageFiles.map((imageFile, index) => (
          <img
            key={index}
            src={imageFile}
            alt="Selected"
            style={{
              objectFit: "contain",
              width: "300px",
              height: "300px",
              marginTop: "10px",
            }}
          />
        ))}
    </div>
  );
}

export default ImagePreview;
