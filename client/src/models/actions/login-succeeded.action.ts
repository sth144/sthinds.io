/**
 * action dispatched when OAuth2 login initiated (not confirmed by server, JWT not 
 *  yet issued)
 */
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export function loginSucceeded(payload) {
  return {
    type: LOGIN_SUCCEEDED,
    payload
  }
}