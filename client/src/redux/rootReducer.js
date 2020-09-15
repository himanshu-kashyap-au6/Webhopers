import  { combineReducers } from 'redux'
import registerReducer from './reducers/registerReducer'
import loginReducer from './reducers/loginReducer'
import profileReducer from './reducers/profileReducer'

const rootReducer = combineReducers({
    registerState: registerReducer,
    loginState: loginReducer,
    profileState: profileReducer,
})

export default rootReducer