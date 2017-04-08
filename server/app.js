'use strict';

const Koa = require('koa');
const config = require('./config');
const logger = require('koa-morgan');
const router = require('./routes');
const koaBody = require('koa-body')({multipart: true});

const app = new Koa();

app
    .use(logger('dev'))
    .use(koaBody)
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.PORT);

