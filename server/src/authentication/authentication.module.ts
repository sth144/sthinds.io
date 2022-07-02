import { Module } from '@nestjs/common';
import { GoogleOAuthStrategy } from "./google-oauth.strategy";
import { GoogleOAuthController } from "./google-oauth.controller"
import { GoogleOAuthService } from "./google-oauth.service"
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from 'models/user/user.module';
import { UserService } from 'models/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [GoogleOAuthController],
  providers: [
    GoogleOAuthService, 
    GoogleOAuthStrategy, 
    JwtStrategy
  ]
})
export class AuthenticationModule { }
