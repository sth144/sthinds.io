/**
 * action dispatched when OAuth2 login initiated (not confirmed by server, JWT not
 *  yet issued)
 */
export const LOGIN_INITIATED = "LOGIN_INITIATED";
export function loginInitiated(payload: unknown) {
  return {
    type: LOGIN_INITIATED,
    payload,
  };
}
