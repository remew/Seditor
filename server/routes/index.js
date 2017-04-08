'use strict';

const Router = require('koa-router');
const router = new Router();
const auth = require('./auth');

router.use(auth.routes());

router.get('/', async (ctx, next) => {
    ctx.body = {
        path: 'root'
    };
    await next();
});

module.exports = router;

