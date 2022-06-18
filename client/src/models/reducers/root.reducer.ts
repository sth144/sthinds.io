
import { statePrototype } from "../state.prototype";
import { Action } from "redux"
import { ARTICLE_SELECTED } from "models/actions/article-selected.action";
import { INITIALIZE } from "models/actions/initialize.action";

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
      // TODO: implement ARTICLE_SELECTED reducer
      return;
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