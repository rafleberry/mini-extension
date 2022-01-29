import { combineReducers, Reducer } from 'redux';

import { IUsersState } from '../../types/models';
import authReducer from './auth';

export interface IStoreState {
    auth: IUsersState
}

type ReducerMaps = { [K in keyof IStoreState]: Reducer<any> };

const allReducers: ReducerMaps = {
    auth: authReducer
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;