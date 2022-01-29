// import { IPost } from '../../types/models';
import { createAction } from 'redux-actions'

export enum ActionTypes {
    LOG_IN_REQUEST = "LOG_IN_REQUEST",
    LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
    LOG_IN_FAIL = "LOG_IN_FAIL",
    LOG_OUT = "LOG_OUT"

}

interface ILoginRequest {
    type: ActionTypes.LOG_IN_REQUEST,
    payload: string
}

interface ILoginSuccess {
    readonly type: ActionTypes.LOG_IN_SUCCESS,
    payload: any
}
interface ILoginFail {
    readonly type: ActionTypes.LOG_IN_FAIL,
    payload: any
}
interface ILogOut {
    readonly type: ActionTypes.LOG_OUT,
}

export type Actions = ILoginRequest | ILoginSuccess | ILoginFail | ILogOut;

export const login = createAction(ActionTypes.LOG_IN_REQUEST)
export const logout = createAction(ActionTypes.LOG_OUT)
export const LoginSuccess = createAction(ActionTypes.LOG_IN_SUCCESS)
export const LoginFail = createAction(ActionTypes.LOG_IN_FAIL)
