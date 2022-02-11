
import { statePrototype } from "../state.prototype";
import { Action } from "redux"

// TODO: refactor this into composite reducers when it gets too unwieldly (use combineReducers())

/**
 * rootReducer is the main reducer for the global redux store
 *  - all actions are passed through here to generate new states
 */
export default function rootReducer(previousState: unknown, action: Action) {
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
        default: {
            return previousState;
        }
    }
}