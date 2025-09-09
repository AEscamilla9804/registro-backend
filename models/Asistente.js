import mongoose from "mongoose";
import capitalizarPalabras from "../helpers/capitalizarPalabras.js";

const asistenteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidoP: {
        type: String,
        required: true,
        trim: true
    },
    apellidoM: {
        type: String,
        required: true,
        trim: true
    },
    nombreCompleto: {
        type: String,
        trim: true
    },
    pais: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    especialidad: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        enum: ["Médico", "Residente"],
        required: true,
    },
    congreso: {
        type: Boolean
    },
    talleres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Taller"
    }],
    pago: {
        type: String,
        enum: ["efectivo", "tarjeta", "transferencia"],
        required: true
    },
    importe: {
        type: Number,
        required: true
    },
    factura: {
        type: Boolean,
        required: true
    },
    beca: {
        type: String,
        default: null
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    qr: {
        type: String,
        default: null
    },
    rfid: {
        type: String,
        default: null
    },
    constancia: {
        type: String,
        default: null
    },
    gafete: {
        type: String,
        default: null
    },
    regalo: {
        type: Boolean,
        default: false
    },
    gafeteImpreso: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

asistenteSchema.pre('save', function (next) {
    if (this.nombre) this.nombre = capitalizarPalabras(this.nombre);

    if (this.apellidoP) this.apellidoP = capitalizarPalabras(this.apellidoP);

    if (this.apellidoM) this.apellidoM = capitalizarPalabras(this.apellidoM);

    if (this.especialidad) this.especialidad = capitalizarPalabras(this.especialidad);

    this.nombreCompleto = `${this.nombre} ${this.apellidoP} ${this.apellidoM}`.trim();

    next();
})

const Asistente = mongoose.model('Asistente', asistenteSchema);
export default Asistente;