import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ServerException } from '../utils/errors';

const userService = new UserService();

export async function injectUser(req: Request, res, next) {
  try {
    if (req.header('authorization')) {
      const token = req.header('authorization').split(' ').pop();

      const payload = await AuthService.getPayloadFromToken(token);
      const user = await userService.userRepo.findOne(
        { email: payload.email },
        { cache: [`user-${payload.email}`, 60_000] }
      );
      req.user = {
        email: payload.email,
        uid: user?.uid || payload.sub,
        orgId: user?.organization?.orgId,
        name: user?.name || payload.name,
        picture: user?.picture || payload.picture,
      };
      req.isLoggedIn = true;
    }
    next();
  } catch (e) {
    next(e);
  }
}

export const guard = {
  isAuthenticated: function (req, res, next) {
    if (req.user && req.isLoggedIn) {
      next();
    } else {
      throw new ServerException('Unauthenticated Request', 401);
    }
  },
  hasClaim: (task: string) => (req, res, next) => {
    next();
  },
};
