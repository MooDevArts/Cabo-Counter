import React, {useState} from 'react'

function Player(props) {
const [name, setName] = useState('');
const[points, setPoints] = useState([]);
const[point, setPoint] = useState();
const[total, setTotal] = useState(0);

const pushPoint = (event) => {
    if (event.keyCode === 13){
    let p = parseInt(event.target.value);
    let newArr = [...points];
    newArr.push(p);
    setPoints(newArr);
    let t = 0;
    for(let i = 0; i< newArr.length; i++){
        t = t+newArr[i];
    }
    setTotal(t);
    props.changeTotal(t);
    if(props.name == "Himanshu"){
    props.changeHPoints(newArr);
    }
    if(props.name == "Kalyani"){
        props.changeKPoints(newArr);
        }
    if(props.name == "Vaishnavi"){
        props.changeVPoints(newArr);
        }
              
    event.target.value = null;
}}

const deletePoint = (index) => {
    const newPoints = [...points];
    newPoints.splice(index, 1); // Remove the element at the given index
    setPoints(newPoints);

    let t = newPoints.reduce((acc, curr) => acc + curr, 0); // Recalculate total
    setTotal(t);
};

  return (
    <div id = {props.id}>
        <h2 className='text-2xl capitalize underline mt-4'> {props.name}</h2>
        <div className='mt-4'>
            {points.map((p, index) => (
                <div className='cursor-pointer' key={index} onClick={() => deletePoint(index)}>
                <p>{p}</p>
                </div>
            ))}
        </div>
        <input className='text-black mt-4 rounded border-4 border-white pl-1 focus:border-red-600' defaultValue={point} onKeyDown={pushPoint} type='number'></input>
        <h3 className='mt-2'>Total:</h3>
        
        <p className='text-yellow-200 text-3xl underline'>{total}</p>
    </div>
  )
}

export default Player