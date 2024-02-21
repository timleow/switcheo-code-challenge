import React from 'react';

const Icon = ({ src, alt, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      height="30px"
    />
  );
};

export default Icon;
