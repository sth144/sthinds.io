import { Module } from '@nestjs/common';
import { GoogleOAuthStrategy } from "./google-oauth.strategy";
import { GoogleOAuthController } from "./google-oauth.controller"
import { GoogleOAuthService } from "./google-oauth.service"

@Module({
  imports: [],
  controllers: [GoogleOAuthController],
  providers: [GoogleOAuthService, GoogleOAuthStrategy]
})
export class AuthenticationModule { }