import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '1234',
    database: 'runtest',
});

export { connection };
