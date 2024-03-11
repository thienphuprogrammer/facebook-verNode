import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";

import {
    createAccount,
    getAccountById,
    getAllAccounts,
    updateAccount,
} from "../controllers/account.controller";

const router = Router();

// get account by id
router.get('/:id',
    auth,
    handler(async (req, res) => {
        const account = await getAccountById(req.params.id);
        res.send(account);
    })
);

//get all accounts
router.get('/',
    auth,
    handler(async (req, res) => {
        const accounts = await getAllAccounts();
        res.send(accounts);
    })
);

// post account
router.post('/',
    handler(async (req, res) => {
        const account = await createAccount(req.body);
        res.send(account);
    })
);

// put account
router.put('/detail',
    auth,
    handler(async (req, res) => {
        const account = await updateAccount(req.body);
        res.send(account);
    })
);

export default router;
