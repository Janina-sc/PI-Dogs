
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
                dogs:action.payload

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
                return {
                    ...state,
                    temperament:action.payload
                }

        case "FILTER_BY_TEMPERAMENT":
            //  const tempDogs = state.allDogs
            //      let tempFiltered = tempDogs.filter( elem => {
            //          if(elem.temperament) {
            //              return elem.temperament.includes(action.payload)
            //      }
            //         if(elem.temperaments) {
            //             return elem.temperaments.map((elem) => elem.name === action.payload)
            //         }
            //         return null
            //    })
            // return {
            //     ...state,
            //     dogs : tempFiltered
            // }
                 
           
        
        const allDogs=state.allDogs//que filtre sobre todos los perros- la lógica antes de return
         const temperamentFilter = action.payload.map(elem => elem.name) //esta va
        

         const filtrados=temperamentFilter.filter(elem=>elem.name===action.payload)
                
             return {
                ...state,
                 temperament: action.payload //esta va    
            }

        
            
            
            
            case "POST_DOG":
                return {
                    ...state,
          }
            case "FILTER_BY_CREATION":
               
                const createdFilter=action.payload ==="Creados" ? 
                state.allDogs.filter(elem => elem.createdInDb === true) : 
                state.allDogs.filter(elem=> elem.createdInDb === false)//creados, de la api y todos
                //console.log(createdFilter, ' filter ')
                //console.log(state.allDogs, ' state ')
                return {
                    ...state,
                    
                     dogs :action.payload==="Todos" ? state.allDogs :createdFilter
                }

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


// const initialState={
//     dogs:[],
//     allDogs:[],
//     temperamentt:undefined,
//     filtrado:[],
//     weight:[],
//     breeds:[],
//     detail:{},
// }
// function  rootReducer(state=initialState, action){
// switch(action.type){
//     case "GET_DOGS":
//         return {
//             ...state,
//             dogs:action.payload, //trae todo lo de la acción  GetDogs
//             allDogs:action.payload//cuando se dispara la acción tendré 2 estados
//         }
//         case "GET_NAME_DOGS"://para el searchbar
//             return {
//                 ...state,
//                 dogs:action.payload

//             }
//         case "ORDER_BREEDS_BY_NAME":
//             let sortBreed=action.payload==="asc" ?
//             [...state.dogs].sort(function(a,b){
//                 if(a.name>b.name){
//                     return 1;
//                 }
//                 if(b.name>a.name){
//                     return -1;
//                 }
//                 return 0;
//             }) : [...state.dogs].sort(function(a,b){//desc
//                 if(a.name>b.name){
//                     return -1;
//                 } if(b.name>a.name){
//                     return 1;
//                 } return 0;
//             })
//             return {
//                 ...state,
//                 dogs:sortBreed
//             }

//             case "ORDER_BY_WEIGHT":
                
//                 let sortByWeight=action.payload==="asc" ?
//             [...state.dogs].sort(function(a,b){
//                 if(a.weight.metric.split("-")[0]>b.weight.metric.split("-")[0]){
//                     return 1;
//                 }
//                 if(b.weight.metric.split("-")[0]>a.weight.metric.split("-")[0]){
//                     return -1;
//                 }
//                 return 0;
//             }) :
//              [...state.dogs].sort(function(a,b){
//                 if(a.weight.metric.split("-")[0]>b.weight.metric.split("-")[0]){
//                     return -1;
//                 } if(b.weight.metric.split("-")[0]>a.weight.metric.split("-")[0]){
//                     return 1;
//                 } return 0;
//             })
//             return {
//                 ...state,
//                 dogs:sortByWeight
//             }


            
            
//             // case "GET_TEMPERAMENT":
//             //     return {
//             //         ...state,
//             //         temperament:action.payload
//             //     }

//         // case "FILTER_BY_TEMPERAMENT":
           
        
//         // //const allDogs=state.allDogs//que filtre sobre todos los perros- la lógica antes de return
//         //  const temperamentFilter = action.payload.map(elem => elem.name)
//         // //console.log(temperamentFilter, "reducer")
                
//         //      return {
//         //         ...state,
//         //         temperament: action.payload
                
//         //     }
//         case "ENVIA_TEMPERAMENTS":
//             return {
//                 ...state,
//                 temperamentt:action.payload.map(temp=>temp.temperament)
//             }
//             case "TEMPERAMENTOS_FILTRADOS":
//                 return {
//                     ...state,
//                     filtrados:action.payload
//                 }


            
            
            
//             case "POST_DOG":
//                 return {
//                     ...state,
//           }
//             case "FILTER_BY_CREATION":
               
//                 const createdFilter=action.payload ==="Creados" ? state.allDogs.filter(elem => elem.createdInDb === true) : state.allDogs.filter(elem=> elem.createdInDb === false)//creados, de la api y todos
//                 //console.log(createdFilter, ' filter ')
//                 //console.log(state.allDogs, ' state ')
//                 return {
//                     ...state,
//                     dogs :action.payload==="Todos" ? state.allDogs :createdFilter
//                 }

//                 case "GET_DETAIL":
//                     return{
//                         ...state,
//                         detail:action.payload.data

//                     }
//                 default:
//             return state;
// }
// }
// export default rootReducer;