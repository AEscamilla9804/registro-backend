import express from 'express';
import { 
    registrarAsistente,
    obtenerDatosAsistente,
    actualizarAsistente
} from '../controllers/asistenteController.js';

const router = express.Router();

router.post('/registrar', registrarAsistente);
router.patch('/:id', actualizarAsistente);
router.get('/search', obtenerDatosAsistente);

export default router;