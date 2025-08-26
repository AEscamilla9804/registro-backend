import mongoose from "mongoose";

const tallerSchema = mongoose.Schema({
    taller: {
        type: String,
        required: true,
        trim: true
    },
    ponente: {
        type: String,
        required: true,
        trim: true 
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    cupo: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const Taller = mongoose.model('Taller', tallerSchema);
export default Taller;