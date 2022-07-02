export interface IAuthenticationState {
  isLoggedIn: boolean,
  email: string | null,
  firstName: string | null,
  lastName: string | null,
  token: string | null
} 

export enum OAuthProvider {
  Google = "Google"
};

export interface IGoogleAuthProfile {
  id: string,
  emails: { value: string }[],
  name: {
    givenName: string,
    familyName: string
  }
}
