const initState = {
  carsForRent:[]
}


const carReducer = (state = initState, action) => {
  

  switch (action.type) {
    case 'ADD_CAR': 
      return {
        carsForRent:{
             ...state.carsForRent,
            ...action.payload
        }
      };
      case 'GET_CARS':
      return {
         carsForRent:{...action.payload}
      };
      case 'GET_CAR_DETAILS':
      return {
        carsForRent:{...state},
        carDetails:action.payload
      };
      case 'DELETE_CAR':
      return {
        carsForRent:{...action.payload}
      };
      case 'EDIT_CAR':
      return{
        carsForRent:{
          ...state.carsForRent,
          ...action.payload
        },
        carDetails:{...action.payload}
      }
    case 'ADD_CAR_ERROR':
      console.log('add car error');
      return state;
    default:
      return state;
  }
};

export default carReducer;