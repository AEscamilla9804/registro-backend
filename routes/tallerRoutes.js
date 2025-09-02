import express from 'express';
import { 
    registrarTaller, 
    consultarTalleres,
    detallesTaller
} from '../controllers/tallerController.js';

const router = express.Router();

router.get('/', consultarTalleres);
router.post('/registrar', registrarTaller);
router.get('/:id', detallesTaller);

export default router;