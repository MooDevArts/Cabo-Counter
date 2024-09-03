import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2'

const LineGraph = (props) => {

const hPoints = props.hPoints;
const vPoints = props.vPoints;
const kPoints = props.kPoints;

  return (
    <div  className='w-1/2'>
        <Line  data = {{
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            datasets: [
                {
                    label: 'Hemu',
                    data: hPoints,
                    backgroundColor: 'white',
                    borderColor: 'white'
                },
                {
                    label: 'Vaish',
                    data: vPoints,
                    backgroundColor: 'red',
                    borderColor: 'red'
                },
                {
                    label: 'Kalyani',
                    data: kPoints,
                    backgroundColor: 'lightgreen',
                    borderColor: 'lightgreen'
                }
            ]
        }} />
    </div>
  )
}

export default LineGraph