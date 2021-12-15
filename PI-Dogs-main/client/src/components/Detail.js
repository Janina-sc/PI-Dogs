import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import {getDetail, getTemperament} from '../actions/index';



export default function Detail(){//ver esto de props

let {id}=useParams();
const dispatch=useDispatch();

useEffect(()=>{
    dispatch(getDetail(id), getTemperament())//para acceder al id
},[dispatch,id])
const myDog= useSelector(state=>state.detail)
//const {name, image, height_min,height_max,weight_min, weight_max, temperament, life_span_min, life_span_max} = useSelector(state=>state.detail)//el estado inicial del reducer
 
return (
    <div>
        {
         myDog?
                <div>
                    
           <h1>Me llamo{myDog.name}</h1> 
          {/* <img src={myDog.image} alt="dog"/>
            <h3>Altura mínima:{myDog.height_min} cm</h3> 
            <h3>Altura máxima:{myDog.height_max} cm</h3>   
           <h3>Peso mínimo:{myDog.weight_min} kg</h3> 
          <h3>Peso máximo:{myDog.weight_max} kg</h3>
          <h3>Temperamento:{myDog.temperament?.map(elem=>elem.name + (" "))}</h3> 
           <h3>Vida promedio mínima:{myDog.life_span_min}  años</h3> 
           <h3>Vida promedio máxima:{myDog.life_span_max}  años</h3>
            */}
        </div> 
         
            : <p>Loading...</p>  
            }       

        <Link to= '/home'>
        <button>Volver</button>
    </Link>
</div>
)
}