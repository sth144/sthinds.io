/**
 * Prototype used to configure the 'shape' of the global Redux datastore
 *  - initially, state will be set to this object
 *  - state is cached in browser localStorage after first use, so on subsequent
 *      reloads, state will persist
 *  - properties will be mutated by user interaction
 */
export type StatePrototype = {
  user: string,
};

/**
 * default initializations for state prototype
 */
export const statePrototype: StatePrototype = {
  user: ""
};

// TODO: make sure this gets cached in localStorage