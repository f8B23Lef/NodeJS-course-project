import sequelize from '../db/db.js';
import User from './user.js';
import Group from './group.js';

const UserGroup = sequelize.define(
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

export default UserGroup;
