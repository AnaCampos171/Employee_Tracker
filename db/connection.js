const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'company_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to db!');
});

module.exports = connection;
