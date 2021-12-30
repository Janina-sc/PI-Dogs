import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs,  filterByTemperament,  filterByCreation, sortBreedsByName, sortByWeight, getTemperament } from "../actions";
import {Link} from "react-router-dom";
import Card from './Card';
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Home.css";


export default function Home(){
    const dispatch=useDispatch()//para usar esa constante y despachar mis acciones
    const allDogs= useSelector((state)=>state.dogs)//es llamado cada vez que el componente hook es actualizado,trae lo que está en el state del store de redux,es lo mismo que hacer mapStateToProps, con useSelector traigo todo lo que está en el estado dogs
    const temperament= useSelector((state)=>state.temperament)
    
    
    const [orden, setOrden]=useState("")//cuando seteo el estado local se renderiza
    const [currentPage, setCurrentPage]= useState(1)//la pág actual va ase 1-seteando estado local
    const [dogsPerPage, setDogsPerPage]=useState(8)//estado local que setea cuantos dogs per page
    const indexOfLastDog=currentPage * dogsPerPage//en este momento vale 8 que el útimpo dog de la pagi
    const indexOfFirstDog= indexOfLastDog- dogsPerPage//0
    const currentDogs=allDogs?.slice(indexOfFirstDog, indexOfLastDog)//0/8
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {//se ejecuta cada vez que se renderiza y se renderiza cada vez que el estado cambia
        dispatch(getDogs())//es como el mapDispatchToProps
        dispatch(getTemperament())
    }, [dispatch])//[]para evitar loops infinitos, le agrego de lo que depende el mountDispatch

    

    
    function handleClick(e){
e.preventDefault();//para que no se refresque y no se rompa
dispatch(getDogs());//resetea para que me traiga todo de nuevo, por si se buggea
    }
    

    function handleFilterByTemperament(e){
       
dispatch(filterByTemperament(e.target.value))
setCurrentPage(1);
setOrden(e.target.value)
    }
    



    function handleFilterByCreation(e){
        e.preventDefault()
dispatch(filterByCreation(e.target.value))
setCurrentPage(1);
setOrden(`Ordenado ${e.target.value}`)//es lo que viene del select y en la action lo que viene del payload
    }
    function handleSortBreedsByName(e){
        e.preventDefault();
        dispatch(sortBreedsByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)//cuando seteo el estado locasl se renderiza
    }
    function handleSortByWeight(e){
        e.preventDefault();
        dispatch(sortByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)//estado local vacío para que cuando seteo la página se renderice
    }
    

    return(
        <div className="home">
            <div className="image-home"></div>
            <h1>Amamos a los perros</h1>
            

            <div >
            <Link to= '/createdog'className="link-create-dog">Agregar raza</Link>
            </div>
            <div>
            <button className="boton" onClick={e=>{handleClick(e)}}>
               Cargar todos los perros
                </button>
                </div>
                <div>

                     <div>
                         <SearchBar/>
                     </div>
                <div className="container-filtros" >
                    
                <div>
                    
                   <label >Temperamentos:</label>
				<select name="filtertemperament" defaultValue={"default"} onChange={ e => handleFilterByTemperament(e)}>
                    <option value="default" name="default"> Temperamentos </option>
                    <option value="all">Todos los temperamentos</option>
					{ temperament?.map((temperament) => (
                    
                    <option key={temperament}value={temperament}>{temperament}</option>
                        
                    ))}
                    </select> 
                        </div>

                <div>
                    <label> Elegir según fuente de creación:</label>
                <select name="filterCreation" onChange={handleFilterByCreation}> 
                     
                    <option value= "Todos">Todos</option>
                    <option value="Creados">Creados</option>
                 <option value="Provenientes de la Api">Provenientes de la API</option>
                </select>
                </div>
                </div>
                
                <div className="container-ordenamientos">
                <div>
                <select onChange={(e)=>handleSortBreedsByName(e)}>
                    <option value="asc">Raza de la A la Z</option>
                    <option value="desc">Raza de la Z a la A</option>
                </select>
                </div>
                <div>
                <select  onChange={(e)=>handleSortByWeight(e)}>
                    <option value="asc">Buscar por peso  ascendente</option>
                    <option value="desc">Buscar por peso descendente</option>
                </select>
                </div>
                </div>
                

                { currentDogs?.map((elem)=>{//después del paginado sólo voy a mapear lo de cada pág
                        return (
                    <Card 
                        image={elem.image} image={elem.image? elem.image : elem.image}
                        name={elem.name} 
                        temperament={elem.temperament} 
                        weight_min={elem.weight_min}
                        weight_max={elem.weight_max}
                        id={elem.id}
                        key={elem.id} 
                         
                        />
                       
                        
                );
                    })
                }
                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}//valor numérico
                paginado={paginado}
                />
                
            </div>
        </div>
    )
}