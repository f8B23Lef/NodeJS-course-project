import jwt from 'jsonwebtoken';
import { findUser } from '../data-access/user.js';
import NotFoundError from '../errors/notFound.js';

export default class AuthService {
  static async login({ login, password }) {
    const isUserExist = !!(await findUser(login, password));
    if (isUserExist) {
      const token = AuthService.generateAccessToken(login);
      return { token };
    }
    throw new NotFoundError(
      'User with current login and password was not found',
    );
  }

  static generateAccessToken(login) {
    return jwt.sign({ login }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
  }
}
