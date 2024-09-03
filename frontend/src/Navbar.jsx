import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <ul className='flex gap-4'>
            <li><Link to = "/vkh">Play</Link></li>
            <li><Link to = "/history">History</Link></li>
            <li><Link to = "/">Dynamic</Link></li>
        </ul>
    </div>
  )
}

export default Navbar