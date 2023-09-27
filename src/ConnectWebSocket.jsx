import React, { useEffect, useMemo, useRef, useState } from 'react';
import ImageTag from './ImageTag';

const maxImageBuffer = 40; // Limit the number of buffered images

function ConnectWebSocket({ data, onDisconnect }) {
  const [imageQueue, setImageQueue] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const ws = useMemo(() => new WebSocket(data.wsUrl), [data]);
  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
    });

    ws.addEventListener('message', (event) => {
      const data = event.data;
      if (data instanceof Blob) {
        setImageQueue((prevImageQueue) => {
          const updatedQueue = [...prevImageQueue, data];
          manageImageBuffer(updatedQueue);
          return updatedQueue;
        });
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
  function manageImageBuffer(updatedQueue) {
    if (updatedQueue.length > maxImageBuffer) {
      updatedQueue.shift();
      setImageQueue(updatedQueue);
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
            <div id='imageContainer'>
              <ImageTag bufferImage={imageQueue} />
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
