import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password:'',
        database:'ecoleta_booster_db'
    }
});

export default connection;
