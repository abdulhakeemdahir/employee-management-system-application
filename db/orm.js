// This file will have all of the queries as functions in an object
const connection = require("./connection");
const inquirer = require("inquirer");

// Setting up custom ORM
const app = {
  // View All function
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
  //Get Role Function
  getRole: function () {
    return connection.query(
      `SELECT
          *
          FROM role`
    );
  },
  // View Departments function
  viewDepartment: function () {
    return connection.query("SELECT * FROM department");
  },
  //View Role function
  viewRole: function (answer) {
    return connection.query("SELECT * FROM role");
  },
  //View Employee Function
  viewEmployee: function viewEmployee(answer) {
    return connection.query(
      "SELECT * FROM employee WHERE first_name = ?",
      answer.name
    );
  },
  // Add department function
  addDepartment: function (answer) {
    connection
      .query("INSERT INTO department SET ? ", {
        name: answer.name,
      })
      .then(resp => {
        console.log("Role Added");
      });
  },
  //Add role function
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
  // Add employee function
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
  // Update role function
  updateRole: function (answer) {
    connection
      .query("UPDATE role SET ? WHERE ?", [
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        { id: answer.roleId },
      ])
      .then(resp => {
        console.table(resp);
        console.log("Role Updated");
      });
  },
  //Update Department function
  updateDepartment: function (answer) {
    connection
      .query("UPDATE role SET ? WHERE ?", [
        {
          name: answer.name,
        },
        { id: answer.departmentId },
      ])
      .then(resp => {
        console.table(resp);
        console.log("Department Updated");
      });
  },
};
module.exports = app;
