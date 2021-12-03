import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";

import {getTemperament, postDog} from '../actions/index'

function validate(input){
    let errors={};
    if(!input.name){
        errors.name= "Es requerido un nombre de Perro";

    } else if(!input.height_min ||!input.height_min===Number){
        errors.height_min="Es requerida una altura mínima";
    }
 else if(!input.height_max||!input.height_max===Number){
    errors.height_max="Es requerida una altura máxima";
}
else if(!input.weight_min||!input.weight_min===Number){
    errors.weight_min="Es requerido un peso mínimo";
}
else if(!input.weight_max||!input.weight_max===Number){
    errors.weight_max="Es requerido un peso máximo";
}
else if(!input.life_span||!input.life_span===Number){
    errors.life_span="Es requerida vida promedio";
}

return errors;
}

export default function DogCreate(){
    const dispatch=useDispatch();
   
    const temperament= useSelector((state)=> state.temperament)//traigo el estado
    const [errors, setErrors]=useState({});
    const [input, setInput]=useState({ //para guardar lo del form
    name:"",
    height_min:"",
    height_max:"",
    weight_min:"",
    weight_max:"",
    life_span:"",
    temperament:[]//para agregar uno o más de uno

  })

  function handleDelete(elem){
      setInput({
          ...input,
          temperament:input.temperament.filter(temperament=>temperament !==elem)
      })
  }

  function handleChange(e){// al estado input se le agrega lo que se está modificando
      setInput({
          ...input,
          [e.target.name]:e.target.value
        })
          setErrors( validate({
            ...input,
            [e.target.name]:e.target.value
        
      }))
    }
    

    function handleSelect(e){
        setInput({
            ...input,
            temperament:[...input.temperament, e.target.value]//concatena en el array lo que vaya guardando
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        setErrors(validate(
        {
            ...input,
            [e.target.value.name]:e.target.value
        }
        ));
        dispatch(postDog(input))
        alert("Perro exitosamente creado")
        setInput({
            name:"",
            height_min:"",
            height_max:"",
            weight_min:"",
            weight_max:"",
            life_span:"",
            temperament:[]

        })
       
    }

  useEffect(() => {
      dispatch(getTemperament())
      }, []);
      return(
          <div>
              <Link to='/home'><button>Volver</button></Link>
            <h1>Creá un perro</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type="text"
                    value={input.name}
                    name="name">
                        onChange={(e)=>handleChange(e)}
                      </input>
                      {errors.name &&(
                      <p >{errors.name}</p>)}
                </div>
                <div>
                    <label>Altura mínima:</label>
                    <input
                    type="number"
                    value={input.height_min}
                    name="alturamin">
                        onChange={(e)=>handleChange(e)}
                    </input>
                    {errors.height_min &&(
                        <p>{errors.height_min}</p>
                    )}
                </div>
                <div>
                <label>Altura máxima:</label>
                    <input
                    type="number"
                    value={input.height_max}
                    name="alturamax">
                        onChange={(e)=>handleChange(e)}
                    </input>
                    {errors.height_max &&(
                        <p>{errors.height_max}</p>
                    )}
                </div>
                <div>
                <label>Peso mínimo:</label>
                    <input
                    type="number"
                    value={input.weight_min}
                    name="pesomin">
                        onChange={(e)=>handleChange(e)}
                    </input>
                    {errors.weight_min &&(
                        <p>{errors.weight_min}</p>
                    )}
                </div>

                <div>
                <label>Peso máximo:</label>
                    <input
                    type="number"
                    value={input.weight_max}
                    name="pesomax">
                        onChange={(e)=>handleChange(e)}
                    </input>
                    {errors.weight_min &&(
                        <p>{errors.weight_min}</p>
                    )}
                </div>

                <div>
                <label>Expectativa de vida:</label>
                    <input
                    type="text"
                    value={input.life_span}
                    name="life_span">
                        onChange={(e)=>handleChange(e)}
                    </input>
                    {errors.life_span &&(
                        <p>{errors.life_span}</p>
                    )}
                </div>
                <div>
                <select onChange={(e)=> handleSelect(e)}
                >
                    
                        {temperament.map(temperament=>(
                            <option value={temperament.name}>{temperament.name}</option>
                        ))}
                    
                </select >
                <ul><li>{input.temperament.map(elem=>elem + ",")}</li></ul>
                <button type="submit">Crear perro</button>
                </div>

            </form>
            {input.temperament.map(elem=>
                <div>
                    <p>{elem}</p>
                    <button handleDelete={(e)=> handleDelete(e)}>X</button>
                    </div>)}
          </div>
      )
    }
