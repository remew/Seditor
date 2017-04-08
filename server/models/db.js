
const Pool = require('pg').Pool;
const dbConfig = require('../config').db;

module.exports = new Pool(dbConfig);

