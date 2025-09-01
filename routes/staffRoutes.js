import express from 'express';
import { registrar, login, perfil } from '../controllers/staffController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Área Pública
router.post('/registrar', registrar);
router.post('/login', login);

// Área Privada
router.get('/perfil', checkAuth, perfil);

export default router;