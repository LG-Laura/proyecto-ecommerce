import { DataTypes } from 'sequelize';
import sequelize from '../db/conecction';
import { Role } from './role'; // Importar el modelo Role

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING(15), // Ajusta el tamaño según sea necesario
        allowNull: true // Opcional: Define si el campo puede ser nulo o no
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: true
});

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });