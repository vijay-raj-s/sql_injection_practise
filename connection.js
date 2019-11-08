var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10, // default = 10
    host: "localhost",
    user: "root",
    password: "theblues29",
    database: 'csrf_check'
});


pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("Connected!"); 
});
 

module.exports = pool;
  