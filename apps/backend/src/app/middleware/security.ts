import { AuthService } from '../services/auth.service';
import { ServerError } from '../utils/errors';

export async function injectUser(req, res, next) {
  try {
    if (req.header('authorization')) {
      const token = req.header('authorization').split(' ').pop();
      req.user = AuthService.getUserFromToken(token);
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
      throw new ServerError('Unauthenticated Request', 401);
    }
  },
  hasClaim: (task: string) => (req, res, next) => {
    next();
  },
};
