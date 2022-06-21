import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      // TODO: add these to dev .env and build/test and prod environments
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      scope: ["email", "profile"]
    });
  }

  async validate(accessToken: string,
                 refreshToken: string,
                 profile: { name, emails },
                 done: VerifyCallback) {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken
    };

    done(null, user);
  }
}
