const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
  // Your host
  host: "localhost",
  // Connect to port
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  // Your Database
  database: "employee_DB",
});

connection.connect();
//Util Promisify
connection.query = util.promisify(connection.query);

// connection.query("").then((resp) => {})

module.exports = connection;
