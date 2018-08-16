import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  MEDICATIONS_GET,
  MEDICATIONS_GET_SUCCESS,
  MEDICATIONS_GET_ERROR,
} from './constants';

export const initialState = {
  data: {
    medications: [],
    errors: {
      login: '',
      medications: '',
    },
  },
  ui: {
    isLoggingIn: false,
    isGettingMedications: false,
  },
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLogging: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            login: '',
          },
        },
        ui: {
          ...state.ui,
          isLogging: false,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            login: action.payload.error,
          },
        },
        ui: {
          ...state.ui,
          isLogging: false,
        },
      };
    case MEDICATIONS_GET:
      return {
        ...state,
        data: {
          ...state.data,
          medications: [],
        },
        ui: {
          ...state.ui,
          isGettingMedications: true,
        },
      };
    case MEDICATIONS_GET_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          medications: action.payload.data,
          errors: {
            ...state.data.errors,
            medications: '',
          },
        },
        ui: {
          ...state.ui,
          isGettingMedications: false,
        },
      };
    case MEDICATIONS_GET_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          errors: {
            ...state.data.errors,
            medications: action.payload.error,
          },
        },
        ui: {
          ...state.ui,
          isGettingMedications: false,
        },
      };
    default:
      return state;
  }
}
