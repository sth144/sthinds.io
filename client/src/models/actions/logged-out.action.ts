/**
 * action dispatched when OAuth2 login initiated (not confirmed by server, JWT not 
 *  yet issued)
 */
export const LOGGED_OUT = "LOGGED_OUT";
export function loggedOut() {
  return {
    type: LOGGED_OUT,
    payload: true
  }
}