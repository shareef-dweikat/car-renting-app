export const addCarAction = (car) => {

    return (dispatch) => {
        fetch('https://exalt-interview.firebaseio.com/carsList.json', {
            method: 'POST',
            body:JSON.stringify({...car})
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"ADD_CAR_ERROR"}))
          .then(response =>{
              dispatch({type:"ADD_CAR",payload:{[response.name]:car}})
          });
       
    }
  };



  export const getCarsAction = (car) => {
    return (dispatch) => {
        fetch('https://exalt-interview.firebaseio.com/carsList.json', {
            method: 'GET',
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"ADD_CAR_ERROR"}))
          .then(response =>{
             dispatch({type:"GET_CARS",payload:response})
          });
       
    }
  };

  export const getCarDetailsAction = (id) => {
    return (dispatch) => {
        fetch(`https://exalt-interview.firebaseio.com/carsList/${id}.json`, {
            method: 'GET',
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"ADD_CAR_ERROR"}))
          .then(response =>{
              dispatch({type:"GET_CAR_DETAILS",payload:response})
          });
       
    }
  };

  export const DeleteCarAction = (idOfCarToDelete) => {
    return (dispatch,getState) => {
        fetch(`https://exalt-interview.firebaseio.com/carsList/${idOfCarToDelete}.json`, {
            method: 'DELETE',
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"DELETE_CAR_ERROR"}))
          .then(response =>{
             const cars=getState().cars.carsForRent
             delete cars[idOfCarToDelete]
          
             dispatch({type:"DELETE_CAR",payload:cars})
          });
       
     }
  };

  export const editCarAction = (car,id) => {
    return (dispatch) => {
        fetch(`https://exalt-interview.firebaseio.com/carsList/${id}.json`, {
            method: 'PUT',
            body:JSON.stringify({...car})
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"EDIT_CAR_ERROR"}))
          .then(response =>{
              alert("Edited successfully")
              dispatch({type:"EDIT_CAR",payload:car})
          });
       
    }
  };

  export const rentCarAction = (rentDetails,username) => {
    return (dispatch) => {
      fetch(`https://exalt-interview.firebaseio.com/carsList/${rentDetails.carId}/isRented.json`, {
            method: 'PUT',
            body:JSON.stringify(true)
          })
        fetch(`https://exalt-interview.firebaseio.com/rentedCars/${username}.json`, {
            method: 'POST',
            body:JSON.stringify({...rentDetails})
          })
          .then(response => response.json())
          .catch(error => dispatch({type:"RENT_CAR_ERROR"}))
          .then(response =>{
             alert("Rented successfully")
          });
       
    }
  };