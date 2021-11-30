import axios from "axios";
const {API_KEY, ALL_DOGS} =process.env;


export function getDogs(){
    return async function(dispatch){
        var json= await axios.get(`${ALL_DOGS}?key=${API_KEY}`); //acá se conecta el back y el front, la ruta que en el back me trae todos los dogs
        return dispatch({
        type:"GET_DOGS",
        payload: json.data
    })
    
}
}

export  function sortBreedsByName(payload){
    return {
        type:"ORDER_BREEDS_BY_NAME",
        payload
    }
}
export  function sortByWeightMax(payload){
    return {
        type: "ORDER_BY_WEIGHT_MAX",
        payload
    }
}
export  function sortByWeightMin(payload){
    return {
        type: "ORDER_BY_WEIGHT_MIN",
        payload
    }
}
export function filterByTemperament(payload){
    return async function(dispatch){
        var json= await axios.get(`${ALL_DOGS}?key=${API_KEY}`);
        var allTemperaments=json.data.map(elem=>elem.temperament)
    return dispatch ({
        type:'FILTER_BY_TEMPERAMENT',
        payload:allTemperaments

    })
}
}


export function filterByCreation(payload){
    return{
        type: "FILTER_BY_CREATION",
        payload
    }

}