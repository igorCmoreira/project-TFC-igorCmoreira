import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginValidation from '../middlewares/loginValidation';
import IsValidate from '../middlewares/isAuthorizate';

const router = Router();

const loginController = new LoginController();
const loginValidation = new LoginValidation();

router.post(
  '/login',
  loginValidation.emailValidator,
  IsValidate.correctDate,
  loginValidation.passwordValidator,
  loginController.authorize,
);
router.get('/login/validate', loginController.validate);

export default router;
