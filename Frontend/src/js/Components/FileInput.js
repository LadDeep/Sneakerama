import React from "react";

const FileInput = ({ name, multiple, onChange }) => {
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const base64Images = [];
    const readers = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);

      const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      try {
        const base64String = await readFileAsync(files[i]);
        base64Images.push(base64String);
        console.log(base64Images);
      } catch (error) {
        console.error(error);
      }
    }

    onChange( base64Images );
    event.target.value = ""
  };

  return (
    <input
      type="file"
      name={name}
      multiple={multiple}
      accept="image/*"
      onChange={handleFileChange}
    />
  );
};

export default FileInput;
