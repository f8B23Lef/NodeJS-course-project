import {
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUsersByLogin,
} from '../data-access/user.js';
import NotFoundError from '../errors/notFound.js';

export default class UserService {
  static formUser({ id, login, password, age }) {
    return {
      id,
      login,
      password,
      age,
    };
  }

  static async addUser({ login, password, age }) {
    const user = await createUser(login, password, age);

    return user ? UserService.formUser(user) : null;
  }

  static async updateUser(id, { login, password, age }) {
    const isUserExist = !!(await findUserById(id));

    if (isUserExist) {
      await updateUser(id, login, password, age);
    } else {
      throw new NotFoundError(`User with id = ${id} cannot be updated`);
    }
  }

  static async deleteUser(id) {
    const isUserExist = await findUserById(id);
    if (isUserExist) {
      await deleteUser(id);
    } else {
      throw new NotFoundError(`User with id = ${id} cannot be deleted`);
    }
  }

  static async getUser(id) {
    const user = await findUserById(id);

    return user ? UserService.formUser(user) : null;
  }

  static async getAutoSuggestUsers({ loginSubstring, limit }) {
    const users = await findUsersByLogin(loginSubstring, limit);

    return users ? users.map((user) => UserService.formUser(user)) : [];
  }
}
