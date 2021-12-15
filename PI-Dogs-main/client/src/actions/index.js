import axios from "axios";



export function getDogs(){
    return async function(dispatch){
        var json= await axios.get("http://localhost:3001/dogs",{

        }); //acá se conecta el back y el front, la ruta que en el back me trae todos los dogs
        console.log('action dogs ', json.data)
        return dispatch({
        type:"GET_DOGS",
        payload: json.data
    })
    
}
}
export function getNameDogs(name){
    return async function(dispatch){
        try{
            var json= await axios.get("http://localhost:3001/dogs?name=" + name)//ruta del back de búsqueda de name por query y le paso el name o payload
        return dispatch({
            type: "GET_NAME_DOGS",
            payload:json.data//el resultado de la búsqueda, lo que devuelve la ruta
        })
        } catch(error){
            console.log(error)
        }
    }

}

export  function sortBreedsByName(payload){
    return {
        type:"ORDER_BREEDS_BY_NAME",
        payload
    }
}
export  function sortByWeight(payload){

    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
}

export function filterByTemperament(payload){
        
    return  ({
        type:'FILTER_BY_TEMPERAMENT',
        payload,

    })
    }





export function getTemperament(){//para el DogCreate
        return async function(dispatch){
            var info=await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type:"GET_TEMPERAMENT",
                payload:info.data
            })
        }
    }
    
export function postDog(payload){
        return async function(dispatch){
            const response= await axios.post("https://localhost:3001/dog", payload)
        //console.log(response)
        return response;
        }
    }




export function filterByCreation(payload){
    return{
        type: "FILTER_BY_CREATION",
        payload
    }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            var json=await axios.get(`https://localhost:3001/dog/${id}`);
            return dispatch({
                type:"GET_DETAIL",
                payload: json.data
            })
        }catch(error){

        }
    }
}