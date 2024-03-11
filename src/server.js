import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import authRouter from "./routers/auth.router";
import accountRouter from "./routers/account.router";
import fileRouter from "./routers/local-file.router";
import postRouter from "./routers/post.router";

import { dbconnect } from "./config/database.config.js";
dbconnect().then(() => {
    const app = express();

    app.use('/auth', authRouter);
    app.use('/accounts', accountRouter);
    app.use('/local-files', fileRouter);
    app.use('/posts', postRouter);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch((err) => {
    console.error(err);
});

