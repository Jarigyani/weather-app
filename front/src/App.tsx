import { useState } from 'react';
import useSWR from 'swr';
import Selector from './components/Selector';
import Weather from './components/Weather';

function App() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-600 flex-wrap'>
      <Selector country='Tokyo' className='from-blue-500 to-blue-300' />
      <Selector country='London' className='from-violet-500 to-violet-300' />
      <Selector country='Paris' className='from-yellow-500 to-yellow-300' />
      <Selector country='Los Angels' className='from-gray-500 to-gray-300' />
    </div>
  );
}

export default App;
