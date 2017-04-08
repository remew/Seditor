
const Router = require('koa-router');
const router = new Router();

const User = require('../models/user');

router.post('/signup', User.signup);
router.post('/signin', User.signin);

module.exports = router;

