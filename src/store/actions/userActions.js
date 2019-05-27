export const getHistoryAction = (username) => {
    return (dispatch) => {
        fetch(`https://exalt-interview.firebaseio.com/rentedCars/${username}.json`, {
            method: 'GET',
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"RENT_CAR_ERROR"}))
          .then(response =>{
              dispatch({type:"GET_HISTORY",payload:response})
          });  
    }
  };