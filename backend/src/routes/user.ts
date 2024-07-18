import {Router} from 'express'
import {loginUser, newUser } from '../controllers/user';
import { newRole } from '../controllers/role'; // Asegúrate de importar el controlador para roles

const router = Router();

router.post('/user', newUser);
router.post('/login', loginUser);
router.post('/role', newRole); // Ruta para crear un nuevo rol

export default router;
