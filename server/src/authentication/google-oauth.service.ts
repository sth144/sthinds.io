import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser, OAuthProvider, IGoogleAuthProfile } from "sthinds.io-lib";
import { sign } from "jsonwebtoken";
import { UserService } from 'models/user/user.service';

@Injectable()
export class GoogleOAuthService {

  constructor(private readonly userService: UserService) { }

  public async getGoogleOAuthLoginJWT(profile: IGoogleAuthProfile, 
                                      provider: OAuthProvider = OAuthProvider.Google) {
    try {
        let user: IUser = await this.userService.findOneByThirdPartyId(profile.id, provider)
        if (!user) {
          user = await this.userService.findOneByEmail(profile.emails[0].value);
        }                
        
        if (!user) {
          user = await this.userService.registerOAuthUser(profile, provider);
        }
        
        const thirdPartyId = profile.id;

        const payload = {
          thirdPartyId,
          provider
        }

        const jwt: string = sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });

        this.userService.patchUser(user._id, {
          accessToken: jwt
        });

        return jwt;
    } catch (err) {
      throw new InternalServerErrorException('getGoogleOAuthLoginJWT', err.message);
    }
  }
} 