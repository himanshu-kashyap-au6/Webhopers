import { SET_USER, TOGGLE_AUTH_STATE, LOGOUT_USER } from '../actionType'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const registerUser = (user) => async (dispatch) => {
    try{
        dispatch({ type: SET_USER, payload: null, error: [] })
        dispatch({ type: TOGGLE_AUTH_STATE })
        const {name, email, password, city, state, image, phone} = user
        const fData = new FormData()
        fData.append('name', name)
        fData.append('email', email)
        fData.append('password', password)
        fData.append('city', city)
        fData.append('state', state)
        fData.append('image', image)
        fData.append('phone', phone)
        
        const { data } = await axios.post(
            `http://localhost:1234/student/register`, fData
        )
        console.log(data)
        if(data.statusCode === 201){
            NotificationManager.success('Student registered successfully', 'Success')
        }
        else if(data.statusCode === 401) {
            NotificationManager.error('Email already exists', 'Error')
        }
        else if(data.statusCode === 400) {
            NotificationManager.error('Bad request', 'Error')
        }
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE })
    }
}

export const logOutUser = () => async (dispatch) => {
    try{
        dispatch({type: LOGOUT_USER})
    }catch(err){
        console.error(err)
    }
}