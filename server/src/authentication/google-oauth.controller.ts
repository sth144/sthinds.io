import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthService } from './google-oauth.service';

// TODO: move these to an OAuth controller in a separate file
//        - write unit tests
@Controller("google")
export class GoogleOAuthController {
  constructor(private readonly oauthService: GoogleOAuthService) {}
  
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // TODO: redirect client to home page
    return this.oauthService.googleOAuthLogin(req)
  }
}