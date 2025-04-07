const mysql = require('mysql2/promise'); 
const db = mysql.createPool({ 
host: 'localhost', 
user: 'root', 
password: 'adiyogi123', // update if needed 
database: 'user_data', 
}); 
module.exports = db; 