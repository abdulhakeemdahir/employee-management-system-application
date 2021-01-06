// This file will have all of the queries as functions in an object
const connection = require("./connection");
const inquirer = require("inquirer");

const app = {
  viewAll: function () {
    connection
      .query(
        `SELECT 
          employee.id,
          employee.first_name,
          employee.last_name,
          role.title,
          role.salary,
          role.department_id,
          department.name
          FROM employee
          JOIN role ON employee.role_id = role.id
          JOIN department ON department_id = department.id`
      )
      .then(resp => {
        console.table(resp);
      });
  },
  getRole: function () {
    return connection.query(
      `SELECT
          *
          FROM role`
    );
  },
  viewDepartment: function (answer) {
    connection
      .query("SELECT * FROM department WHERE name = ?", answer.name)
      .then(resp => {
        console.table(resp);
      });
  },
  viewRole: function (answer) {
    connection
      .query("SELECT * FROM role WHERE title = ?", answer.name)
      .then(resp => {
        console.table(resp);
      });
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
      .query("SELECT * FROM employee WHERE first_name = ?", answer.name)
      .then(resp => {
        console.table(resp);
      });
  },
  addRole: function (answer) {
    connection
      .query("SELECT * FROM employee WHERE first_name = ?", answer.name)
      .then(resp => {
        console.table(resp);
      });
  },
  addEmployee: function (answer) {
    connection.query("INSERT INTO role WHERE ? ?", answer.name).then(resp => {
      console.table(resp);
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
