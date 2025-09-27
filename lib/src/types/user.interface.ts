export interface IUser {
  _id?: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  accessToken: string | null;
  thirdPartyID: string | null;
  thirdPartyIDProvider: OAuthProvider;
}

export enum OAuthProvider {
  Google = "Google",
}

export interface IAuthenticationState extends IUser {
  isLoggedIn: boolean;
}

export interface IGoogleAuthProfile {
  id: string;
  displayName: string;
  emails: {
    value: string;
  }[];
  name: {
    givenName: string;
    familyName: string;
  };
}
