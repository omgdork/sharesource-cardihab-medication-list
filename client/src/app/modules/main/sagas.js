import jwt_decode from 'jwt-decode';
import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { MEDICATIONS_GET } from './constants';
import {
  setLoggingIn,
  loginError,
  loginSuccess,
  setMedicationsGetting,
  getMedicationsSuccess,
  getMedicationsError,
} from './actions';

/**
 * Logs in the user.
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @returns {Promise} The promise with token or error as the value.
 */
export function login(username, password) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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
    if (response.status === 403) {
      sessionStorage.removeItem('cardihab-username');
      sessionStorage.removeItem('cardihab-token');
      throw new Error('Invalid login.');
    }

    return response.body.getReader().read();
  }).then((response) => {
    const uint8Array = response.value;
    const token = String.fromCharCode.apply(null, uint8Array);

    sessionStorage.setItem('cardihab-username', username);
    sessionStorage.setItem('cardihab-token', token);

    return token;
  });
}

/**
 * Gets the medication details.
 * @param {string} token - The authorization bearer token.
 * @param {string} searchParam - The medication to search for.
 * @returns {Promise} The promise with the medication details as the value.
 */
export function getMedication(token, searchParam) {
  return fetch(`${process.env.REACT_APP_API_URL}/search_medication`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      medication: searchParam,
    }),
  }).then((response) => {
    const reader = response.body.getReader();

    return reader.read();
  }).then((response) => {
    const uint8Array = response.value;
    const data = JSON.parse(String.fromCharCode.apply(null, uint8Array));

    if (data.status === 'UNAUTHORIZED') {
      sessionStorage.removeItem('cardihab-username');
      sessionStorage.removeItem('cardihab-token');
      throw new Error('Token has expired.');
    }

    return {
      searchParam,
      data,
    };
  });
}

/**
 * Gets the list of medication details.
 * @param {string} username - The username.
 * @param {string} password - The password.
 * @param {string} medicationList - Medication list in CSV format.
 */
export function* getMedications({ payload: { username, password, medicationList } }) {
  try {
    let sessionUsername = sessionStorage.getItem('cardihab-username');
    let token = sessionStorage.getItem('cardihab-token');

    // Login if the username in the form is different from the username in storage,
    // if there's no token in the Web Storage,
    // or if token has expired.
    if (sessionUsername !== username || !token || (token && new Date(jwt_decode(token).exp * 1000) < new Date())) {
      yield put(setLoggingIn(true));
      token = yield login(username, password);
    }

    if (token instanceof Error) {
      yield put(loginError(token.message));
    } else {
      yield put(loginSuccess());
      yield put(setMedicationsGetting(true));

      const results = yield medicationList.split(',').map((item) => {
        call(delay, 1000);
        return call(getMedication, token, item.trim());
      });

      const internalServerError = results.find((result) => result.data.status === 500);

      if (internalServerError) {
        throw new Error(`${internalServerError.data.error}: ${internalServerError.data.message}`);
      }

      yield put(getMedicationsSuccess(results));
    }
  } catch (error) {
    switch (error.message) {
      case 'Invalid login.':
      case 'Token has expired.':
        yield put(loginError(error.message));
        break;
      default:
        yield put(getMedicationsError(error.message));
    }
  } finally {
    yield put(setMedicationsGetting(false));
  }
}

/**
 * The getMedications saga.
 */
export function* getMedicationsSaga() {
  yield takeEvery(MEDICATIONS_GET, getMedications);
}

export default [
  getMedicationsSaga,
];
