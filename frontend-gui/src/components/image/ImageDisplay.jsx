import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => { 
    const imagePath = process.env.PUBLIC_URL + '/Photos/image.jpeg'; 
    setImageSrc(imagePath);
  }, []);

  return (
    <div>
      <h2>Image Display</h2>
      {imageSrc && <img src={imageSrc} alt="Example" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageDisplay;
