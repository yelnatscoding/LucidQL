const {Pool} = require('pg');
const PG_URI = 'postgres://koyeb-adm:npg_eC3dP6qlZIbU@ep-broad-fog-a2tpr30m.eu-central-1.pg.koyeb.app/koyebdb';

const pool = new Pool({
    connectionString: PG_URI
})

module.exports = {
    query: (text,params, callback) => {
        console.log('executed query:', text)
        return pool.query(text, params, callback)
    }
}
  