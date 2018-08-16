import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  MEDICATIONS_GET,
  MEDICATIONS_GETTING,
  MEDICATIONS_GET_SUCCESS,
  MEDICATIONS_GET_ERROR,
  SET_ERROR_MESSAGE,
} from './constants';

export function setLoggingIn(isLoggingIn) {
  return {
    type: LOGGING_IN,
    payload: {
      isLoggingIn,
    },
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error,
    },
  };
}

export function getMedications(username, password, medicationList) {
  return {
    type: MEDICATIONS_GET,
    payload: {
      username,
      password,
      medicationList,
    },
  };
}

export function setMedicationsGetting(isGetting) {
  return {
    type: MEDICATIONS_GETTING,
    payload: {
      isGetting,
    },
  };
}

export function getMedicationsSuccess(data) {
  return {
    type: MEDICATIONS_GET_SUCCESS,
    payload: {
      data,
    },
  };
}

export function getMedicationsError(error) {
  return {
    type: MEDICATIONS_GET_ERROR,
    payload: {
      error,
    },
  };
}

export function setErrorMessage(errorType, errorMessage) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: {
      errorType,
      errorMessage,
    },
  };
}
