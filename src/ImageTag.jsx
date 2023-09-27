import { useEffect, useRef } from 'react';

function ImageTag({ bufferImage }) {
  const imageTag = useRef();
  useEffect(() => {
    if (!bufferImage.length) {
      return;
    }
    const timeout = setTimeout(() => {
      const imageBlob = bufferImage.shift();
      imageTag.current.src && URL.revokeObjectURL(imageTag.current.src);
      imageTag.current.src = URL.createObjectURL(imageBlob);
    }, 1000 / 60);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [bufferImage]);

  return (
    <>
      <img src='' ref={imageTag} />
    </>
  );
}
export default ImageTag;
