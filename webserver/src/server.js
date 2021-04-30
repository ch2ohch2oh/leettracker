import 'dotenv/config';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import express from 'express';
import {MongoClient} from 'mongodb';

import {get_submissions} from './query';

// const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
// const expressLogger = expressPino({ logger });

const app = express();

// app.use(expressLogger);

app.get('/submissions/:username', (req, res) => {
    const username = req.params.username;
    // Default limit is 20
    const limit = req.query.limit || 20;

    get_submissions(username, limit).then(data => {
        if(!data) {
            console.info(`No data found for user ${username}`);
        }
        res.send(data);
    }).catch(console.dir);
});

app.get('/submissions/', (req, res) => {
    const limit = Math.min(req.query.limit || 20, 100);
    get_submissions(null, limit).then(data => {
        if(!data) {
            console.info(`No recent submissions`);
        }
        res.send(data);
    }).catch(console.dir);
});


app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`),
);