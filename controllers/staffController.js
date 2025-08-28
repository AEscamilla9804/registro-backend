import Staff from "../models/Staff.js";

const registrar = async (req, res) => {
    try {
        // Guardar a un nuevo miembro del staff
        const staff = new Staff(req.body);
        const staffGuardado = await staff.save();
        res.status(201).json(staffGuardado);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }

        console.log(error);
        res.status(500).json({ msg: "Error al registrar el staff" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar que el ususario existe
    const staff = await Staff.findOne({ email });

    if (!staff) {
        const error = new Error('El ususario no existe');
        return res.status(403).json({ msg: error.message, error: true });
    }

    // Validar contraseña
    if (await staff.comprobarPassword(password)) {
        res.status(200).json({
            _id: staff._id,
            nombre: staff.nombre,
            email: staff.email,
            rol: staff.rol,
            numCajero: staff.numCajero
        })
    } else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(403).json({ msg: error.message, error: true });
    }
}

export {
    registrar,
    login
}