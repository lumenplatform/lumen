import * as express from 'express';
import { AuthController } from '../controllers';
import { guard } from '../middleware/security';
import { AuthService } from '../services/auth.service';
import { createResponse } from '../utils/response-mapper';

export const authRouter = express.Router();

const authController = new AuthController();
const authService = new AuthService();

authRouter.use(guard.isAuthenticated);

authRouter.get('/me', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});
