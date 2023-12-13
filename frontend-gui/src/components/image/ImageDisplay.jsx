import React, { useState, useEffect } from 'react';

const ImageDisplay = ({ imgSrc }) => { 

  return (
    <div>
      <h2>Image Display</h2>
      {imgSrc && <img src={imgSrc} alt="Example" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageDisplay;
