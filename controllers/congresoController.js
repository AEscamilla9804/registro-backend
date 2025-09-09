import Congreso from "../models/Congreso.js";

const registrarCongreso = async (req, res) => {
    try {
        const congreso = new Congreso(req.body);
        const congresoGuardado = await congreso.save();
        res.status(201).json(congresoGuardado);
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar el congreso' });
    }
}

const consultarCongreso = async (req, res) => {
    try {
        const congreso = await Congreso.findOne();
        if (!congreso) return res.status(404).json({ msg: "No se encontró información del Congreso" });
        res.status(200).json(congreso);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los datos del Congreso' });
    }
}

export {
    registrarCongreso,
    consultarCongreso
}