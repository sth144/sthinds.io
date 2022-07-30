
import { StatePrototype, statePrototype } from "../state.prototype";
import { Action } from "redux"
import { ARTICLE_SELECTED } from "models/actions/article-selected.action";
import { INITIALIZE } from "models/actions/initialize.action";
import { LOGIN_INITIATED } from "models/actions/login-initiated.action";
import { LOGIN_SUCCEEDED } from "models/actions/login-succeeded.action";
import { LOGIN_UID_RETRIEVED } from "models/actions/login-uid-retrieved.action";
import { LOGGED_OUT } from "models/actions/logged-out.action";

// TODO: refactor this into composite reducers when it gets too unwieldly (use combineReducers())

/**
 * rootReducer is the main reducer for the global redux store
 *  - all actions are passed through here to generate new states
 */
export default function rootReducer(previousState: unknown, 
                                    action: Action & { payload: unknown }) {
  /**
   * initially, previousState will be undefined, return state prototype
   */
  if (typeof previousState === "undefined") {
    return statePrototype;
  }
  /**
   * handle actions dispatched after initialization
   */
  switch (action.type) {
    case ARTICLE_SELECTED: {
      const newState: Partial<StatePrototype> = Object.assign({ } , previousState);
      return Object.assign(newState, {
        article: action.payload
      });
    }

    case LOGIN_INITIATED: {
      const newState = Object.assign({ } , previousState);
      return Object.assign(newState.authentication, action.payload);
    }

    case LOGIN_SUCCEEDED: {
      const newState = Object.assign({ } , previousState);
      return Object.assign(newState, {
        authentication: action.payload
      });
    }

    case LOGIN_UID_RETRIEVED: {
      const newState = Object.assign({ }, previousState);
      const newStateAuthentication = newState.authentication;
      Object.assign(newStateAuthentication, {
        _id: action.payload
      });

      return Object.assign(newState, {
        authentication: newStateAuthentication
      });
    }

    case LOGGED_OUT: {
      const newState = Object.assign({ } , previousState);
      return Object.assign(newState, {
        authentication: {
          isLoggedIn: false,
          email: null,
          firstName: null,
          lastName: null,
          token: null
        }
      });
    }

    case INITIALIZE: {
      /** handle the initialization action (dispatched at startup) */
      return Object.assign({ }, previousState, action.payload);
    }

    default: {
      return previousState;
    }
  }
}