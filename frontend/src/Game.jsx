import React, {useState} from 'react'
import Player from './Player';

function Game() {
        // Initialize state to store the value of the input
        const [players, setPlayers] = useState();
        const[pArray, setpArray] = useState([]);
      
        // Function to handle changes in the input
        const handleInputChange = (event) => {
            if (event.keyCode === 13){
          let p = parseInt(event.target.value);
          setPlayers(p);
          let newArray = [];
            for (let i = 0; i < p; i++) {
            // Create objects with IDs starting from 0 up to players - 1
            newArray.push({ id: i+1 });
        }
        // Update pArray state with the new array of objects
        setpArray(newArray);
    }

        }

  return (
    <div className='mt-4'>
        <h2>No. of Players?</h2>
        <input className='text-black rounded border-4 border-white pl-1 focus:border-red-600 ' type='number' defaultValue={players} onKeyDown={handleInputChange}></input>
        <p className='mt-4'>{players} Players</p>
        <p>Their names please:</p>
        <div className='flex gap-6'>
            {pArray.map(p => (
                <Player id = {p.id} key = {p.id}/>
            ))}
        </div>
    </div>
  )
}

export default Game