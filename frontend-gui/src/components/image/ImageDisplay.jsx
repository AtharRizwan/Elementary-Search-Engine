import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Assuming the image file is named "example.jpg" in the public folder
    //const imagePath = "C:\\Projects\\Elementary-Search-Engine-Haris\\Photos\\image.jpeg"
    const imagePath = process.env.PUBLIC_URL + '/Photos/image.jpeg';
    setImageSrc(imagePath);
  }, []);

  return (
    <div>
      <h2>Image Display:</h2>
      {imageSrc && <img src={imageSrc} alt="Example" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageDisplay;
