import { RequestHandler } from 'express';
import Users from '../database/models/users';
import Auth from '../services/authService';
import userService from '../services/userService';

class IsValidate {
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
