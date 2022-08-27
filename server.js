const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require("console.table");
const { result } = require('lodash');


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  showOptions();
});

// Start prompt - displays which options to go through
function showOptions() {
  inquirer.prompt({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Roles",
      "View All Departments",
      "Add Department",
      "Quit"
    ]
  }) // then based on choice, proceed to function
    .then(({ options }) => {
      switch (options) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Remove Employee":
          deleteEmployee();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Roles":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
          process.exit();
      }
    });
};

// function to view all departments
function viewDepartments() {
//  query selects all from departments, then goes back to show options
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    showOptions();
  });
}

// function to view all roles
function viewRoles() {
//  query selects all from roles, then goes back to show options
  db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id;", function (err, results) {
    console.table(results);
    showOptions();
  });
}

// function to view all employees
function viewEmployees() {
//  query selects employee id, employee first and last name, role title, department name, salary, and manager name as the manager's actual name, then goes back to show options
  db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN manager ON manager.id = employee.manager;", function (err, results) {
    console.table(results);
    showOptions();
  });
}

// function to add a department
function addDepartment() {
  // prompt for question input
  inquirer.prompt({
    name: 'newDepartment',
    type: "input",
    message: "What department would you like to add?"
  }).then(({ newDepartment }) => {
    // adds the input to department name
    db.query(
      `INSERT INTO department (name) VALUES (?)`,
      newDepartment,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("New department added");
        showOptions();
      }
    );
  });
}

// function to add a role
function addRole() {
  // query selects all departments
  db.query("SELECT * FROM department", function (err, results) {
    const choices = results.map(({ id, name }) => {
      return {
        name: `${name}`,
        value: id
      };
    });

//  All departments are shown at choice, prompts for input of role name and salary.
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: choices,
        },
      ])
      .then(({ title, salary, department_id }) => {
        //  Query adds anwers to role table - title, salary, department id
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
          [title, salary, department_id],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            //  returns to show options
            console.log("New role added");
            showOptions();
          }
        );
      });
  });
}

// function to add an employee
function addEmployee() {
  //  selects all from role for choice options below
  db.query("SELECT * FROM role", function (err, results) {
    const roleChoices = results.map(({ id, title }) => {
      return {
        name: `${title}`,
        value: id
      };
    });
  //  selects all from manager for choice options below
  db.query("SELECT * FROM manager", function (err, results) {
    const managerChoices = results.map(({ id, name }) => {
      return {
        name: `${name}`,
        value: id
      };
      
    });
  
    // prompts for employee first and last name, role from current choices, and employee's manager from manager choices
  inquirer
    .prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "employeeRole",
      message: "What is the employee's role?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the employee's manager?",
      choices: managerChoices
    }
   ])
  .then(({ firstName, lastName, employeeRole, employeeManager }) => {
    //  inserts answers to employee table
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager) VALUES (?, ?, ?, ?)`,
          [firstName, lastName, employeeRole, employeeManager],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            // returns to show options
            console.log("Employee added");
            showOptions();
          }
        );
      });
  });
});
}


// function to update an employee's role
function updateEmployeeRole() {
  //  selects all from role for choices
  db.query("SELECT * FROM role", function (err, results) {
    const roleChoices = results.map(({ id, title }) => {
      return {
        name: `${title}`,
        value: id
      };
    });
  //  selects all from employee for choices
  db.query("SELECT * FROM employee", function (err, results) {
    const employeeChoices = results.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id
      };
    });
  // asks which employee to update from employee table then provides role options from role table
  inquirer
    .prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    },
    {
      type: "list",
      name: "role",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
   ])
  .then(({ role, employee }) => {
    // updates the employee's current role in the table to the new role based on the id
        db.query(
          `UPDATE employee SET role_id = ? WHERE id = ?`,
          [role, employee],
          (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
            showOptions();
          }
        );
      });
  });
});
}

// Added from provided code - will update later for bonus
// function deleteEmployee() {
//   db.query("SELECT * FROM employee", function (err, results) {
//     const choices = results.map(({ id, first_name, last_name }) => {
//       return {
//         name: `${first_name} ${last_name}`,
//         value: id,
//       };
//     });

//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "employeeId",
//           message: "Which employee would you like to remove?",
//           choices: choices,
//         },
//       ])
//       .then(({ employeeId }) => {
//         db.query(
//           `DELETE FROM employee WHERE id = ?`,
//           employeeId,
//           (err, result) => {
//             if (err) {
//               console.log(err);
//             }
//             console.log(result);
//             showOptions();
//           }
//         );
//       });
//   });
// }