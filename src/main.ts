import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger';
import json from 'koa-json';
import config from './config/index';
import { initDB } from './db/index';
import * as user from './domains/users/router';

export const app = new Koa();

const main = async () => {
    // Middlewares
    app.use(json());
    app.use(logger());
    app.use(bodyParser())

    // Routes
    app.use(user.router.routes()).use(user.router.allowedMethods());


    if (config.NODE_ENV === "TEST") {
        return;
    }

    initDB()
    app.listen(config.PORT, () => {
        console.log('Koa server is started')
    })
}
main().then()
