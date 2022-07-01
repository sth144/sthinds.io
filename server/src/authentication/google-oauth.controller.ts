import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOAuthService } from './google-oauth.service';

// TODO: move these to an OAuth controller in a separate file
//        - write unit tests
@Controller("google")
export class GoogleOAuthController {
  constructor(private readonly oauthService: GoogleOAuthService) {}
  
  /** for authentication directly from Nest */
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const loginInfo = this.oauthService.googleOAuthLogin(req);

    // TODO: create a JWT and redirect client with it
    //  - https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071
    //  - https://stackoverflow.com/questions/72363135/how-to-get-jwt-token-from-url-in-react-using-react-router-dom-v6

    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(
        `/login/success/${req.user.email}/${req.user.firstName}/${req.user.lastName}/${jwt}`);
    else 
      res.redirect('/login/failure');
  }
}