import mysql from 'mysql2';

const con = mysql.createurl({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10
})
const url = con.promise();

export {url};