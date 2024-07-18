import { Sequelize } from "sequelize";

const sequelize = new Sequelize('sonata', 'root', 'Lula1980!', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;