import React, {useRef, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';

const Picture = ({
  alt,
  src,
  children,
}) => {
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    imageRef.current.src = src;
  }, [src]);

  return (
    <picture>
      {children}
      <img ref={imageRef} alt={alt}/>
    </picture>
  );
};

Picture.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export {Picture};
