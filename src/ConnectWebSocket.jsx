import { useEffect, useMemo, useState } from 'react';
import ImageTag from './ImageTag';

function ConnectWebSocket({ data, onDisconnect }) {
  const [imageQueue, setImageQueue] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [frameLoss, setFrameLoss] = useState(0);

  const ws = useMemo(() => new WebSocket(data.wsUrl), [data]);
  let bufferImages = [];
  let startBufferTime = Date.now();

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
    });

    ws.addEventListener('message', (event) => {
      const imageData = event.data;
      if (imageData instanceof Blob) {
        manageImageBuffer(imageData, Date.now());
      }
    });

    // When the WebSocket connection is closed
    ws.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.addEventListener('error', () => {
      setErrorMessage('Something Went Wrong');
    });

    return () => {
      if (ws.readyState === ws.OPEN) ws.close();
    };
  }, [data]);

  function disconnect() {
    if (ws.readyState === ws.OPEN) ws.close();
    onDisconnect();
  }

  function manageImageBuffer(imageData, timeStamp) {
    if (bufferImages.length >= data.frameRate) {
      setImageQueue([...bufferImages]);
      bufferImages = [imageData];
      setFrameLoss(100 - (timeStamp - startBufferTime) / 10);
      startBufferTime = timeStamp;
    } else {
      bufferImages.push(imageData);
    }
  }

  return errorMessage ? (
    <h2> {errorMessage}</h2>
  ) : (
    <>
      <div>
        <h1>WebSocket Image Streaming with Memory Optimization</h1>
        {ws && ws.readyState === ws.CONNECTING ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h3>Frame Loss = {Math.round(frameLoss)} %</h3>
            <div id='imageContainer'>
              <ImageTag bufferImages={imageQueue} frameRate={data.frameRate} />
            </div>
            <button
              type='button'
              onClick={disconnect}
              className='border-0 outline-0 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ConnectWebSocket;
