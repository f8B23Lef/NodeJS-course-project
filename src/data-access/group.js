import getGroup from '../models/group.js';
import getUserGroup from '../models/userGroup.js';
import DataAccessError from '../errors/dataAccess.js';
import getSequelize from '../db/db.js';

async function findGroupById(id) {
  try {
    const group = await getGroup().findByPk(id);

    return group;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function findAllGroups() {
  try {
    const groups = await getGroup().findAll();

    return groups;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function createGroup(name, permissions) {
  try {
    const group = await getGroup().create({ name, permissions });

    return group;
  } catch (err) {
    throw new DataAccessError(err);
  }
}

async function updateGroup(id, name, permissions) {
  try {
    const group = await getGroup().update(
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
    const isDeleted = await getGroup().destroy({
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
  const transaction = await getSequelize.transaction();
  try {
    const requests = userIds.map((userId) =>
      getUserGroup().create({ groupId, userId }, { transaction }),
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
