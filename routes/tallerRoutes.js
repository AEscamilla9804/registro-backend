import express from 'express';
import { 
    registrarTaller, 
    consultarTalleres,
    detallesTaller
} from '../controllers/tallerController.js';

const router = express.Router();

router.post('/registrar', registrarTaller);
router.get('/', consultarTalleres);
router.get('/:id', detallesTaller);

export default router;