import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes as authActionTypes } from '../state/actions/auth';
import * as auth from '../state/effects/auth.effects'

export function* watcherSaga() {
  yield all([
    takeLatest(authActionTypes.LOG_IN_REQUEST, auth.login),
  ])
}