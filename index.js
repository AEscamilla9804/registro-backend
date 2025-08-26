import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import staffRoutes from './routes/staffRoutes.js'
import asistenteRoutes from './routes/asistenteRoutes.js';
import tallerRoutes from './routes/tallerRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

app.use('/api/staff', staffRoutes);
app.use('/api/asistentes', asistenteRoutes);
app.use('/api/talleres', tallerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});