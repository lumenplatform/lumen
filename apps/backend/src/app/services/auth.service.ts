import * as jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'test';

export class AuthService {
  static generateAccessToken(payload) {
    const options = {
      expiresIn: '1800s',
    };

    return jwt.sign(payload, TOKEN_SECRET, options);
  }

  static getUserFromToken(token: string) {
    return jwt.verify(token, TOKEN_SECRET);
  }
}
