import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Record(props) {

    const [h, setH] = useState('');
    const [v, setV] = useState('');
    const [k, setK] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const gameToAdd = {"himanshu":h,"vaishnavi": v,"kalyani": k};
        console.log(gameToAdd);
        const response = await fetch("http://localhost:8000/", {
      method: "POST",
      body: JSON.stringify(gameToAdd),
      headers: {
        "Content-type": "application/json"
      }
    })
    props.getData();
    props.showHideForm();
    }

    function updateH(e){
        setH(e.target.value);
    }

    function updateV(e){
        setV(e.target.value);
    }

    function updateK(e){
        setK(e.target.value);
    }

  return (
    <div>
        <form className='' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
    <label>Himanshu</label>
    <input onChange={updateH} className='rounded text-black max-w-40' required type="number" id="input1" name="input1" />
  </div>
  <div className='flex flex-col'>
    <label>Vaishnavi</label>
    <input onChange={updateV} className='rounded text-black max-w-40' required type="number" id="input2" name="input2" />
  </div>
  <div className='flex flex-col'>
    <label>Kalyani</label>
    <input onChange={updateK} className='rounded text-black max-w-40' required type="number" id="input3" name="input3" />
  </div>
  <button className='col-span-3 p-1 bg-red-800 hover:bg-red-950 rounded mt-2' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Record