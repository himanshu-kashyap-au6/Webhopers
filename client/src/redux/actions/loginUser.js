import { GET_USER, TOGGLE_LOGIN_STATE, LOGOUT_USER } from '../actionType'
import axios from 'axios'

export const loginUser = (user) => async (dispatch) => {
    try{
        dispatch({ type: GET_USER, payload: null, error: null })
        dispatch({ type: TOGGLE_LOGIN_STATE })
        const data = await axios.post(
            `http://localhost:1234/student/login`,{...user}
        )
        dispatch({ type: GET_USER, payload: data, error: null })
    }catch(err){
        console.error(err.message);
        dispatch({ type: GET_USER, payload: null, error: err.message })
    } finally {
        dispatch({ type: TOGGLE_LOGIN_STATE })
    }
}


export const logOutUser = () => async (dispatch, getState)=>{
    try{
        if(getState().loginState.user){
            const accessToken = getState().loginState.user.data.accessToken
            await axios.delete('http://localhost:1234/student/logOut',{
                headers:{
                    Authorization : accessToken
                }
            })
        }
    }catch(err){
        console.error(err)
    }finally{
        dispatch({ type: LOGOUT_USER })
    }
}