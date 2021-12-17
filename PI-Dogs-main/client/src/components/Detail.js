import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import {getDetail, getTemperament} from '../actions/index';




export default function Detail(){//ver esto de props, y con el useState?para manejarlo por estados locales

const {id}=useParams();
const dispatch=useDispatch();
const myDog= useSelector((state)=>state.detail)//la parte del estado inicial del reducer que queremos traer
console.log(myDog)
useEffect(()=>{//para que se actualice cuando haga los cambios(https://www.youtube.com/watch?v=6lvI-gTF_X8)
    dispatch(getDetail(id))//para acceder al id
},[id, dispatch])

 
return (
    <div>
        
        {
         myDog && myDog.map(myDog=>(
                 <div>
                     <h3>Me llamo {myDog.name}</h3>
                     <img src={myDog.image} alt="dog" />
                     <h3>Altura mínima:{myDog.height_min} cm</h3>
                     <h3>Altura máxima:{myDog.height_max} cm</h3>
                     <h3>Peso mínimo:{myDog.weight_min} kg</h3>
                     <h3>Peso máximo:{myDog.weight_max} kg</h3>
                     <h3>Temperamento:{myDog.temperament?.map(elem => elem.temperament + (" "))}</h3>
                     <h3>Vida promedio mínima:{myDog.life_span_min}  años</h3>
                     <h3>Vida promedio máxima:{myDog.life_span_max}  años</h3>
                     key={myDog.id}

                 </div>
             )
            )   
        }
        <Link to= '/home'>
        <button>Volver</button>
    </Link>
</div>
)
}