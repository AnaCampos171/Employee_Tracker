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
//add new role
function addRole() {
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
       

            message: "Enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary,department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "Which employee would you like to update? ",
            type: "input",
            name: "name"
        }, {
            message: "Enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

