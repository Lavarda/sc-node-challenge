import express from 'express';
import dotenv from 'dotenv'
import initializeDatabase from './adapters/database/database';

dotenv.config()

const app = express();

try {
    initializeDatabase()
} catch (err) {
    console.log(err)
}

app.get('/', (req, res) => res.json('Server Running'));

app.listen(3333, () => {
    console.log('Server started on port 3333');
});