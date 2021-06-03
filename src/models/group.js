import { DataTypes } from 'sequelize';
import getSequelize from '../db/db.js';

let Group = null;

function getGroup() {
  if (!Group) {
    Group = getSequelize().define(
      'Group',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        permissions: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
      },
      {
        timestamps: false,
      },
    );
  }

  return Group;
}

export default getGroup;
