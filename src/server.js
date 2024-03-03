import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import authRouter from "./routers/auth.router";
import accountRouter from "./routers/account.router";

import { dbconnect } from "./config/database.config.js";
import path, { dirname } from 'path';
dbconnect().then(r => console.log(r));

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
