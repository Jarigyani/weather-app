import { useState } from 'react';
import useSWR from 'swr';
import Selector from './components/Selector';
import Weather from './components/Weather';

function App() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-600'>
      <Selector country='Tokyo' color='blue' />
      <Selector country='London' color='violet' />
    </div>
  );
}

export default App;
