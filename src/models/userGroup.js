import getSequelize from '../db/db.js';
import User from './user.js';
import Group from './group.js';

let UserGroup = null;

function getUserGroup() {
  if (!UserGroup) {
    UserGroup = getSequelize.define(
      'UserGroup',
      {},
      {
        tableName: 'UserGroup',
        timestamps: false,
      },
    );

    User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
    Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });

    UserGroup.sync({ alter: true });
  }

  return UserGroup;
}

export default getUserGroup;
