import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import {getDetail} from '../actions/index';
import styles from './Detail.css'





export default function Detail(){//ver esto de props, y con el useState?para manejarlo por estados locales

const {id}=useParams();
const dispatch=useDispatch();
const myDog= useSelector((state)=>state.detail[0])//la parte del estado inicial del reducer que queremos traer

useEffect(()=>{//para que se actualice cuando haga los cambios(https://www.youtube.com/watch?v=6lvI-gTF_X8)
    dispatch(getDetail(id))//para acceder al id
},[id, dispatch]);
 


 //console.log(myDog[0])
return (
    <div className='container'>
    {
         myDog?
                <div className='dog'>
                    <h3> {myDog.name}</h3>
                     
                    <img  class="detail-image" src={myDog.image} alt="dog" />
                     
                    <h5>Altura mínima:{myDog.height_min && myDog.height_min} cm</h5>
                    <h5>Altura máxima:{myDog.height_max && myDog.height_max } cm</h5>
                    <h5>Peso mínimo:{myDog.weight_min && myDog.weight_min  } kg</h5>
                    <h5>Peso máximo:{myDog.weight_max && myDog.weight_max } kg</h5>
                    <h5>Temperamento:{myDog.temperament.join(", ")} </h5>
                    <h5>Vida promedio mínima:{myDog.life_span_min} años</h5>
                    <h5>Vida promedio máxima:{myDog.life_span_max.slice(0,2)} años</h5>
                </div>
                    :<p>Loading...</p> 
          }
          <div className='detail-link'>
        <Link to= '/home'>
        <button>Volver</button>
    </Link>
    </div>
</div>
)
}