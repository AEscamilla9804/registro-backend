import mongoose from "mongoose";
import bcrypt from "bcrypt";

const staffSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    numCajero: {
        type: Number,
        required: true
    }
});

// Hashear la contraseña previo a guardar un registro
staffSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comprobar contraseña
staffSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;