import { Op } from 'sequelize';
import sequelize from '../db/db.js';
import User from '../models/user.js';
import DataAccessError from '../errors/dataAccess.js';

async function createUser(login, password, age) {
  try {
    const user = await User.create({ login, password, age });

    return user;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function updateUser(id, login, password, age) {
  try {
    const user = await User.update(
      { login, password, age },
      {
        where: {
          id,
        },
      },
    );

    return user[0];
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function deleteUser(id) {
  try {
    const user = await User.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
      },
    );

    return user[0];
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function findUserById(id, showDeleted = false) {
  try {
    const user = await User.findOne({
      where: {
        id,
        isDeleted: {
          [Op.eq]: showDeleted,
        },
      },
    });

    return user;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function findUsersByLogin(loginSubstring, limit) {
  try {
    const users = await User.findAll({
      where: {
        isDeleted: {
          [Op.eq]: false,
        },
        login: {
          [Op.like]: `${loginSubstring}%`,
        },
      },
      order: sequelize.col('login'),
      limit,
    });

    return users;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

export { createUser, updateUser, deleteUser, findUserById, findUsersByLogin };
