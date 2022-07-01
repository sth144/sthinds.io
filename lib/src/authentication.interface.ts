export interface IAuthenticationState {
  isLoggedIn: boolean,
  email: string | null,
  firstName: string | null,
  lastName: string | null,
  token: string | null
} 