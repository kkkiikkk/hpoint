import Koa from 'koa';
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger';
import json from 'koa-json';

import config from './config/index';
import { initDB } from './db/index';
import * as user from './domains/users/router';

const app = new Koa();
const router = new Router()


// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser())
router.get('/', async (ctx, next) => {
  ctx.body = 1

  return ctx
})

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.use(user.router.routes()).use(user.router.allowedMethods());

initDB()
app.listen(config.PORT, () => {
  console.log('Koa server is started')
})