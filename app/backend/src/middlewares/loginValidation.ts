import { RequestHandler } from 'express';

class LoginValidation {
  public emailValidator: RequestHandler = (req, res, next) => {
    const { email } = req.body;
    if (email === undefined || email.length === 0) {
      return res.status(400)
        .send({ message: 'All fields must be filled' });
    }
    next();
  };

  public passwordValidator:RequestHandler = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400)
        .send({ message: 'All fields must be filled' });
    }
    if (password.length < 6) {
      return res.status(400)
        .send({ message: '"password" must be a valid password' });
    }
    next();
  };
}

export default LoginValidation;
