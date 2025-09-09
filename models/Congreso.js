import mongoose, { mongo } from "mongoose";

const congresoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    costo: {
        type: Number,
        required: true,
    }
});

const Congreso = mongoose.model('Congreso', congresoSchema);
export default Congreso;