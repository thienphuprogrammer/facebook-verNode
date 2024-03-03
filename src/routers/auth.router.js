import { Router } from 'express';
import handler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import {
    getProfile,
    loginWithUsernameAndPassword
} from '../controllers/auth.controller';

import auth from "../middlewares/auth.mid";

const router = Router();

router.get('/profile',
    auth,
    handler(async (req, res) => {
        const user = await getProfile(req.user.id);
        res.send(user);
    })
);

router.post('/login-with-username-and-password', handler(async (req, res) => {
    const status = await loginWithUsernameAndPassword(req.body);

    if (status.success) {
        res.send(status);
    } else {
        res.status(status.code).send(status);
    }
}));

const generateTokenResponse = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
    };
}

export default router;