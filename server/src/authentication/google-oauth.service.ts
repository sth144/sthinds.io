import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleOAuthService {

  public googleOAuthLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
} 