import { RequestHandler } from 'express';
import Users from '../database/models/users';
import Auth from '../services/authService';
import userService from '../services/userService';
import LoginService from '../services/loginService';
import Login from '../interfaces/login.interface';

class IsValidate {
  public static correctDate:RequestHandler = async (req, res, next) => {
    const request: Login = req.body;
    const { email, password } = request;
    const user:(Users | null) = await LoginService.findOne(email);
    if (user?.email !== email || !user) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }
    const passValid = Auth.checkPassword(user?.password, password);
    if (!passValid) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }
    next();
  };

  public static validate: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).end();
    }
    const id: number = Auth.checkToken(authorization);
    const user: (Users | null) = await userService.findByPk(id);
    if (!user) {
      return res.status(401).end();
    }
    next();
  };
}

export default IsValidate;
