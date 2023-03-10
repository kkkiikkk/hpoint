import Router from 'koa-router';
import * as user from './index'

const routerOpts: Router.IRouterOptions = {
  prefix: '/api',
};

const router: Router = new Router(routerOpts);

router
  .post('/user', user.postUser)
  .get('/users', user.getUsers)
  .get('/user/:id', user.getUser)
  .patch('/user/:id', user.patchUser)
  .delete('/user/:id', user.deleteUser)

export { router }
