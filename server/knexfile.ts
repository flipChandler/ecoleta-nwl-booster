import path from 'path';

module.exports = {
    development: {
        client: 'mysql2',
        connection: { 
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'ecoleta_booster_db'
        },  
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        useNullAsDefault: true, 
    }
       
};
