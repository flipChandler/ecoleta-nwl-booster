import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password:'root',
        database:'ecoleta_booster_db'
    },
    useNullAsDefault: false,
});

export default connection;


