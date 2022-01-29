import { IUsersState } from '../../types/models';
import { Actions, ActionTypes } from '../actions/auth';

const initialState: IUsersState = {
    loading: false,
    isAuth: false,
    error: null,
    classes: []
}

const authReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case ActionTypes.LOG_IN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                classes: action.payload,
                isAuth: true
            }
        case ActionTypes.LOG_IN_FAIL:
            return {
                loading: false,
                classes: [],
                error: action.payload,
                isAuth: false
            }
        case ActionTypes.LOG_OUT:
            return {
                loading: false,
                classes: [],
                error: null,
                isAuth: false
            }
        default:
            return state
    }
}


export default authReducer;