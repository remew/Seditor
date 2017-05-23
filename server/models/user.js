
//const db = require('./db');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const secretKey = require('fs').readFileSync('../private.key');
const Account = require('./account');

async function signup(ctx) {
    const {email, name, password} = ctx.request.body;
    if (!email || !name || !password) {
        ctx.body = {
            success: false,
            message: 'email and name and password are required'
        };
        ctx.status = 401; // status code
        return null;
    }
    try {
        const account = new Account(null, email, name, password);
        await account.save();
        const token = account.toJwt();
        ctx.body = {
            success: true,
            token: token
        };
    } catch (e) {
        ctx.body = {
            success: false,
            message: e
        }
    }
    return null;
}

async function signin(ctx, next) {
    const {email, password} = ctx.request.body;
    if (!email || !password) {
        ctx.body = {
            success: false,
            message: 'email and password are required'
        };
        ctx.status = 401; // status code
        return;
    }
    const res = await db.query('SELECT password FROM account WHERE email=$1', [email]);
    if (res.rowCount !== 1) {
        ctx.body = {
            success: false,
            message: 'invalid email or password'
        };
    }
    const compare = await bcrypt.compare(password, res.rows[0].password);
    if (!compare) {
        ctx.body = {
            success: false,
            message: 'invalid email or password'
        };
        return;
    }
    const token = await jwt.sign({
    });
    ctx.body = {
        success: true,
        token
    };
    await next();
}

module.exports = {
    signup, signin
};


