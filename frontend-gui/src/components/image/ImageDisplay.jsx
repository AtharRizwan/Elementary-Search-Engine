import React from 'react';

// Function that displays the image by taking in the source/URI of the image as a prop
const ImageDisplay = ({ imgSrc }) => { 

  // If there is an image source, display the image
  return (
    <div>
      <h2>Image Display</h2>
      {imgSrc && <img src={imgSrc} alt="Example" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageDisplay;
