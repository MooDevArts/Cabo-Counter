import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Record from './Record'
import { Bar } from 'react-chartjs-2';

function History() {

    const [games, setGames] = useState();
    const [form, setForm] = useState(false);
    const [sessions, setSessions] = useState({});

    function showHideForm(){
      setForm(!form);
    }

    async function recordSession(){
      const name = await findLowestScorer(totalPoints);
      const response = await fetch(`http://localhost:8000/record-session/${name}`);
      console.log(sessions);
      getData();
    }

    async function findLowestScorer(totalPoints) {
      const names = ["himanshu", "vaishnavi", "kalyani"];
      const scores = {};
    
      // Call totalPoints for each name asynchronously
      for (const name of names) {
        scores[name] = await totalPoints(name);
      }
    
      // Find the name with the lowest score
      let lowestScore = Infinity; // Initialize with positive infinity
      let lowestScorer;
    
      for (const name in scores) {
        if (scores[name] < lowestScore) {
          lowestScore = scores[name];
          lowestScorer = name;
        }
      }
    
      // Return the name of the lowest scorer
      return lowestScorer;
    
    }

    async function getData(){
        const response = await fetch('http://localhost:8000/', {
            method: "GET"
        })
        const result = await response.json();
        const sessionData = await fetch('http://localhost:8000/sessions');
        const sessionResult = await sessionData.json();
        setSessions(sessionResult[0]);
        setGames(result);
    }

    async function deleteGame(id){
      const lol = prompt("delete? Yes / No")
      console.log(lol);
        if(lol === "yes" || lol === "Yes"){
        const response = await fetch(`http://localhost:8000/${id}`, {
            method: "DELETE"
        });
        getData();
        }
    }

    useEffect(() => {
    getData();
  }, []);


  function totalPoints(propertyName) {
    if (!games) return 0;

    // Initialize sum to 0
    let sum = 0;
    let temp = games;
  
    // Iterate through each object in the array
    for (let i = 0; i < temp.length; i++) {
      // Check if the current object has the specified property
      if (temp[i].hasOwnProperty(propertyName)) {
        // Add the value of the property to the sum
        sum += temp[i][propertyName];
      }
    }
  
    // Return the total sum
    return sum;
  }

  //bar graph stuff
  const data = {
    labels: ['Vaishnavi', 'Kalyani', 'Himanshu'],
    datasets: [{
      label: 'Points',
      data: [totalPoints("vaishnavi"), totalPoints("kalyani"), totalPoints("himanshu")],
      backgroundColor: ['red', 'lightgreen', 'white'],
    }]
  };

  const options = {
    indexAxis: 'y', // Set the y-axis as the index axis for horizontal bars
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          color: 'white'
        }
      },
      y: {
        ticks:{
        color: ['red', 'lightgreen', 'white']
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Disable the legend to hide all labels
      }
    }
  };

  return (
    <>
    <div className='grid grid-cols-2'>
      <div className='min-w-96'>
        <div className='grid grid-cols-3 gap-2 mt-4'>
            <p className='text-2xl text-yellow-300'>Himanshu</p>
            <p className='text-2xl text-yellow-300'>Vaishnavi</p>
            <p className='text-2xl text-yellow-300'>Kalyani</p>
        </div>
        {games?.map((game) => (
            <div key ={game._id} className='grid grid-cols-3 gap-2 hover:bg-red-950' onClick={() => deleteGame(game._id)}>
            <div>{game.himanshu}</div>
            <div>{game.vaishnavi}</div>
            <div>{game.kalyani}</div>
            </div>
            ))}
            <div className='grid grid-cols-3 gap-2 mt-4'>
            <div className='text-2xl text-yellow-300 underline'>{totalPoints("himanshu")}</div>
            <div className='text-2xl text-yellow-300 underline'>{totalPoints("vaishnavi")}</div>
            <div className='text-2xl text-yellow-300 underline'>{totalPoints("kalyani")}</div>
            </div>
            
        </div>
        <div><Bar className='max-h-60 mr-44' data={data} options={options} /></div>
      </div>
    <button onClick={recordSession} className='bg-red-800 hover:bg-red-950 rounded py-1 px-8 mt-4'>Record Session</button>
    <h2 className='mt-4 text-4xl'>Total wins:</h2>
    <div className='grid grid-cols-2'>
    <div className=' grid grid-cols-3 gap-2 hover:bg-red-950'>
            <div className='text-2xl text-yellow-300 underline'>{sessions.himanshu}</div>
            <div className='text-2xl text-yellow-300 underline'>{sessions.vaishnavi}</div>
            <div className='text-2xl text-yellow-300 underline'>{sessions.kalyani}</div>
            </div></div>
    <h2  className = 'mt-4'>Record a game played offline?</h2><button onClick={showHideForm} className='bg-red-800 hover:bg-red-950 rounded py-1 px-8 mt-1'>Click Here</button>
    {form && <Record getData = {getData} showHideForm = {showHideForm}/>}
    </>
  )
}

export default History