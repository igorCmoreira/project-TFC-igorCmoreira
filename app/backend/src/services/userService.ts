import Users from '../database/models/users';

class UserService {
  static async findByPk(id:number) {
    const user: (Users | null) = await Users.findByPk(id);
    return user;
  }
}

export default UserService;
