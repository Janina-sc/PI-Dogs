import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from "react-router-dom";
import Card from './Card'

import Paginado from "./Paginado";

export default function Home(){
    const dispatch=useDispatch()//para usar esa constante y despachar mis acciones
    const allDogs= useSelector(state=>state.dogs)//es llamado cada vez que el componente hook es actualizado,trae lo que está en el state del store de redux,es lo mismo que hacer mapStateToProps, con useSelector traigo todo lo que está en el estado dogs
    const [currentPage, setPage]= useState(1)//la pág actual va ase 1 seteando estado local
    const [dogsPerPage, setDogsPerPage]=useState(8)//estado local que setea cuantos dogs per page
    const indexOfLastDog=currentPage * dogsPerPage//en este momento vale 8 que el útimpo dog de la pagi
    const indexOfFirstDog= indexOfLastDog- dogsPerPage//0
    const currentDogs=allDogs.slice(indexOfFirstDog, indexOfLastDog)//0/8
    const paginado= (pageNumber)=>{
        setPage(pageNumber)
    }

    useEffect(() => {//se ejecuta cada vez que se renderiza y se renderiza cada vez que el estado cambia
        dispatch(getDogs())//es como el mapDispatchToProps
        
    }, [])//[]para evitar loops infinitos
    function handleClick(e){
e.preventDefault();//para que no se refresque y no se rompa
dispatch(getDogs());//resetea para que me traiga todo de nuevo, por si se buggea
    }

    return(
        <div>
            
            <Link to= '/dogs'>Crear perro</Link>
            <h1>Amamos a los perros</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los perros
                
            </button>

           <div>
               <button onClick={e=>handleClick(e)}>
                   <h3>Buscar por temperamento</h3>
                   {/* mapear los temperamentos y devolverlos */}
               </button>
           </div>

           <div>
               Buscar por razas
               <button onClick={e=>handleClick(e)}>
               <h3>Buscar por razas</h3>
               {/* mapear las razas y devolverlas */}
               </button>
           </div>
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
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
                        height={elem.height} 
                        life_span={elem.life_span}
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