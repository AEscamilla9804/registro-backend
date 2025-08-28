import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import conectarDB from './config/db.js';
import staffRoutes from './routes/staffRoutes.js'
import asistenteRoutes from './routes/asistenteRoutes.js';
import tallerRoutes from './routes/tallerRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const allowedDomains = ['http://localhost:5173'];

// CORS config
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, same server)
    if (!origin || allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  }
};

app.use(cors(corsOptions));

app.use('/api/staff', staffRoutes);
app.use('/api/asistentes', asistenteRoutes);
app.use('/api/talleres', tallerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});