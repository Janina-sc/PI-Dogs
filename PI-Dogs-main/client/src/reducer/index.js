//import {GET_DOGS} from './index';//ver si importé bien

const initialState={
    dogs:[],
    allDogs:[],
    temperament:[],
    weight:[],
    breeds:[],
    detail:[],
}
function  rootReducer(state=initialState, action){
switch(action.type){
    case "GET_DOGS":
        return {
            ...state,
            dogs:action.payload, //trae todo lo de la acción  GetDogs
            allDogs:action.payload//cuando se dispara la acción tendré 2 estados
        }
        case "GET_NAME_DOGS"://para el searchbar
            return {
                ...state,
                dogs:action.payload//dogs es lo que estoy renderizando

            }
        case "ORDER_BREEDS_BY_NAME":
            let sortBreed=action.payload==="asc" ?
            [...state.dogs].sort(function(a,b){
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase()>a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }) : [...state.dogs].sort(function(a,b){//desc
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return -1;
                } if(b.name.toLowerCase()>a.name.toLowerCase()){
                    return 1;
                } return 0;
            })
            return {
                ...state,
                dogs:sortBreed
            }

           

            case "ORDER_BY_WEIGHT":
                
                let sortByWeight=action.payload==="asc" 
                ?
            [...state.dogs].sort(function(a , b){
                return (a.weight_max - b.weight_max)
                
               
             }) 
             : [...state.dogs].sort(function(a,b){
                return (b.weight_max - a.weight_max)
             })
             
            
               return {
                ...state,
                dogs:sortByWeight
         }


            
            
            case "GET_TEMPERAMENT":
                let allTemperaments= action.payload.map(elem=>elem.name)
                return {
                    ...state,
                    temperament:allTemperaments.sort()
                }

        case "FILTER_BY_TEMPERAMENT":
           
            //que filtre sobre todos los perros- la lógica antes de return
            let breedFiltered = action.payload === "all" ? state.allDogs : state.allDogs.filter((g) => g.temperament.includes(action.payload));

            return {
              ...state,
              dogs: breedFiltered,
            };
            
            
            case "POST_DOG":
                return {
                    ...state,
          }
            case "FILTER_BY_CREATION":
                
               const todos=state.allDogs
                const createdFilter=action.payload ==="Creados" ? 
                state.allDogs.filter(elem => elem.createdInDb === true) : 
                state.allDogs.filter(elem=> elem.createdInDb === false)//creados, de la api y todos
                //console.log(createdFilter, ' filter ')
                //console.log(state.allDogs, ' state ')
                

                return {
                    ...state,
                    
                     dogs:action.payload==="Todos" ? state.allDogs : createdFilter
                }


                // case 'FILTER_CREATED': probar algo así
                //     const AllCharacters = state.allcharacters
                //     const createdFilter =action.payload === 'All' ? AllCharacters : 
                //             action.payload ==='created' ? AllCharacters.filter(el =>el.createdInDb === true) :
                //             AllCharacters.filter(el =>!el.createdInDb)
                //     return{
                //         ...state,
                //         characters:  createdFilter
                //     }   




                case "GET_DETAIL":
                    return{
                        ...state,
                        detail:action.payload.data
                        }
                        
                default:
            return state;
}
}
export default rootReducer;





            
            
            
