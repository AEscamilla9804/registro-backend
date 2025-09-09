import Asistente from "../models/Asistente.js";
import Taller from "../models/Taller.js";

const registrarAsistente = async (req, res) => {
    try {
        const data = req.body;

        // En caso de seleccionar talleres, validar disponibilidad de cupo
        if (data.talleres && data.talleres.length > 0) {
            for (const tallerId of data.talleres) {
                const taller = await Taller.findOne({ _id: tallerId, cupo: { $gt: 0 } });

                if (!taller) {
                    const tallerInfo = await Taller.findById(tallerId);
                    const nombreTaller = tallerInfo ? tallerInfo.taller : `ID ${tallerId}`;
                    console.log(nombreTaller)
                    return res.status(400).json({ msg: `El taller "${nombreTaller}" no tiene cupo disponible`, error: true });
                }
            }
        }

        // Crear asistente
        const asistente = new Asistente(data);
        const asistenteGuardado = await asistente.save();

        // Reducir el cupo de cada taller seleccionado
        if (data.talleres && data.talleres.length > 0) {
            await Promise.all(
                data.talleres.map(async tallerId => {
                    await Taller.findByIdAndUpdate(tallerId, { $inc: { cupo: -1 } });
                })
            )
        }

        res.status(201).json({ msg: 'Asistente registrado correctamente', asistenteGuardado });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'El correo ya está registrado',
                error: true
            });
        }

        res.status(500).json({ msg: 'Error al registrar al asistente', error: true });
    }
}

const actualizarAsistente = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validar que hay campos para actualizar
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ msg: 'No se proporcionaron datos para actualizar', error: true });
        }

        // Obtener asistente actual
        const asistente = await Asistente.findById(id);
        if (!asistente) return res.status(404).json({ msg: 'Asistente no encontrado', error: true });

        // Actualización de talleres
        if (data.talleres) {
            const talleresOg = asistente.talleres.map(taller => taller.toString());
            const talleresNuevos = data.talleres;

            // Talleres eliminados
            const eliminados = talleresOg.filter(t => !talleresNuevos.includes(t));

            // Talleres agregados
            const agregados = talleresNuevos.filter(t => !talleresOg.includes(t));

            // Aumentar cupo de talleres eliminados
            await Promise.all(
                eliminados.map(async tallerId => {
                    await Taller.findByIdAndUpdate(tallerId, { $inc: { cupo: 1 } });
                })
            );

            // Validar y disminuir cupo de talleres agregados
            for (const tallerId of agregados) {
                const taller = await Taller.findOne({ _id: tallerId, cupo: { $gt: 0 } });
                if(!taller) {
                    return res.status(400).json({ msg: `El taller ${taller.taller} no tiene cupo disponible`, error: true});
                }
                await Taller.findByIdAndUpdate(tallerId, { $inc: { cupo: -1 } }); 
            }
        }

        // Actualizar otros campos permitidos
        const camposPermitidos = [
        'nombre', 'apellidoP', 'apellidoM', 'pais', 'estado', 'especialidad',
        'email', 'telefono', 'rol', 'congreso', 'talleres', 'pago', 'factura',
        'beca', 'staffId', 'gafeteImpreso', 'qr', 'rfid', 'gafete', 'constancia'
        ];

        Object.keys(data).forEach(key => {
        if (camposPermitidos.includes(key)) {
            asistente[key] = data[key];
        }
        });

        // Guardar para que se ejecute el pre('save')
        const asistenteActualizado = await asistente.save();

        res.json({ msg: 'Asistente actualizado correctamente', asistente: asistenteActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar la información', error: true });
    }
}

const obtenerDatosAsistente = async (req, res) => {
    const { nombre } = req.query;

    if (!nombre) return res.status(400).json({ msg: 'Proporcione un término de búsqueda', error: true });

    const palabras = nombre.trim().split(/\s+/);

    const condiciones = palabras.map(palabra => ({
        nombreCompleto: { $regex: palabra, $options: 'i' }
    }));

    try {
        const asistentes = await Asistente.find({
            $and: condiciones
        });

        if (asistentes.length === 0) {
            return res.status(404).json({ msg: 'La búsqueda no arrojó resultados', error: true });
        }

        res.json(asistentes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener los datos del asistente', error: true });
    }
}

export {
    registrarAsistente,
    actualizarAsistente,
    obtenerDatosAsistente,
}