import UserDTO from '../DAOs/DTOs/user.dto.js';

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = async () => {
    return await this.dao.get();
  };
  createUser = async (user) => {
    const userToInsert = new UserDTO(user);
    return await this.dao.post(userToInsert);
  };
}