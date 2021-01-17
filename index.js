const app = require("./db/orm.js");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const config = require("./package.json");
const { viewRole } = require("./db/orm.js");

// Select Action function
async function selectAction() {
  inquirer
    .prompt({
      message: "What would you like to do?",
      name: "action",
      type: "list",
      choices: [
        "VIEW_ALL",
        "VIEW_DEPARTMENTS",
        "VIEW_ROLES",
        "SEARCH_EMPLOYEE",
        "ADD_DEPARTMENTS",
        "ADD_ROLES",
        "ADD_EMPLOYEE",
        "UPDATE_ROLES",
        "UPDATE_DEPARTMENTS",
        "VIEW_EMPLOYEES_BY_MANAGER",
        "DELETE_DEPARTMENTS",
        "DELETE_ROLES",
        "DELETE_EMPLOYEES",
        "VIEW_TOTAL_BUDGET",
        "QUIT",
      ],
    })
    .then(answer => {
      // View All
      if (answer.action === "VIEW_ALL") {
        app.viewAll().then(resp => {
          console.table(resp);
          goBack();
        });
        //View Derpartments
      } else if (answer.action === "VIEW_DEPARTMENTS") {
        app.viewDepartment(answer).then(resp => {
          console.table(resp);
          goBack();
        });
        // View Roles
      } else if (answer.action === "VIEW_ROLES") {
        app.viewRole(answer).then(resp => {
          console.table(resp);
          goBack();
        });
        // Search employees
      } else if (answer.action === "SEARCH_EMPLOYEE") {
        inquirer
          .prompt({
            message: "Provide an employees first name",
            name: "name",
            type: "input",
          })
          .then(answer => {
            app.viewEmployee(answer);
            goBack();
          });
          // Add departments
      } else if (answer.action === "ADD_DEPARTMENTS") {
        inquirer
          .prompt([
            {
              message: "Add department",
              name: "name",
              type: "input",
            },
          ])
          .then(answer => {
            app.addDepartment(answer);
            goBack();
          });
          //Add roles
      } else if (answer.action === "ADD_ROLES") {
        app.getRole().then(roles => {
          const roleArr = roles.map(role => {
            return { name: role.title, value: role.id };
          });
          inquirer
            .prompt([
              {
                message: "Add role title",
                name: "title",
                type: "input",
              },
              {
                message: "Add Salary",
                name: "salary",
                type: "input",
              },
              {
                message: "Choose your department",
                name: "departmentId",
                type: "list",
                choices: roleArr,
              },
            ])
            .then(answer => {
              app.addRole(answer);
              goBack();
            });
        });
        // Add employee
      } else if (answer.action === "ADD_EMPLOYEE") {
        app.getRole().then(roles => {
          app.viewAll().then(managers => {
            const roleArr = roles.map(role => {
              return { name: role.title, value: role.id };
            });
            const managerArr = managers.map(manager => {
              return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
              };
            });
            inquirer
              .prompt([
                {
                  message: "Provide the employees first name",
                  name: "firstName",
                  type: "input",
                },
                {
                  message: "Provide the employees last name",
                  name: "lastName",
                  type: "input",
                },
                {
                  message: "Provide the employees role",
                  name: "role",
                  type: "list",
                  choices: roleArr,
                },
                {
                  message: "Provide the employees manager",
                  name: "manager",
                  type: "list",
                  choices: managerArr,
                },
              ])
              .then(answers => {
                app.addEmployee(answers);
                goBack();
              });
          });
        });
        //Add roles
      } else if (answer.action === "ADD_ROLES") {
        inquirer
          .prompt({
            message: "Add a role",
            name: "name",
            type: "input",
          })
          .then(answer => {
            app.addRole(answer);
            goBack();
          });
          //Update roles
      } else if (answer.action === "UPDATE_ROLES") {
        app.getRole().then(roles => {
          const roleArr = roles.map(role => {
            return { name: role.title, value: role.id };
          });
          app.viewDepartment().then(department => {
            const departmentArr = department.map(department => {
              return { name: department.name, value: department.id };
            });
            inquirer
              .prompt([
                {
                  message: "Choose your role",
                  name: "roleId",
                  type: "list",
                  choices: roleArr,
                },
                {
                  message: "Update role title",
                  name: "title",
                  type: "input",
                },
                {
                  message: "Update Salary",
                  name: "salary",
                  type: "input",
                },
                {
                  message: "Choose your department",
                  name: "departmentId",
                  type: "list",
                  choices: departmentArr,
                },
              ])
              .then(answer => {
                console.log(answer);
                app.updateRole(answer);
                goBack();
              });
          });
        });
        //Update Departments
      } else if (answer.action === "UPDATE_DEPARTMENTS") {
        app.viewDepartment().then(department => {
          const departmentArr = department.map(department => {
            return { name: department.name, value: department.id };
          });
          inquirer
            .prompt([
              {
                message: "Choose your department?",
                name: "departmentId",
                type: "list",
                choices: departmentArr,
              },
              {
                message: "Update department",
                name: "name",
                type: "input",
              },
            ])
            .then(answer => {
              console.log(answer);
              app.updateDepartment(answer);
              goBack();
            });
        });
      }
    });
}

// Initialize functions
function init() {
  console.log(logo(config).render());
  selectAction();
}
// Go back 
function goBack() {
  inquirer
    .prompt({
      message: "Go back?",
      name: "name",
      type: "input",
    })
    .then(() => {
      init();
    });
}

//Initialize application
init();
