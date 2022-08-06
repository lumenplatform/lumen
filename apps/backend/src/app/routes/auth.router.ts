import * as express from 'express';
import { AuthController } from '../controllers';
import { AuthService } from '../services/auth.service';

export const authRouter = express.Router();

const authController = new AuthController();
const authService = new AuthService();

authRouter.use(guard.isAuthenticated);

authRouter.get('/me', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});
