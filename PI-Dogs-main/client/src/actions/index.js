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