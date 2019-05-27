import authReducer from './authReducer'
import carReducer from './carReducer'
import userReducer from './userReducer'


 import { combineReducers } from 'redux'


const rootReducer = combineReducers({
 cars:carReducer,
 auth:authReducer,
 user:userReducer
});

export default rootReducer
