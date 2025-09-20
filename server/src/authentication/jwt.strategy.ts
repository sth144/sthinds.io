import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly userResolver: UserResolver,
    private readonly userService: UserService, // Inject UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  public async validate(payload, done: Function) {
    try {
      if (process.env.NODE_ENV === "development") {
        const user = await this.userService.findOneByEmail(payload.email);
        if (!user) {
          // Create a mock user if it doesn't exist
          const newUser = await this.userResolver.createUser(
            payload.email,
            "FirstName", // Replace with actual first name
            "LastName", // Replace with actual last name
            "accessToken", // Replace with actual access token
            "thirdPartyID", // Replace with actual third party ID
            OAuthProvider.GOOGLE, // Replace with actual provider
          );
          return done(null, newUser);
        }
        return done(null, user);
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
