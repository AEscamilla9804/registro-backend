import jwt from 'jsonwebtoken';
import Staff from '../models/Staff.js';

const checkAuth = async (req, res, next) => {
    // Validar JWT
    const authorization = req.headers.authorization;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.staff = await Staff.findById(decoded.id).select(
                "-password -token -confirmed"
            );

            return next();
        } catch (error) {
            const e = new Error('Token no válido');
            res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error('Token inválido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth