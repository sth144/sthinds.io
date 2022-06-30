import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

/**
 * used for authentication directly from Nest.JS (not React client)
 */
@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      // TODO: add these to dev .env and build/test and prod environments
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["email", "profile"]
    });
  }

  async validate(request: Request,
                 accessToken: string,
                 refreshToken: string,
                 profile: { name, emails },
                 done: VerifyCallback) {
    // const { name, emails } = profile;

    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   accessToken
    // };

    // done(null, user);

    try {
        console.log(profile);

        const jwt: string = 'placeholderJWT'
        const user = 
        {
            jwt
        }

        done(null, user);
    } catch(err) {
        // console.log(err)
        done(err, false);
    }
  }
}
