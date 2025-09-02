import Taller from "../models/Taller.js";
import mexicoToUTC from "../helpers/mexicoToUTC.js";

const registrarTaller = async (req, res) => {
    try {
        const { fecha } = req.body;
        const fechaUTC = mexicoToUTC(fecha);

        // Crear un nuevo evento
        const taller = new Taller({
            ...req.body,
            fecha: fechaUTC
        });
        const tallerGuardado = await taller.save();
        res.status(201).json(tallerGuardado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar el evento' });
    }
}

const consultarTalleres = async (req, res) => {
    try {
        // Setear rango del día
        const inicioDia = new Date();
        inicioDia.setHours(0, 0, 0, 0);

        const finalDia = new Date();
        finalDia.setHours(23, 59, 59, 999);

        // Filtra eventos que se encuentren dentro del rango
        const talleres = await Taller.find({
            fecha: {
                $gte: inicioDia,
                $lt: finalDia
            }
        }).sort({ fecha: 1 });
        res.status(200).json(talleres);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener los talleres' });
    }
}

const detallesTaller = async (req, res) => {
    try {
        const id = req.params.id;
        const taller = await Taller.findById(id);

        if (!taller) return res.status(404).json({ msg: 'Taller no encontrado' });

        res.status(200).json(taller);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener el taller' });
    }
}

export {
    registrarTaller,
    consultarTalleres,
    detallesTaller
}