import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ServerException } from '../utils/errors';

const userService = new UserService();

export async function injectUser(req, res, next) {
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
        uid: user.uid,
        orgId: user.organization?.orgId,
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
