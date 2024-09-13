const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'postgres'
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};