import path from "path";
import { createConnection } from "typeorm";

export default async function initializeDatabase(): Promise<void> {    
  await createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username:  process.env.DB_USERNAME,
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_DATABASE,
        synchronize: true,
        logging: true,    
        migrations: [ `${path.join(__dirname, 'migrations/*{.ts,.js}')}` ],
        entities: [ `${path.join(__dirname, 'entities/*{.ts,.js}')}` ],
        migrationsRun: true
    })
}