import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nombre_db', 'root', '*****', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
