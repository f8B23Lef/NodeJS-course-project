import Group from '../models/group.js';
import UserGroup from '../models/userGroup.js';
import DataAccessError from '../errors/dataAccess.js';
import sequelize from '../db/db.js';

async function findGroupById(id) {
  try {
    const group = await Group.findByPk(id);

    return group;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function findAllGroups() {
  try {
    const groups = await Group.findAll();

    return groups;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function createGroup(name, permissions) {
  try {
    const group = await Group.create({ name, permissions });

    return group;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function updateGroup(id, name, permissions) {
  try {
    const group = await Group.update(
      { name, permissions },
      {
        where: {
          id,
        },
      },
    );

    return group[0];
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function deleteGroup(id) {
  try {
    const isDeleted = await Group.destroy({
      where: {
        id,
      },
    });

    return isDeleted;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function addUsersToGroup(groupId, userIds) {
  const transaction = await sequelize.transaction();
  try {
    const requests = userIds.map((userId) =>
      UserGroup.create({ groupId, userId }, { transaction }),
    );
    await Promise.all(requests);
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw new DataAccessError(err);
  }
}

export {
  findGroupById,
  findAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup,
};
