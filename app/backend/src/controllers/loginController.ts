import { RequestHandler } from 'express';
import LoginService from '../services/loginService';
import userService from '../services/userService';
import Auth from '../services/authService';
import Users from '../database/models/users';
import Login from '../interfaces/login.interface';

class LoginController {
  public authorize: RequestHandler = async (req, res, next) => {
    try {
      const request: Login = req.body;
      const { email, password } = request;
      const user:(Users | null) = await LoginService.findOne(email);
      if (!user) {
        return res.status(401).send({ message: 'Incorrect email or password' });
      }
      const passValid = Auth.checkPassword(user?.password, password);
      if (!passValid) {
        return res.status(401).send({ message: 'Incorrect email or password' });
      }
      const result = Auth.validLogin(user);
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  public validate: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).end();
      }
      const id: number = Auth.checkToken(authorization);
      const user: (Users | null) = await userService.findByPk(id);
      return res.status(200).send(user?.role);
    } catch (err) {
      next(err);
    }
  };
}

export default LoginController;
