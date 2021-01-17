const app = require("./db/orm.js");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const config = require("./package.json");
const { viewRole } = require("./db/orm.js");

function init() {
  console.log(logo(config).render());
  selectAction();
}

function selectAction() {
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
        "UPDATE_EMPLOYEE_ROLES",
        "UPDATE_EMPLOYEE_MANAGERS",
        "VIEW_EMPLOYEES_BY_MANAGER",
        "DELETE_DEPARTMENTS",
        "DELETE_ROLES",
        "DELETE_EMPLOYEES",
        "VIEW_TOTAL_BUDGET",
        "QUIT",
      ],
    })
    .then(answer => {
      if (answer.action === "VIEW_ALL") {
        app.viewAll().then(resp => {
          console.table(resp);
          goBack();
        });
      } else if (answer.action === "VIEW_DEPARTMENTS") {
        app.viewDepartment(answer);
        // inquirer
        //   .prompt({
        //     message: "Provide a department name",
        //     name: "name",
        //     type: "input",
        //   })
        //   .then(answer => {
        //     app.viewDepartment(answer);
        //   });
      } else if (answer.action === "VIEW_ROLES") {
        app.viewRole(answer);
        goBack();
      } else if (answer.action === "SEARCH_EMPLOYEE") {
        inquirer
          .prompt({
            message: "Provide an employees first name",
            name: "name",
            type: "input",
          })
          .then(answer => {
            app.viewEmployee(answer);
          });
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
            console.log(answer);
            app.addDepartment(answer);
          });
      } else if (answer.action === "ADD_ROLES") {
        app.getRole().then(roles => {
          console.log(roles);
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
              console.log(answer);
              app.addRole(answer);
            });
        });
      } else if (answer.action === "ADD_EMPLOYEE") {
        // const employeeInfo = {};
        app.getRole().then(roles => {
          // console.log(roles);
          app.viewAll().then(managers => {
            // console.log(managers);
            const roleArr = roles.map(role => {
              return { name: role.title, value: role.id };
            });
            const managerArr = managers.map(manager => {
              return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
              };
            });
            // console.log(roleArr);
            // console.log(managerArr);
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
                // console.log(answers);
                app.addEmployee(answers);
              });
            // .then(answer => {
            //   employeeInfo.first_name = answer.firstName;
            //   inquirer
            //     .prompt({
            //       message: "Provide the employees last name",
            //       name: "lastName",
            //       type: "input",
            //     })
            //     .then(answer => {
            //       employeeInfo.last_name = answer.lastName;
            //       console.log(employeeInfo);
            //       app.getRole().then(res => {
            //         const choiceArr = res;
            //         let choices = [];
            //         for (let i = 0; i < choiceArr.length; i++) {
            //           choices.push(choiceArr[i].title);
            //         }
            //         inquirer
            //           .prompt({
            //             name: "roleId",
            //             type: "list",
            //             message: "Choose a role",
            //             choices: choices,
            //           })
            //           .then(answer => {
            //             employeeInfo.role_id = answer.roleId;
            //             console.log(employeeInfo);
            //           });
            //       });
            //     });
            // });
          });
        });
      } else if (answer.action === "ADD_ROLES") {
        inquirer
          .prompt({
            message: "Add a role",
            name: "name",
            type: "input",
          })
          .then(answer => {
            app.addRole(answer);
          });
      }
    });
}

// All functions
function goBack() {
  inquirer
    .prompt({
      message: "Go back?",
      name: "name",
      type: "input",
    })
    .then(answer => {
      init();
    });
}

init();
