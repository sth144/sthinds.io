import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserResolver } from "../models/user/user.resolver"; // Correct import path
import { UserService } from "../models/user/user.service"; // Correct import path
import { OAuthProvider } from "sthinds.io-lib"; // Import OAuthProvider

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
            OAuthProvider.Google, // Replace with actual provider
          );
          return done(null, newUser);
        }
        return done(null, user);
      }

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException("unauthorized", err.message);
    }
  }
}
