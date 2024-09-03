import React from 'react'
import Game from './Game'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Record from './Record';
import Navbar from './Navbar';
import History from './History';
import Vkh from './Vkh';

function App() {
  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white p-4'>

      <h1 className='text-3xl'>Cabo Counter</h1>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path='/' element = {<Game />} />
          <Route exact path='/history' element = {<History />} />
          <Route exact path='/vkh' element = {<Vkh />} />
        </Routes>
      </BrowserRouter>
      
      </div>
  )
}

export default App