import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";

import {
    createAccount,
} from "../controllers/account.controller";

const router = Router();

router.post('/create',
    auth,
    handler(async (req, res) => {
        const account = await createAccount(req.body);
        res.send(account);
    })
);
