function UrlForm({ data, setData, onSubmit }) {
  return (
    <div className='w-full md:w-[30vw] md:h-[40vh]'>
      <span className='text-2xl block mb-10 text-center'>
        Connect to web socket
      </span>
      <label
        htmlFor='wsurl'
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        Web Socket URL
      </label>
      <input
        type='url'
        value={data.wsUrl}
        id='wsurl'
        onChange={(e) => setData({ ...data, wsUrl: e.target.value })}
        aria-describedby='helper-text-explanation'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder='ws://XXX.XXX...'
      />
      <label
        htmlFor='frame-rate'
        className='block mt-4 mb-2 text-sm font-medium text-gray-900'
      >
        Frame Rate
      </label>
      <input
        type='number'
        value={data.frameRate}
        id='frame-rate'
        onChange={(e) => setData({ ...data, frameRate: e.target.value })}
        aria-describedby='helper-text-explanation'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder='22'
      />
      <div className='w-full flex justify-center items-center'>
        <button
          type='button'
          onClick={onSubmit}
          className='mt-5 outline-0 border-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none'
        >
          Connect
        </button>
      </div>
    </div>
  );
}
export default UrlForm;
