import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "models/user/user.service";

// TODO: move these to an OAuth controller in a separate file
//        - write unit tests
@Controller("google")
export class GoogleOAuthController {
  constructor(private userService: UserService) {}

  /** for authentication directly from Nest */
  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}
  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const jwt: string = req.user.jwt;

    let _id = null;
    if ("_id" in req.user && req.user._id) {
      _id = req.user._id;
    } else {
      // Fetch MongoDB user to get _id
      const userFromDb = await this.userService.findOneByEmail(req.user.email);
      _id = userFromDb?._id.toString() ?? "";
    }
    if (jwt) {
      const redirectUrl =
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/login/success/${
              req.user.email
            }/${encodeURIComponent(req.user.firstName)}/${encodeURIComponent(
              req.user.lastName,
            )}/${jwt}/${_id}`
          : `/login/success/${req.user.email}/${req.user.firstName}/${req.user.lastName}/${jwt}/${_id}`;

      res.redirect(redirectUrl);
    } else {
      res.redirect("/login/failure");
    }
  }

  // TODO: use JWT to protect graphql API
  //        - https://egghead.io/lessons/graphql-securing-graphql-backends-with-jwts
  @Get("protected")
  @UseGuards(AuthGuard("jwt"))
  protectedResource(@Req() req) {
    return "JWT is working!";
  }
}
