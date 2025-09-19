import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { GoogleOAuthService } from 'authentication/google-oauth.service';
import { IGoogleAuthProfile } from 'sthinds.io-lib';

config();

/**
 * used for authentication directly from Nest.JS (not React client)
 */
@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly oauthService: GoogleOAuthService) {
    super({
      // TODO: add these to dev .env and build/test and prod environments
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: IGoogleAuthProfile,
    done: VerifyCallback,
  ) {
    try {
      const jwt: string = await this.oauthService.getGoogleOAuthLoginJWT(
        profile,
      );
      const user = {
        jwt,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      };

      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
