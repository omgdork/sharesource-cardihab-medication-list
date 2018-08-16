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
    medications: [
      // {
      //   searchParam: 'Diacol',
      //   data: [
      //     {
      //       id: '1',
      //       displayName: 'Diacol 1',
      //       appearance: 'tablet',
      //       doseType: 'number',
      //     },
      //     {
      //       id: '2',
      //       displayName: 'Diacol 2',
      //       appearance: 'syrup',
      //       doseType: 'teaspoon',
      //     },
      //   ],
      // },
      // {
      //   searchParam: 'Viagra',
      //   data: [
      //     {
      //       id: '3',
      //       displayName: 'Viagra',
      //       appearance: 'tablet',
      //       doseType: 'number',
      //     },
      //   ],
      // },
      // {
      //   status: 'NOT_FOUND',
      //   timestamp: '2018-05-30T05:24:34.458',
      //   message: 'medication.not.found',
      //   path: '/v1/medications/search',
      //   details: [
      //     {
      //       errorObject: '',
      //       field: '',
      //       errorValue: 'tablet abc',
      //       message: 'entity.not.found',
      //     },
      //   ],
      // }
    ],
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
