const express = require('express');
const { default: inquirer } = require('inquirer');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  startPrompt();
});

// Start prompt - What would you like to do?
function startPrompt() {
  inquirer.prompt({
    type: "list",
    name: "options",
    message: "What would you like to do?"
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
}
// View All Employees - activates viewEmployees
// Add Employee - activates addEmployee
// --- What is the employee's first name?
// --- What is the employee's last name?
// --- What is the employee's role? - shows list of roles
// --- Who is the employee's manager? - shows list of employees - added '' to the database
// Update Employee Role - activates updateEmployeeRole
// --- Which employee's role do you want to update? - shows list of employees
// --- Which role do you want to assign the selected employee? - shows list of roles - updated employee's role

// View All Roles - activates viewRoles
// Add Role - activates addRole
// --- What is the name of the role?
// --- What is the salary of the role?
// --- Which department does the role belong to? - displaces current roles as choices - added '' to the database
// View All Departments - activates viewDepartments
// Add Department - activates viewDepartments
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