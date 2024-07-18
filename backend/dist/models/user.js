"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const conecction_1 = __importDefault(require("../db/conecction"));
const role_1 = require("./role"); // Importar el modelo Role
exports.User = conecction_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(15), // Ajusta el tamaño según sea necesario
        allowNull: true // Opcional: Define si el campo puede ser nulo o no
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: role_1.Role,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: true
});
exports.User.belongsTo(role_1.Role, { foreignKey: 'roleId' });
role_1.Role.hasMany(exports.User, { foreignKey: 'roleId' });
