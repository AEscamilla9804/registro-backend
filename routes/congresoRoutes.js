import express from 'express';
import { registrarCongreso, consultarCongreso } from '../controllers/congresoController.js';

const router = express.Router();

router.get('/', consultarCongreso);
router.post('/registrar', registrarCongreso);

export default router;