// connect to db and export pool
// link to schema: 
const { Pool } = require('pg');

const PG_URI = 'postgres://vizmszft:JuJIfMxD6k-PLmi_wdaoQXiGMAJxPdz6@raja.db.elephantsql.com/vizmszft';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('--QUERY EXECUTED--\n', text, '\n');
    return pool.query(text, params, callback);
  }
};
