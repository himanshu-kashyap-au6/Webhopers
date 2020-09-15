import { GET_PROFILE, TOGGLE_GET_PROFILE } from '../actionType'

const initialState = {
    profile: null,
    isFetching: false,
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case GET_PROFILE:
            return {...state, profile: payload}
        case TOGGLE_GET_PROFILE:
            return { ...state, isFetching: !state.isFetching }
        default:
            return state
    }
}

export default profileReducer