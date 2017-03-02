'use strict';

const Koa = require('koa');
const config = require('./config');
const logger = require('koa-morgan');

const app = new Koa();

app
.use(logger('dev'))

app.listen(config.PORT);

