import { ActionTypes, Actions } from './users.actions';

import { User } from '../core/models/user.model';

const initialState: State = {
  authenticated: false,
  loaded: false,
  loading: false
}

export interface State {

  // Boolean if user is authenticated.
  authenticated: boolean;

  // Error message.
  error?: string;

  // True if we have attempted existing auth session.
  loaded: boolean;

  // True when loading.
  loading: boolean;

  // The user object, if authenticated.
  user?: User;
}

export function reducer(state: any = initialState, action: Actions): State {

  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
      return { ...state, loading: true};

    case ActionTypes.AUTHENTICATED_ERROR:
      return { ...state,
        authenticated: false,
        error: action.payload.error.message,
        loaded: true
      };

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return { ...state, 
        authenticated: action.payload.authenticated,
        loaded: true,
        user: action.payload.user
      };

    case ActionTypes.AUTHENTICATION_ERROR:
    case ActionTypes.SIGN_UP_ERROR:
      return { ...state, 
        authenticated: false,
        error: action.payload.error.message,
        loading: false
      };

    case ActionTypes.AUTHENTICATION_SUCCESS:
      var user: User = action.payload.user;

      if(user === null) {
        return state;
      }
      
      return { ...state, 
        authenticated: true,
        error: undefined,
        loading: false,
        user: user
      };
    case ActionTypes.SIGN_UP_SUCCESS:
      var user: User = action.payload.user;

      if(user === null) {
        return state;
      }
      
      return { ...state, 
        authenticated: false,
        error: undefined,
        loading: false,
        user: user
      };

    case ActionTypes.SIGN_OUT:
      return { ...state,
        loading: true
      }

    case ActionTypes.SIGN_OUT_ERROR:
      return { ...state, 
        authenticated: true,
        error: action.payload.error.message,
        user: undefined,
        loading: false
      };

    case ActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, 
        authenticated: false,
        error: undefined,
        user: undefined,
        loading: false
      };

    case ActionTypes.SIGN_UP:
      return { ...state, 
        authenticated: false,
        error: undefined,
        loading: true
      };

    default:
      return state;
  } // End of action types.
} // End of Reducer

// ==============================================
// Selector functions
// ==============================================

/**
 * Returns true if the user is authenticated.
 * @function isAuthenticated
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticated = (state: State) => state.authenticated;

/**
 * Returns true if the authenticated has loaded.
 * @function isAuthenticatedLoaded
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticatedLoaded = (state: State) => state.loaded;

/**
 * Return the users state
 * @function getAuthenticatedUser
 * @param {State} state
 * @returns {User}
 */
export const getAuthenticatedUser = (state: State) => state.user;

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @returns {Error}
 */
export const getAuthenticationError = (state: State) => state.error;

/**
 * Returns true if request is in progress.
 * @function isLoading
 * @param {State} state
 * @returns {boolean}
 */
export const isLoading = (state: State) => state.loading;

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {State} state
 * @returns {Error}
 */
export const getSignOutError = (state: State) => state.error;

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {State} state
 * @returns {Error}
 */
export const getSignUpError = (state: State) => state.error;