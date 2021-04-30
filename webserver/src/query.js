import 'dotenv/config';
import "core-js/stable";
import "regenerator-runtime/runtime";

import {MongoClient} from 'mongodb';

const uri = "mongodb://localhost";

async function get_submissions(username, limit) {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        // console.log('Getting submissions from db for user', username);
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const subs = database.collection("submissions");
        let query = null;
        if(username) {
            query = { 'username': username};
        }
        console.log(`[${new Date().toLocaleString()}] mongo: query=${JSON.stringify(query)} limit=${limit}`)

        const res = await (subs.find(query).sort('timestamp', -1).limit(limit).toArray());
        return res;
    } catch(err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export {get_submissions};
