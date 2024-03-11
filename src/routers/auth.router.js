import { Router } from 'express';
import handler from 'express-async-handler';
import {
    getProfile,
    loginWithUsernameAndPassword,
    loginWithGoogle
} from '../controllers/auth.controller';

import auth from "../middlewares/auth.mid";

const router = Router();


router.post('/login-with-username-and-password', handler(async (req, res) => {
    const status = await loginWithUsernameAndPassword(req.body);
    if (status.success) {
        res.send(status);
    } else {
        res.status(status.code).send(status);
    }
}));

// get profile
router.get('/profile', auth, handler(async (req, res) => {
    const status = await getProfile(req.account._id);
    res.send(status);
}));

//get login with google
router.get('/login-with-google', handler(async (req, res) => {
    const { credential } = req.body;
    const status = await loginWithGoogle(credential);
    res.send(status);
}));


export default router;