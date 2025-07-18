import { Router } from 'express';
import { login, refresh, logout, logoutAll, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { authenticateJWT } from '../../../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/logout-all', authenticateJWT, logoutAll);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router; 