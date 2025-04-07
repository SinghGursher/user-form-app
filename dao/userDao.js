const db = require('../db'); 
class UserDAO { 
async save(user) { 
const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)'; 
const [result] = await db.execute(sql, [user.name, user.email, 
user.phone]); 
return result.insertId; 
} 
} 
module.exports = new UserDAO(); 