const initialState={
    dogs:[],//ojo puede ser{}
    allDogs:[],
    temperament:[],
    weight_max:[],
    weight_min:[],
    breeds:[]
}
function  rootReducer(state=initialState, action){
switch(action.type){
    case "GET_DOGS":
        return {
            ...state,
            dogs:action.payload, //trae todo lo de la acción  GetDogs
            allDogs:action.payload//
        }
        case "ORDER_BREEDS_BY_NAME":
            let sortBreed=action.payload==="asc" ?
            state.dogs.sort(function(a,b){
                if(a.name>b.name){
                    return 1;
                }
                if(b.name>a.name){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function(a,b){
                if(a.name>b.name){
                    return -1;
                } if(b.name>a.name){
                    return 1;
                } return 0;
            })
            return {
                ...state,
                dogs:sortBreed
            }

            case "ORDER_BY_WEIGHT_MAX":
                let sortByWeightMax=action.payload==="asc" ?
            state.dogs.sort(function(a,b){
                if(a.weight_max>b.weight_max){
                    return 1;
                }
                if(b.weight_max>a.weight_max){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function(a,b){
                if(a.weight_max>b.weight_max){
                    return -1;
                } if(b.weight_max>a.weight_max){
                    return 1;
                } return 0;
            })
            return {
                ...state,
                dogs:sortByWeightMax
            }
            case "ORDER_BY_WEIGHT_MIN":
                let sortByWeightMin=action.payload==="asc" ?
            state.dogs.sort(function(a,b){
                if(a.weight_min>b.weight_min){
                    return 1;
                }
                if(b.weight_min>a.weight_min){
                    return -1;
                }
                return 0;
            }) : state.dogs.sort(function(a,b){
                if(a.weight_min>b.weight_min){
                    return -1;
                } if(b.weight_min>a.weight_min){
                    return 1;
                } return 0;
            })
            return {
                ...state,
                dogs:sortByWeightMin
            }

        case "FILTER_BY_TEMPERAMENT":
        
            const allDogs=state.allDogs//que filtre sobre todos los perros- la lógica antes de return
            const temperamentFilter=action.payload.map(elem=>elem.temperament)
            return {
                ...state,
                temperament:temperamentFilter
                
            }
            case "FILTER_BY_CREATION":
               
                const createdFilter=action.payload ==="created" ? state.allDogs.filter(elem=>elem.createdInDb) : state.allDogs.filter(elem=>!elem.createdInDb)//creados, existentes y todos
                return {
                    ...state,
                    dogs:action.payload==="All" ? state.allDogs :createdFilter
                }
                default:
            return state;
}
}
export default rootReducer;