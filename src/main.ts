import Koa from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';

import config from './config/index';
import { initDB } from './db/index';

const app = new Koa();
export const router  = new Router();


// Middlewares
app.use(json());
app.use(logger());

// Routes
app.use(router.routes()).use(router.allowedMethods());

initDB()

app.listen(config.PORT, () => {
	console.log('Koa server is started')
})