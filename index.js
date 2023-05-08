//Import modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');
//database connection
const connection = require('./db/connection');
//connect to database and ask questions
connection.connect(err => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  askQuestions();
});
//ask user what they would like to do with the database
function askQuestions() {
  inquirer
    .prompt({
      message: 'What would you like to do?',
      type: 'list',
      choices: [
        'View all employees',
        'View all departments',
        'Add employee',
        'Add department',
        'Add role',
        'Update employee role',
        'End'
      ],
      name: 'choice'
    })
    .then(answer => {
      console.log(answer.choice);
      switch (answer.choice) { 
        case 'View all employees':
          viewEmployees();
          break;

        case 'View all departments':
          viewDepartments();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Update employee role':
          updateEmployeeRole();
          break;

        default:
          connection.end();
          break;
      }
    });
}
//view employees in database
function viewEmployees() {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    askQuestions();
  });
}
//view departments
function viewDepartments() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    askQuestions();
  });
}
//add employee
function addEmployee() {
  inquirer.prompt([{
          type: "input",
          name: "firstName",
          message: "What is the employees first name?"
      },
      {
          type: "input",
          name: "lastName",
          message: "What is the employees last name?"
      },
      {
          type: "number",
          name: "roleId",
          message: "What is the employees role ID"
      },
      {
          type: "number",
          name: "managerId",
          message: "What is the employees manager's ID?"
      }
  ]).then(function(res) {
      connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
          if (err) throw err;
          console.table("Success!");
          askQuestions();
      })
  })
}

//add new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the department name ?'
      }
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [answer.name],
        (err, res) => {
          if (err) throw err;
          console.log('Successfully Inserted');
          askQuestions();
        }
      );
    });
}
//add new role--- update to ask for department not department id!
function addRole() {
  // Query the database to get a list of all department names
  connection.query("SELECT name FROM department", function(err, data) {
    if (err) throw err;

    // Map the results to an array of department names
    const departmentNames = data.map(row => row.name);

    inquirer
      .prompt([
        {
          message: 'Enter the title of the role:',
          type: 'input',
          name: 'title'
        },
        {
          message: 'Enter the salary of the role:',
          type: 'number',
          name: 'salary'
        },
        {
          message: 'Select the department for the role:',
          type: 'list',
          name: 'departmentName',
          choices: departmentNames
        }
      ])
      .then(function (response) {
        // Query the database to get the department ID for the selected department name
        connection.query("SELECT id FROM department WHERE name = ?", [response.departmentName], function (err, data) {
          if (err) throw err;

          const departmentId = data[0].id;

          // Insert the new role into the database with the selected department ID
          connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, departmentId], function (err, data) {
            if (err) throw err;

            console.log(`${data.affectedRows} role added!\n`);

            askQuestions();
          });
        });
      });
  });
}
//update role

function updateEmployeeRole() {
  inquirer.prompt([
    {
      message: "Which employee would you like to update?",
      type: "input",
      name: "employeeName",
    },
    {
      message: "Enter the new role:",
      type: "input",
      name: "newRole",
    },
  ]).then(function (response) {
    // Get the role ID from the database based on the entered role title
    connection.query(
      "SELECT id FROM role WHERE title = ?",
      [response.newRole],
      function (err, data) {
        if (err) throw err;
        const roleId = data[0].id;

        // Update the employee's role ID in the database
        connection.query(
          "UPDATE employee SET role_id = ? WHERE first_name = ?",
          [roleId, response.employeeName],
          function (err, data) {
            if (err) throw err;
            console.log("Employee role updated!");
            askQuestions();
          }
        );
      }
    );
  });
}


