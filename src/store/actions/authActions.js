export const signIn = (credentials) => {
    return (dispatch) => {
  
        fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDrCMDL36Jgf1Q4MimNzeuvJdB5IeuXK3c', {
            method: 'POST',
            body:JSON.stringify({
                returnSecureToken:true,
                ...credentials
            })
        })
         .then(response => response.json())
         .then((response) => {
              let {email}=response
             dispatch({ type: 'SIGNIN',payload:email });
        })
         .catch((err) => {
             dispatch({ type: 'SIGNIN_ERROR', err });
       });
  
    }
  }


  export const signOutAction = (credentials) => {
    return (dispatch) => {
           dispatch({ type: 'SIGNOUT'});
    }
  }