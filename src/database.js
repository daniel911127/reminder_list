var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '12345678',
    port: 3306,
    database: 'reminder_list'
  });

function getConnection(callback) {
    pool.getConnection(callback);
}
  
module.exports = {
    getConnection: getConnection
}