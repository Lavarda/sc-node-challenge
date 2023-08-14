import dotenv from 'dotenv'
import initializeDatabase from './adapters/database/database';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './services/composer';
import bodyParser from 'body-parser';
import './adapters/controller'

dotenv.config()

async function run () {
    try {
        console.log('Initialize Database')
        await initializeDatabase()
        console.log('Database initialized')
    } catch (err) { 
        console.log(err)
    }

    let server = new InversifyExpressServer(container)

    server.setConfig( (app) => {
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(bodyParser.json())
    })

    let app = server.build();

    app.listen(3333, () => {
        console.log('Server started on port 3333');
    });
}

run().catch(console.error);