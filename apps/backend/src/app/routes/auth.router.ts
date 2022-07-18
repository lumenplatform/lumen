import * as express from 'express';
import { AuthController } from '../controllers';
import { guard } from '../middleware/security';
import { AuthService } from '../services/auth.service';
import { createResponse } from '../utils/response-mapper';

export const authRouter = express.Router();

const authController = new AuthController();
const authService = new AuthService();

authRouter.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const user = authController.validateUser(username, password);
  console.log(user);
  const token = AuthService.generateAccessToken(user);

  res.json({ token });
});

// authRouter.use(guard.isAuthenticated);
