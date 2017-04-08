/**
 * Created by remew on 17/04/01.
 */

const db = require('./db');
const b_crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const secretKey = require('fs').readFileSync('../private.key');
const secretKey = require('fs').readFileSync('./private.key');

class Account {
    /**
     * Constructor
     * @param email {string}
     * @param name {string}
     * @param password {string} - raw password
     * @param hashed {boolean} - has password been hashed
     * @param id {string|null}
     */
    constructor(email, name, password, hashed = false, id = null) {
        this._email = email;
        this._name = name;
        this._password = password;
        this._hashed = hashed;
        this._id = id;
    }

    /**
     * Save to db
     * @returns {Promise.<*>}
     */
    async save() {
        const email = this._email;
        const name = this._name;
        const hashed_password = this._hashed ? this._password : await b_crypt.hash(this._password, 10);
        if (this._id !== null) {
            return await db.query('UPDATE account (email, name, hashed_password) VALUES ($1, $2, $3)', [email, name, hashed_password]);
        }
        const result = await db.query('INSERT INTO account (email, name, hashed_password) VALUES ($1, $2, $3) RETURNING id', [email, name, hashed_password]);
        this._id = result.rows[0].id;
        return result;
    }

    /**
     * Delete from db
     * @returns {Promise.<*>}
     * @private
     */
    async _delete() {
        if (this._id === null) {
            throw 'id must be not null';
        }
        const id = this._id;
        this._id = null;
        return await db.query('DELETE FROM account WHERE id = $1', [id]);
    }

    /**
     * create JsonWebToken from own email and name
     * @returns {Promise.<string>}
     */
    async toJwt() {
        return await jwt.sign({
            email: this._email,
            name: this._name
        }, secretKey, {noTimestamp: true});
    }

    /**
     * login
     * @param email {string}
     * @param password {string} - raw password
     * @returns {Promise.<Account>}
     */
    static async login(email, password) {
        if (!email || !password) {
            throw {message: 'email and password are required'};
        }
        const res = await db.query('SELECT id, email, name, hashed_password FROM account WHERE email=$1', [email]);
        if (res.rowCount !== 1) {
            throw {message: 'account not found'};
        }
        const compare = await b_crypt.compare(password, res.rows[0].hashed_password);
        if (!compare) {
            throw {message: 'invalid email or password'};
        }
        const {id, name} = res.rows[0];
        return new Account(email, name, password, false, id);
    }

    static async getById(id) {
        const res = await db.query('SELECT id, email, name, hashed_password FROM account WHERE id=$1', [id]);
        if (res.rowCount !== 1) {
            throw {message: 'account not found'};
        }
        const {name, email, hashed_password} = res.rows[0];
        return new Account(email, name, hashed_password, true, id);
    }
}

module.exports = Account;

