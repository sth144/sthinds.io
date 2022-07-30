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
        // TODO: You can add some registration logic here, 
        // to register the user using their thirdPartyId (in this case their googleId)
        //  - store token in database
        let user: IUser = await this.userService.findOneByThirdPartyId(profile.id, provider);
        
        if (!user)
          user = await this.userService.registerOAuthUser(profile, provider);
        
        const thirdPartyId = profile.id;

        const payload = {
          thirdPartyId,
          provider
        }

        const jwt: string = sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
        return jwt;
    } catch (err) {
      throw new InternalServerErrorException('getGoogleOAuthLoginJWT', err.message);
    }
  }
} 