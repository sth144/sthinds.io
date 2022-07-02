import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO: move these to an OAuth controller in a separate file
//        - write unit tests
@Controller("google")
export class GoogleOAuthController {
  constructor() {}
  
  /** for authentication directly from Nest */
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {

    // TODO: create a JWT and redirect client with it
    //  - https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071

    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(
        `/login/success/${req.user.email}/${req.user.firstName}/${req.user.lastName}/${jwt}`);
    else 
      res.redirect('/login/failure');
  }

  // TODO: use JWT to protect graphql API
  //        - https://egghead.io/lessons/graphql-securing-graphql-backends-with-jwts
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req) {
    return 'JWT is working!';
  }
}