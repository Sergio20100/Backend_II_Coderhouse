import UserDTO from '../DAOs/DTOs/user.dto.js';

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getUsers = async () => {
    return await this.dao.get();
  };
  getUserById = async (id) => {
    return await this.dao.getById(id);
  };
  getUserByEmail = async (email) => {
    return await this.dao.getByEmail(email);
  };
  createUser = async (user) => {
    const userToInsert = new UserDTO(user);
    return await this.dao.post(userToInsert.user);
  };
  updateUser = async (id,user) => {
    const userToInsert = new UserDTO(user);
    return await this.dao.put(id,userToInsert.user);
  };
  deleteById = async (id) => {
    return await this.dao.delete(id);
  };
}