import { useRef, useEffect } from 'react';

const VideoPlayer = ({ blobData }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (blobData) {
      const blobUrl = URL.createObjectURL(blobData);
      videoRef.current.src = blobUrl;
    }
  }, [blobData]);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
