// connect to db and export pool
const { Pool } = require('pg');

// const PG_URI = [insert postgresql uri]

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('--QUERY EXECUTED--\n', text, '\n');
    return pool.query(text, params, callback);
  }
};
