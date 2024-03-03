import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { UNAUTHORIZED } from "../constants/httpStatus.js";

export default (req, res, next) => {
    const token = req.headers.access_token;
    if (!token) {
        return res.status(UNAUTHORIZED).send({ message: "No token" });
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
    return next();
}