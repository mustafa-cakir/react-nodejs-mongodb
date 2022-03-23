import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import router from './routes/index';
import connectMongo from "./config/mongoconnect";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

void connectMongo();

app.use('/', router);

export default app;
