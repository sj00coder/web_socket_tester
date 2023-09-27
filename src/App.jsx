import React, { useEffect, useMemo, useRef, useState } from 'react';
import ConnectWebSocket from './ConnectWebSocket';
import UrlForm from './UrlForm';
function App() {
  const [data, setData] = useState({
    wsUrl: 'ws://49.205.176.169:8646/',
    frameRate: 30,
  });
  const [connection, setConnection] = useState(false);

  return (
    <div className='flex justify-center items-center h-[100vh] font-sans'>
      {connection ? (
        <ConnectWebSocket
          data={data}
          onDisconnect={() => setConnection(false)}
        />
      ) : (
        <UrlForm
          data={data}
          setData={setData}
          onSubmit={() => setConnection(true)}
        />
      )}
    </div>
  );
}

export default App;
