// const express = require('express'); - dont need express server
const { default: inquirer } = require('inquirer');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes'); - going to delete route server, dont need

// const PORT = process.env.PORT || 3001; - not using server
// const app = express();

// Express middleware - dont need middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Use apiRoutes - dont need api
// app.use('/api', apiRoutes);

// Default response for any other request (Not Found) - not using api
// app.use((req, res) => {
//   res.status(404).end();
// });

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  showOptions();
});

// Start prompt - What would you like to do?
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
};
// View All Employees - activates viewEmployees
// Add Employee - activates addEmployee
// --- What is the employee's first name?
const employeeOptions = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
  },
  {
    type: "list",
    name: "employee_manager",
    message: "Who is the employee's manager?",
    choices: [
      // add manager options
    ]
  }
];
// --- What is the employee's last name?
// --- What is the employee's role? - shows list of roles
// --- Who is the employee's manager? - shows list of employees - added '' to the database
// Update Employee Role - activates updateEmployeeRole
// --- Which employee's role do you want to update? - shows list of employees
// --- Which role do you want to assign the selected employee? - shows list of roles - updated employee's role

// View All Roles - activates viewRoles
// Add Role - activates addRole
const roleOptions = [
  {
    type: "input",
    name: "role",
    message: "What is the name of the role?"
  },
  {
    type: "input",
    name: "role_salary",
    message: "What is the salary of the role?"
  },
  {
    type: "list",
    name: "department",
    message: "Which department does the role belong to?"
  }
];
// --- What is the name of the role?
// --- What is the salary of the role?
// --- Which department does the role belong to? - displaces current roles as choices - added '' to the database
// View All Departments - activates viewDepartments
// Add Department - activates viewDepartments
const departmentOptions = {
  type: "input",
  name: "department",
  message: "What is the name of the department?"
};
// --- What is the name of the department? - Added '' to the database

// Quit - stops

// function viewDepartments

// function viewRoles

// function viewEmployees

// function addDepartment

// function addRole

// function addEmployee

// function updateEmployeeRole

// function quitApp

// Added from provided code
function deleteEmployee() {
  db.query("SELECT * FROM employee", function (err, results) {
    const choices = results.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee would you like to remove?",
          choices: choices,
        },
      ])
      .then(({ employeeId }) => {
        db.query(
          `DELETE FROM employee WHERE id = ?`,
          employeeId,
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
}

// Query database
function showEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    showOptions();
  });
}

function showOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["View All Employees", "Remove Employee", "Quit"],
      },
    ])
    .then(({ choice }) => {
      switch (choice) {
        case "View All Employees":
          showEmployees();
          break;
        case "Remove Employee":
          deleteEmployee();
          break;
        default:
          process.exit();
      }
    });
}

showOptions();
