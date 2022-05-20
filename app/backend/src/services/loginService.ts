import Users from '../database/models/users';

class LoginService {
  static async findOne(email:string) {
    const user: (Users | null) = await Users.findOne({ where: { email } });
    return user;
  }
}

export default LoginService;
