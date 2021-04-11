import {
  findGroupById,
  findAllGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addUsersToGroup,
} from '../data-access/group.js';
import { findUserById } from '../data-access/user.js';
import NotFoundError from '../errors/notFound.js';
import BadRequestError from '../errors/badRequest.js';

export default class GroupService {
  static async getGroup(id) {
    const group = await findGroupById(id);

    return group;
  }

  static async getAllGroups() {
    const groups = await findAllGroups();

    return groups;
  }

  static async addGroup({ name, permissions }) {
    const group = await createGroup(name, permissions);

    return group;
  }

  static async updateGroup(id, { name, permissions }) {
    const isGroupExist = !!(await findGroupById(id));

    if (isGroupExist) {
      await updateGroup(id, name, permissions);
    } else {
      throw new NotFoundError(`Group with id = ${id} cannot be updated`);
    }
  }

  static async deleteGroup(id) {
    const isGroupExist = !!(await findGroupById(id));

    if (isGroupExist) {
      await deleteGroup(id);
    } else {
      throw new NotFoundError(`Group with id = ${id} cannot be deleted`);
    }
  }

  static async addUsersToGroup(groupId, { userIds }) {
    const isGroupExist = !!(await findGroupById(groupId));
    if (!isGroupExist) {
      throw new NotFoundError(`Group with id = ${groupId} not found`);
    }

    const requests = userIds.map((userId) => findUserById(userId));
    const responses = await Promise.all(requests);

    const isUsersValid = responses.every((response) => !!response);
    if (!isUsersValid) {
      throw new BadRequestError(`User ids are invalid`);
    }

    await addUsersToGroup(groupId, userIds);
  }
}
