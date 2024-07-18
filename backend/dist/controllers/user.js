"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, password, email, roleId, telefono } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //console.log(hashedPassword)
    //verificamos si ya existe un usuario creado
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con este mail'
        });
    }
    try {
        //guardamos usuario en la base de datos
        yield user_1.User.create({
            name,
            lastName,
            password: hashedPassword,
            email,
            roleId,
            telefono
        });
        // Envía una respuesta al cliente indicando que el usuario fue creado exitosamente
        res.status(201).json({
            msg: 'Nuevo usuario creado'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error al intentar crear un usuario',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //validamos si el usuario ya existe en la base de datos
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario ingresado no existe',
            });
        }
        //validamos password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Password incorrecta'
            });
        }
        //generamos token
        const token = jsonwebtoken_1.default.sign({
            email: email
        }, process.env.SECRET_KEY || 'probando123');
        //tambien se puede agregar el tiempo de expiracion del token
        //}, process.env.SECRET_KEY || 'probando123', {
        //expiresIn: '10000'
        //});
        res.json(token);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al intentar logearse',
            error
        });
    }
});
exports.loginUser = loginUser;
