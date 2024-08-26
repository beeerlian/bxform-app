import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();

import createServer from './config/server';
import { AppDataSource } from './data-source';
import router from './routes/api';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

const app = createServer();
app.use(router)

AppDataSource.initialize()
    .then(() => {
        app.listen({ host, port }, () => {
            console.info(`⚡️ Server is running at http://${host}:${port}`);
        });
    })
    .catch(console.error);