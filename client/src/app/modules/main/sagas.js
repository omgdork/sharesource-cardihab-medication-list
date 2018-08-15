import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_ERROR,
  MEDICATIONS_GET,
  MEDICATIONS_GET_ERROR,
  SET_ERROR_MESSAGE,
} from './constants';
import {
  setLoggingIn,
  loginSucces,
  loginError,
  setMedicationsGetting,
  getMedicationsSuccess,
  getMedicationsError,
} from './actions';

export function* login({ payload: { username, password } }) {
  try {
    yield put(setLoggingIn(true));
    yield fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => {
      const reader = response.body.getReader();

      return reader.read();
    }).then((response) => {
      const uint8Array = response.value;
      const token = String.fromCharCode.apply(null, uint8Array);

      sessionStorage.setItem('cardihab-token', token);
    });
  } catch (e) {
    yield put(loginError(e));
  } finally {
    yield put(setLoggingIn(false));
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN, login);
}

export function* getMedications({ payload: { username, password, medications } }) {
  try {
    let token = sessionStorage.getItem('cardihab-token');

    if (!token) {
      token = yield login({ payload: { username, password }});
    }

    yield fetch()
  } catch (e) {

  } finally {

  }
}

export function* getMedicationsSaga() {
  yield takeEvery(MEDICATIONS_GET, getMedications);
}

export default [
  loginSaga,
  getMedicationsSaga,
];
