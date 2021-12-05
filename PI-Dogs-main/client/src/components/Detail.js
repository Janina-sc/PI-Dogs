import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import {getDetail} from '../actions/index';



export default function Detail(props){

let {id}=useParams();
const dispatch=useDispatch();

useEffect(()=>{
    dispatch(getDetail(id))//para acceder al id
},[dispatch,id])
const myDog=useSelector((state)=>state.detail)//el estado inicial del reducer
// console.log(detail)
return (
    <div>
        {
        
        myDog?

        
        <div>
             <h1>Me llamo{myDog.name}</h1> {/*muestra el name en index 3 del array */}
          {/* <image src={myDog.image}/>
           <h3>Altura máxima:{myDog.height_max.metric} cm</h3>  */}
          {/* <h3>Altura mínima:{myDog.height_min.metric} cm</h3>
          <h3>Peso máximo:{myDog.weight_max.metric} kg</h3>
          <h3>Peso mínimo:{myDog.weight_min.metric} kg</h3>
          <h3>Temperamento:{myDog.temperament.map(elem=>elem.name + (" "))}</h3> */} 
          {/* <h3>Vida promedio{myDog.life_span}</h3> */}

        </div> : <p>Loading...</p>
        
}

    <Link to= '/home'>
        <button>Volver</button>
    </Link>

    </div>
)
}