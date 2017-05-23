/**
 * Created by remew on 17/05/24.
 */
'use strict';

const db = require('./db');

class Tag {
    /**
     * Constructor
     * @param name {string}
     * @param id {string|null}
     */
    constructor(name, id = null) {
        this._name = name;
        this._id = id;
    }

    /**
     * Save to db
     * @returns {Promise.<*>}
     */
    async save() {
        const name = this._name;
        if (this._id !== null) {
            const id = this._id;
            return await db.query('UPDATE tag SET name=$1 WHERE id=$2', [name, id]);
        }
        const result = await db.query('INSERT INTO tag (name) VALUES ($1) RETURNING id', [name]);
        this._id = result.rows[0].id;
        return result;
    }

    /**
     * Delete from db
     * @returns {Promise.<*>}
     */
    async delete() {
        if (this._id === null) {
            throw 'id must be not null';
        }
        const id = this._id;
        this._id = null;
        return await db.query('DELETE FROM tag WHERE id = $1', [id]);
    }

    static async getById(id) {
        const res = await db.query('SELECT id, name FROM tag WHERE id=$1', [id]);
        if (res.rowCount !== 1) {
            throw {message: 'account not found'};
        }
        const {name} = res.rows[0];
        return new Tag(name, id);
    }
}

module.exports = Tag;

