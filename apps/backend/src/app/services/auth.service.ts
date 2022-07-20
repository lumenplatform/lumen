import * as jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

const secret = new JwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://lumn.eu.auth0.com/.well-known/jwks.json',
});

export class AuthService {
  static async getUserFromToken(token: string) {
    const decodedToken = jwt.decode(token, { complete: true });

    const key = await secret.getSigningKey(decodedToken.header.kid);

    return jwt.verify(token, key.getPublicKey(), {
      // audience: 'https://lumen.app',
      issuer: 'https://lumn.eu.auth0.com/',
      algorithms: ['RS256'],
    });
  }



  
}
