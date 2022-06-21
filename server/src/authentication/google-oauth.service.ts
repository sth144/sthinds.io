import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthService {

  // TODO: move this to an OAuth service in separate file
  googleOAuthLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
} 