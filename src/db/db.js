import Sequelize from 'sequelize';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

let sequelize;

function getSequelize() {
  if (!sequelize) {
    sequelize = new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );
  }

  return sequelize;
}

export default getSequelize;
