import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken';
import Users from '../database/models/users';

class Auth {
  public static checkPassword(pass:(string | undefined), password:string) {
    if (pass !== password) {
      return false;
    }
    return true;
  }

  public static getToken(user:Users) {
    const { id } = user;
    const token = sign(
      {
        id,
      },
      readFileSync('jwt.evaluation.key').toString(),
      { algorithm: 'HS256' },
    );
    return token;
  }

  public static checkToken(token:string) {
    const id = verify(token, readFileSync('jwt.evaluation.key').toString());
    if (typeof id === 'string') {
      return parseInt(id, 10);
    }
    return id.id;
  }

  public static validLogin(users:Users) {
    const token = this.getToken(users);
    const { id, username, role, email } = users;
    return { user: {
      id,
      username,
      role,
      email },
    token };
  }
}

export default Auth;
