import { Op } from 'sequelize';
import getSequelize from '../db/db.js';
import getUser from '../models/user.js';
import getUserGroup from '../models/userGroup.js';
import DataAccessError from '../errors/dataAccess.js';

async function createUser(login, password, age) {
  try {
    const user = await getUser().create({ login, password, age });

    return user;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function updateUser(id, login, password, age) {
  try {
    const user = await getUser().update(
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
  const transaction = await getSequelize().transaction();
  try {
    const user = await getUser().update(
      { isDeleted: true },
      {
        where: {
          id,
        },
        transaction,
      },
    );

    await getUserGroup().destroy({
      where: {
        userId: id,
      },
      transaction,
    });

    await transaction.commit();

    return user[0];
  } catch (err) {
    await transaction.rollback();
    throw new DataAccessError(err);
  }
}

async function findUserById(id, showDeleted = false) {
  try {
    const user = await getUser().findOne({
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
    const users = await getUser().findAll({
      where: {
        isDeleted: {
          [Op.eq]: false,
        },
        login: {
          [Op.like]: `${loginSubstring}%`,
        },
      },
      order: getSequelize().col('login'),
      limit,
    });

    return users;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function findUser(login, password) {
  try {
    const user = await getUser().findOne({
      where: {
        login,
        password,
        isDeleted: {
          [Op.eq]: false,
        },
      },
    });

    return user;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

export {
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUsersByLogin,
  findUser,
};
