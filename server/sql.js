const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "myapp",
  multipleStatements: true
});

con.connect();

module.exports = con;
