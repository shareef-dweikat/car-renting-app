const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'SIGNIN_ERROR':
      console.log('sign in error');
      return {
          authError: 'sign in failed'
      }

    case 'SIGNIN':
      console.log('login success');
      let email=  action.payload
      return {
        authError: null,
        email
      }
    case 'SIGNOUT':
      console.log('sign out success')
      return {
        authError: null,
        email:null
      }
    default:
      return state
  }
};

export default authReducer;