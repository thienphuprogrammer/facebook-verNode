import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";


import {
    uploadFile,
    retrieve
} from "../controllers/local-file.controller.js";

const router = Router();

router.post('/',
    auth,
    handler(async (req, res) => {
        const status = await uploadFile(req.file);
        res.status(status).send();
    })
);

// handle all requests to /local-files/:fileId
router.get('/:id',
    auth,
    handler(async (req, res) => {
        const status = await retrieve(req.params.id);
        res.status(status).send();
    })
);

export default router;
