import { RequestHandler } from 'express';

class LoginValidation {
  public emailValidator: RequestHandler = (req, res, next) => {
    const { email } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;
    if (email === undefined || email.length === 0) {
      return res.status(400)
        .send({ message: 'All fields must be filled' });
    }
    if (!regexEmail.test(email)) {
      return res.status(400)
        .send({ message: '"email" must be a valid email' });
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
