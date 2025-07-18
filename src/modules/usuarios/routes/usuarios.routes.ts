import { Router } from 'express';
import { createUsuario, getUsuario, getAllUsuarios, updateUsuario, deleteUsuario, getMe } from '../controllers/usuarios.controller';
import { authenticateJWT } from '../../../middleware/auth.middleware';

const router = Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.get('/me', authenticateJWT, getMe);
router.get('/:id', getUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router; 