import { GET_PROFILE, TOGGLE_GET_PROFILE } from '../actionType'
import axios from 'axios'

export const getProfile = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        dispatch({ type: GET_PROFILE, payload: null })
        dispatch({ type: TOGGLE_GET_PROFILE })
        const data = await axios(
            `http://localhost:1234/student/profile`,
            {headers:{
                Authorization : accessToken
            }}
        )
        dispatch({ type: GET_PROFILE, payload: data.data })
    }catch(err){
        console.error(err.message);
        dispatch({ type: GET_PROFILE, payload: null})
    } finally {
        dispatch({ type: TOGGLE_GET_PROFILE })
    }
}

export const updateProfile = (user) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const id = getState().loginState.user.data.commenUser._id
        const {name, email, password, image, city, state, phone} = user
        const fData = new FormData()
        fData.append('name', name)
        fData.append('email', email)
        fData.append('newPassword', password)
        fData.append('city', city)
        fData.append('state', state)
        fData.append('image', image)
        fData.append('phone', phone)
        
        const data = await axios.patch(
            `http://localhost:1234/student/updateProfile/${id}`, fData,
            {headers:{
                Authorization : accessToken
            }}
        )
        console.log(data)
    }catch(err){
        console.error(err.message);
        dispatch({ type: GET_PROFILE, payload: null})
    } finally {
        dispatch({ type: TOGGLE_GET_PROFILE })
    }
}