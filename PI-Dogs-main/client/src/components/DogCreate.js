import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { postDog} from '../actions'


function validate(input){
    let errors={};
    
    if((!input.name) && (!input.name.length >3 || !input.name.length < 80)){
        errors.name= "Es requerido un nombre de Perro que contenga entre 3 y 80 letras"
        }
   
else if((!input.height_min) &&(!input.height_min===Number)){
        errors.height_min="Es requerida una altura mínima";
    }
    else if((!input.height_max)&&(!input.height_max===Number)){
    errors.height_max="Es requerida una altura máxima";
}
else if(!input.weight_min && !input.weight_min===Number){
    errors.weight_min="Es requerido un peso mínimo";
}
else if(!input.weight_max && !input.weight_max===Number){
    errors.weight_max="Es requerido un peso máximo";
}
else if(!input.life_span_min && !input.life_span_min===Number ){
errors.life_span_min="Es requerido un valor mínimo ";
    
} else if(!input.life_span_max && !input.life_span_max===Number ){
    errors.life_span_max="Es requerido un valor máximo ";
}

return errors;
}
export default function DogCreate(){
    const dispatch=useDispatch();
  //const navigate=useNavigate()
   
    const temperament= useSelector((state)=> state.temperament)//traigo el estado
    const [errors, setErrors]=useState({});
    const [input, setInput]=useState({ //para guardar lo del form en un estado
    name:"",
    height_min:"",
    height_max:"",
    weight_min:"",
    weight_max:"",
    life_span_min:"",
    life_span_max:"",
    createdInDb:true,
    temperament:[]//para agregar uno o más de uno

  })

  function handleDelete(elem){
      setInput({
          ...input,
          temperament:input.temperament.filter((temperament)=>temperament !==elem)
      })
  }

  function handleChange(event){// al estado input se le agrega lo que se está modificando
    //console.log("funciona")
      setInput({
          ...input,
          [event.target.name]:event.target.value
        })
          setErrors( validate({
            ...input,
            [event.target.name]:event.target.value
            
        
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
        setErrors(validate({
            ...input,
            [e.target.value]:e.target.value
        }
        ));
        dispatch(postDog(input))
        alert("Perro exitosamente agregado")
        setInput({
            name:"",
            height_min:"",
            height_max:"",
            weight_min:"",
            weight_max:"",
            life_span_min:"",
            life_span_max:"",
            createdInDb:true,
            temperament:[]

        })
        //navigate.push('/home')
       
    }

  useEffect(() => {
      dispatch(postDog())
      }, [dispatch]);

      return(
          <div>
        <Link to= '/home'><button>Volver</button></Link>
        <h2>Formulario de adición de nueva raza</h2>
        
        <div>
        <form onSubmit={handleSubmit}>
        
        <div>
                    <label >Raza:</label>
                    <input 
                    key="name" 
                    type="text" 
                    placeholder="Escribe el nombre de la nueva raza..."
                    value={input.name} 
                    name="name" 
                    required
                    onChange={handleChange}>
                   </input>
                   {  errors.name &&     (
                       <p>{errors.name}</p>
                   )}
                      </div>


                     <div>
                      <label>Altura mínima(cm.):</label>
                      <input 
                      id="alturamin" 
                      type="number"  
                      placeholder="Coloca la altura mínima..."
                      value={input.height_min}
                      name="height_min" 
                      required
                      onChange={handleChange}>
                          </input>
                         {errors.height_min && (
                          <p>{errors.height_min}</p>
                      )} 
                      
                      </div>
                      <div>
                      <label>Altura máxima(cm.):</label>
                      <input key="alturamax" type="number"
                      placeholder="Coloca la altura máxima..."
                      value={input.height_max}
                      name="height_max"
                      required
                      onChange={handleChange}/> 
                      
                      
                      {errors.height_max && (
                          <p>{errors.height_max}</p>
                      )}
                      </div>

                      <div>
                      <label>Peso mínimo(kg.):</label>
                      <input key="pesomin" type="number" min="0"
                      placeholder="Coloca el peso mínimo..."
                      value={input.weight_min}
                      name="weight_min"
                      required 
                      onChange={handleChange}/>
                      {errors.weight_min && (
                          <p>{errors.weight_min}</p>
                      )}
                      </div>
                      <div>
                      <label>Peso máximo(kg.):</label>
                      <input key="pesomax" type="number"
                      placeholder="Coloca el peso máximo..."
                      value={input.weight_max}
                      name="weight_max"
                      required 
                      onChange={handleChange}/>
                      {errors.weight_max && (
                          <p>{errors.weight_max}</p>
                      )}
                      </div>

                      <div>
                      <label>Años de vida mínimo:</label>
                      <input key="vidamin" type="number" min="0"
                      placeholder="Coloca mínimo de vida..."
                      value={input.life_span_min}
                      name="life_span_min"
                      required
                      onChange={handleChange}/>
                      {errors.life_span_min && (
                          <p>{errors.life_span_min}</p>
                      )}
                      </div>
                      <div>
                      <label>Años de vida máximo:</label>
                      <input key="vidamax" type="number" 
                      placeholder="Coloca máximo de vida..."
                      value={input.life_span_max}
                      name="life_span_max"
                      required
                      onChange={handleChange}/>
                      {errors.life_span_max && (
                          <p>{errors.life_span_max}</p>
                      )}
                      </div>

                      <div>
                      <label>Temperamentos:</label>
                      <select name="temperament" multiple>
                          
                    
                          <option value="todos">Selecciona temperamentos</option>
                        {temperament?.map(temperament=>(
                            <option onChange={ handleSelect}key={temperament.id} value={temperament}>{temperament}</option>
                        ))}
                    
                </select >
                <ul><li>{input.temperament.map(elem=>elem.temperament + ",")}</li></ul>
                <button type="submit">Agregar perro</button>
                      </div>
                      
                      
            {input.temperament.map(elem=>
                <div>
                    <p>{elem}</p>
                    <button onClick={()=> handleDelete(elem)}>X</button>
                    </div>)}
                    {
        !(errors.username && errors.height_min && 
            errors.height_max && errors.weight_min && 
            errors.weight_max && errors.weight_min &&
             errors.life_span) &&
                    <input type="submit"/>
} 
      {/* <input type="submit" 
      className={(errors.username ||errors.password
        ||errors.height_min||errors.height_max || errors.weight_min || errors.weight_max
        ||errors.life_span)? "disabled" :"enabled"}/> */}
 
                  </form>
                    </div>
        </div>
        
      )
    }


