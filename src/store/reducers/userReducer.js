const initState = {

}


const userReducer = (state = initState, action) => {
  
  switch (action.type) {
    case 'GET_HISTORY':
      return {
        history:{
            ...action.payload
        }
      };
      case 'GET_HISTORY_ERROR':
        console.log('get history error');
      return state;
    default:
      return state;
  }
};

export default userReducer;