import { IAuthenticationState } from "sthinds.io-lib";
import { IArticle } from "sthinds.io-lib";

/**
 * Prototype used to configure the 'shape' of the global Redux datastore
 *  - initially, state will be set to this object
 *  - state is cached in browser localStorage after first use, so on subsequent
 *      reloads, state will persist
 *  - properties will be mutated by user interaction
 */
export type StatePrototype = {
  article: IArticle,
  authentication: IAuthenticationState,
};

/**
 * default initializations for state prototype
 */
export const statePrototype: StatePrototype = {
  article: {
    title: "",
    subtitle: "",
    authorID: "",
    date: "",
    text: ""
  },
  /**
   * login / authentication
   */
  authentication: {
    _id: null,
    loginInitiated: false,
    isLoggedIn: false,
    email: null,
    userID: null,
    firstName: null,
    lastName: null,
    token: null
  }
};
