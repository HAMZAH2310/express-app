const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'new_project',
    password: '%Hamzah87*%',
    port: 5432,
    max: 5
});

module.exports = { db };