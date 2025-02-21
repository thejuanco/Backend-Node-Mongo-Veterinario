//Contiene las rutas del veterinario
import express from 'express';
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPefil,
  actualizarPassword
} from "../controllers/veterinarioController.js";
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//Area publica
router.post('/', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', autenticar)
router.post('/olvide-password', olvidePassword)
//Cuando se apunta a una ruta con un get y post se puede simplificar
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

//Area privada
router.get('/perfil', checkAuth, perfil)
router.put('/perfil/:id', checkAuth, actualizarPefil)
router.put('/cambiar-contra', checkAuth, actualizarPassword)

export default router