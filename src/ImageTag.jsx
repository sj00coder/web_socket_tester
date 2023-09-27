import { useEffect, useRef, memo } from 'react';

const ImageTag = memo(function ImageTag({ bufferImages, frameRate }) {
  const imageTag = useRef();
  
  useEffect(() => {
    if (!bufferImages.length) {
      return;
    }
    const interval = setInterval(() => {
      const imageBlob = bufferImages.shift();
      imageTag.current.src && URL.revokeObjectURL(imageTag.current.src);
      imageTag.current.src = URL.createObjectURL(imageBlob);
    }, 1000 / frameRate);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bufferImages]);

  return (
    <>
      <img src='' ref={imageTag} />
    </>
  );
});
export default ImageTag;
