import React, { useEffect, useState } from 'react'
import Player from './Player_v2';
import { useNavigate } from 'react-router-dom';
import LineGraph from './LineGraph';
import { Bar } from 'react-chartjs-2';

function Vkh() {

    const [totals, setTotals] = useState({vaishnavi: 0, kalyani: 0, himanshu: 0});
    const [hTotal, setHTotal] = useState(0);
    const [vTotal, setVTotal] = useState(0);
    const [kTotal, setKTotal] = useState(0);
    const [hPoints, setHPoints] = useState([]);
    const [vPoints, setVPoints] = useState([]);
    const [kPoints, setKPoints] = useState([]);
    const navigate = useNavigate();

    function changeHPoints(arr){
      setHPoints(arr);
    }

    function changeVPoints(arr){
      setVPoints(arr);
    }

    function changeKPoints(arr){
      setKPoints(arr);
    }

    function changeVTotal(value){
        setVTotal(value);
    }
    
    function changeKTotal(value){
        setKTotal(value);
    }

    function changeHTotal(value){
        setHTotal(value);
    }

    async function recordGame(){
        console.log(totals);
        const response = await fetch("http://localhost:8000/", {
            method: "POST",
            body: JSON.stringify(totals),
            headers: {
        "Content-type": "application/json"
      }
    })
    navigate('/history')
    }

    useEffect(() => {
      setTotals({
        "himanshu": hTotal,
        "vaishnavi": vTotal,
        "kalyani": kTotal
      })
    }, [hTotal, vTotal, kTotal])

    //bar graph stuff
    const data = {
      labels: ['Vaishnavi', 'Kalyani', 'Himanshu'],
      datasets: [{
        label: '',
        data: [vTotal, kTotal, hTotal],
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
    <div className='flex gap-6'>
        <Player name = {"Vaishnavi"}  changeTotal = {changeVTotal} changeVPoints = {changeVPoints}/>
        <Player name = {"Kalyani"} changeTotal = {changeKTotal} changeKPoints = {changeKPoints} />
        <Player name = {"Himanshu"} changeTotal = {changeHTotal} changeHPoints = {changeHPoints}/>
        <Bar className='max-h-60 max-w-96' data={data} options={options} />
    </div>
    <button className='mt-4 bg-red-800 hover:bg-red-950 rounded py-1 px-8 mb-8' onClick={recordGame}>Record Game</button>
    <LineGraph hPoints = {hPoints} vPoints = {vPoints} kPoints = {kPoints}/>
    </>
  )
}

export default Vkh