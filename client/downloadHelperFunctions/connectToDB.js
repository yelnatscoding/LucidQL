export function connectToDB(link) {
  const dbConnection = `const {Pool} = require('pg');
const PG_URI = '${link.trim()}';

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text,params, callback) => {
        console.log('executed query:', text)
        return pool.query(text, params, callback)
    }
}
  `;
  return dbConnection;
}
