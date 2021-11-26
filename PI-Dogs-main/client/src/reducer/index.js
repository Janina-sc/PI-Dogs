const initialState={
    dogs:{}//ojo puede ser{}
}
function  rootReducer(state=initialState, action){
switch(action.type){
    case "GET_DOGS":
        return {
            ...state,
            dogs:action.payload//trae todo lo de la acción  GetDogs
        }
        default:
            return state;
}
}
export default rootReducer;