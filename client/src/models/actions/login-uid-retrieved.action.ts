/**
 * action dispatched user ID retrieved from server after an OAuth login
 */
 export const LOGIN_UID_RETRIEVED = "LOGIN_IUID_RETRIEVED";
 export function loginUIDRetrieved(payload) {
   return {
     type: LOGIN_UID_RETRIEVED,
     payload
   }
 }