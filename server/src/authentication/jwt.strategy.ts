import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  public async validate(payload, done: Function) {
    try {
      if (process.env.NODE_ENV === "development") {
        // Return a mock user in development mode
        const mockUser = {
          _id: "mockUserId",
          email: "test@example.com",
          firstName: "Test",
          lastName: "User",
          isLoggedIn: true,
        };
        return done(null, mockUser);
      }

      // TODO: You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);
      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException("unauthorized", err.message);
    }
  }
}
