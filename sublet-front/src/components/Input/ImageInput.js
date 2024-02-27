import React, { useState } from "react";

export const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      {preview && <img src={preview} alt="Image preview" />}
    </div>
  );
};
