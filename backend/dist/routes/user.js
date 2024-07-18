"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const role_1 = require("../controllers/role"); // Asegúrate de importar el controlador para roles
const router = (0, express_1.Router)();
router.post('/user', user_1.newUser);
router.post('/login', user_1.loginUser);
router.post('/role', role_1.newRole); // Ruta para crear un nuevo rol
exports.default = router;
