import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes';
import connectMongo from './config/mongoconnect';
import credentials from './middleware/credentials';
import corsOptions from './config/corsOptions';
import errorHandler from './middleware/errorHandler';
import httpStatus from './utils/httpStatus';

const app = express();

// Connect to MongoDB
void connectMongo();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/api', routes);

app.all('*', (req, res) => {
    res.status(httpStatus.NOT_FOUND);
    if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

export default app;
