import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";

import {createPost, fetchPosts, updatePost} from "../controllers/post.controller.js";

const router = Router();

router.post('/',
    auth,
    handler(async (req, res) => {
        const {
            ...post,
            accountId: id
        } = req.body;
        const status = await createPost(post, id);
        res.status(status);
    })
);

router.get('/',
    auth,
    handler(async (req, res) => {
        const filter = req.query.id;
        const status = await fetchPosts(filter);
        res.status(status);
    })
);

router.put('/:id',
    auth,
    handler(async (req, res) => {
        const {
            ...post,
            accountId: id
        } = req.body;
        const status = await updatePost(post, id);
        res.status(status);
    })
);

export default router;
