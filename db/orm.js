// This file will have all of the queries as functions in an object
const connection = require("./connection");
const inquirer = require("inquirer");

const app = {
  viewAll: function () {
    return connection.query(
      `SELECT 
          e.id,
          e.first_name,
          e.last_name,
          r.title AS role,
          r.salary,
          d.name AS department,
          CONCAT(e2.first_name,' ', e2.last_name) AS full_name
          FROM employee AS e
          LEFT JOIN role AS r
          ON e.role_id = r.id
          LEFT JOIN department AS d
          ON r.department_id = d.id
          LEFT JOIN employee AS e2
          ON e.manager_id = e2.id`
    );
  },
  getRole: function () {
    return connection.query(
      `SELECT
          *
          FROM role`
    );
  },
  viewDepartment: function (answer) {
    return connection.query("SELECT * FROM department");
  },
  viewRole: function (answer) {
    return connection.query("SELECT * FROM role");
  },
  viewEmployee: function viewEmployee(answer) {
    connection
      .query("SELECT * FROM employee WHERE first_name = ?", answer.name)
      .then(resp => {
        console.table(resp);
      });
  },
  addDepartment: function (answer) {
    connection
      .query("INSERT INTO department SET ? ", {
        name: answer.name,
      })
      .then(resp => {
        console.log("Role Added");
      });
  },
  addRole: function (answer) {
    connection
      .query("INSERT INTO role SET ? ", {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId,
      })
      .then(resp => {
        console.log("Role Added");
      });
  },
  addEmployee: function (answer) {
    connection
      .query("INSERT INTO employee SET ? ", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role,
        manager_id: answer.manager,
      })
      .then(resp => {
        console.log("Employee Added");
      });
  },
};
// app.getRole().then(choices => choices);
// console.log("=======");
console.log(app.getRole());
// console.log(choices);
module.exports = app;

// notes for self
// connection.query("").then((resp) => {})
