import { LIST_ULTIMAS } from '../../constants/ActionTypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
  byKey: {},
};

export default function ultimas(state = initialState, action = {}) {
  switch (action.type) {
    case `${LIST_ULTIMAS}_PENDING`:
      return {
        ...state,
        ...(action.key
          ? {
              byKey: {
                ...state.byKey,
                [action.key]: { data: [], loading: true, error: null },
              },
            }
          : { data: [], loading: true, error: null }),
      };
    case `${LIST_ULTIMAS}_SUCCESS`:
      return {
        ...state,
        ...(action.key
          ? {
              byKey: {
                ...state.byKey,
                [action.key]: {
                  data: action.result.items,
                  loading: false,
                  error: null,
                },
              },
            }
          : { data: action.result.items, loading: false, error: null }),
      };
    case `${LIST_ULTIMAS}_FAIL`:
      return {
        ...state,
        ...(action.key
          ? {
              byKey: {
                ...state.byKey,
                [action.key]: {
                  data: [],
                  loading: false,
                  error: action.error.response?.error || action.error,
                },
              },
            }
          : {
              data: [],
              loading: false,
              error: action.error.response?.error || action.error,
            }),
      };
    default:
      return state;
  }
}
