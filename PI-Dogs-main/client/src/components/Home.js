import React from "react";

import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filterByTemperament, filterByCreation, sortBreedsByName, sortByWeightMax,sortByWeightMin } from "../actions";
import {Link} from "react-router-dom";
import Card from './Card';

import Paginado from "./Paginado";


export default function Home(){
    const dispatch=useDispatch()//para usar esa constante y despachar mis acciones
    const allDogs= useSelector((state)=>state.dogs)//es llamado cada vez que el componente hook es actualizado,trae lo que está en el state del store de redux,es lo mismo que hacer mapStateToProps, con useSelector traigo todo lo que está en el estado dogs
    const [orden, setOrden]=useState("")
    const [currentPage, setCurrentPage]= useState(1)//la pág actual va ase 1 seteando estado local
    const [dogsPerPage, setDogsPerPage]=useState(8)//estado local que setea cuantos dogs per page
    const indexOfLastDog=currentPage * dogsPerPage//en este momento vale 8 que el útimpo dog de la pagi
    const indexOfFirstDog= indexOfLastDog- dogsPerPage//0
    const currentDogs=allDogs.slice(indexOfFirstDog, indexOfLastDog)//0/8
    const paginado= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {//se ejecuta cada vez que se renderiza y se renderiza cada vez que el estado cambia
        dispatch(getDogs())//es como el mapDispatchToProps
        
    }, [dispatch])//[]para evitar loops infinitos

    function handleClick(e){
e.preventDefault();//para que no se refresque y no se rompa
dispatch(getDogs());//resetea para que me traiga todo de nuevo, por si se buggea
    }
    function handleSortByWeightMax(e){
        e.preventDefault();
        dispatch(sortByWeightMax(e.target.value))
        setCurrentPage(1);
        //setOrden(`Ordenado" ${e.target.value}`)ver esto
    }

    function handleFilterByTemperament(e){
dispatch(filterByTemperament(e.target.value))
    }

    function handleFilterByCreation(e){
        dispatch(filterByCreation(e.target.value))//es lo que viene del select y en la action lo que viene del payload
    }
    function handleSortBreedsByName(e){
        dispatch(sortBreedsByName(e.target.value))
    }
    function handleSortByWeightMax(e){
        dispatch(sortByWeightMax(e.target.value))
    }
    function handleSortByWeightMin(e){
        dispatch(sortByWeightMin(e.target.value))
    }

    return(
        <div>
            
            <Link to= '/createdog'>Crear perro</Link>
            <h1>Amamos a los perros</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los perros
                </button>

                 <div>
                

                 <select onChange={e=>handleFilterByTemperament(e)}>//ojo esto no está listo-problem en 
                    <option value= "temperament"> Bucar por Temperamento </option> 
                </select> 

                
                <select onChange={e=>handleFilterByCreation(e)}> 
                    <option value= "All">Creados o provenientes de la API</option>
                    <option value="Created"></option>
                    <option value="Not Created"></option>
                </select>
                


                <select onChange={e=>handleSortBreedsByName(e)}>
                    <option value="asc">Raza de la A la Z</option>
                    <option value="desc">Raza de la Z a la A</option>
                </select>

                <select  onChange={e=>handleSortByWeightMax(e)}>
                    <option value="asc">Buscar por peso máximo ascendente</option>
                    <option value="des">Buscar por peso máximo descendente</option>
                </select>

                <select onChange={e=>handleSortByWeightMin(e)}>
                    <option value="asc">Buscar por peso mínimo ascendente</option>
                    <option value="des">Buscar por peso mínimo descendente</option>
                </select>

                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}//valor numérico
                paginado={paginado}
                />
                { currentDogs?.map(elem=>{//después del paginado sólo voy a mapear lo de cada pág
                        return (
                            <fragment>
                                <Link to={'/home/' + elem.id}>
                        <Card 
                        image={elem.image} 
                        name={elem.name} 
                        temperament={elem.temperament} 
                        weight={elem.weight} 
                        // height={elem.height} 
                        // life_span={elem.life_span}
                        />
                        </Link>
                        </fragment>
                );
                    })
                }
                
            </div>
        </div>
    )
}