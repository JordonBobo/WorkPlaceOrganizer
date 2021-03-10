// ** This is a TDD - Test drivien dev:

// __tests__/			// jest tests
//   Employee.test.js
//   Engineer.test.js
//   Intern.test.js
//   Manager.test.js
// dist/               // rendered output (HTML) and CSS style sheet
// lib/				// classes
// src/				// template helper code
// index.js			// runs the application

const { Console } = require("console");
const fs = require("fs");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

initial()

//    Function to generate an htmle file, as well as the folder to put it in.
let fileName = ''
function initial(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What would you like your page to be called?',
          },  
      ])
      .then((response) => {
        fileName = response.name,
        fs.mkdir(response.name, function(err) {
            if (err) {
              console.log(err)
            }
        }),
        fs.writeFile(`./${fileName}/index.html`, 
        `
        <!doctype html>
        <html lang="en">
          <head>
            <title>${fileName}</title>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <style>
              body {background-color: lightgray;}
              .engineer {background-color: lightgoldenrodyellow;}
              .manager {background-color: lightblue;}
              .intern {background-color: lightgreen;}
            
            </style>
          </head>
          <body>
            <h1>Welcome to ${fileName}</h1>
            <h3> Employee Directory:</h3>
        `, 
        function(err) {
            if (err){
                console.log(err)
            }
        }),
        addEmployee()
        }
    )
}

// The object and its subclasses
function Employee(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
}

class intern extends Employee {
    constructor(name, id, email, school, role) {
        super(name, id, email);
        this.school = school;
        this.role = role;
    }
}
class manager extends Employee {
    constructor(name, id, email, office, role) {
        super(name, id, email);
        this.office = office;
        this.role = role;
    }
}
class engineer extends Employee {
    constructor(name, id, email, github, role) {
        super(name, id, email);
        this.github = github;
        this.role = role;
    }
}


// Prompts the user to add another user or append the last bits of the HTML file and call it a day.
function another() {
    inquirer.prompt([
        {
          type: 'list',
          name: 'done',
          message: 'Are you done?',
          choices: ['No - add another employee', 'Yes - publish the HTML']
        },  
      ])
      .then( (response) => {
        if (response.done == 'No - add another employee'){
            addEmployee()
        } else { finishhtml() }
        });
    }

// Asks the user about the employee they are adding and composes it into HTML format
function addEmployee() {
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Adding an employee, what is their name?',
        },  
        {
          type: 'input',
          name: 'id',
          message: 'What is their ID?',
        },  
        {
          type: 'input',
          name: 'email',
          message: 'What is their email?',
        },  
        {
          type: 'list',
          name: 'role',
          message: 'What is their role?',
          choices: ['manager', 'engineer', 'intern']
        },  
      ])
      .then( (response) => {
        if (response.role == 'manager'){
            let name = response.name;
            let id = response.id;
            let email = response.email;
            let role = response.role;
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'office',
                  message: 'What is their office number?',
                },  
              ])
              .then((response) => {
                const x = new manager(name, id, email, response.office, role);
                const y = 
                `<div class="card" style="width: 30%;">
                <div class="card-body ${x.role}">
                  <h5 class="card-title">${x.name}</h5>
                  <p class="card-text"> Company ID: ${x.id}</p>
                  <p class="card-text"> Email: <a href="mailto:${x.email}" target="_blank"><p class="bold">${x.email}</p> </a></p>
                  <p class="card-text"> Role: ${x.role}</p>
                  <p class="card-text"> Office: ${x.office}</p>
                </div>
              </div>`;
                addInfo(y)
              })
        }
        else if (response.role == 'engineer'){
            let name = response.name;
            let id = response.id;
            let email = response.email;
            let role = response.role;
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'github',
                  message: 'What is their github name?',
                },  
              ])
              .then((response) => {
                const x = new engineer(name, id, email, response.github, role);
                const y = 
                `<div class="card" style="width: 30%;">
                <div class="card-body ${x.role}">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text"> Company ID: ${x.id}</p>
                  <p class="card-text"> Email: <a href="mailto:${x.email}" target="_blank"><p class="bold">${x.email}</p> </a></p>
                  <p class="card-text">Role: ${x.role}</p>
                  <p class="card-text">GitHub: <a href="https://github.com/${x.github}" target="_blank"><p class="bold">github.com/${x.github}</p> </a></p>
                </div>
              </div>`;
                addInfo(y);
              })
        }
        else {
            let name = response.name;
            let id = response.id;
            let email = response.email;
            let role = response.role;
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'school',
                  message: 'What is their school?',
                },  
              ])
              .then((response) => {
                const x = new intern(name, id, email, response.school, role);
                const y = 
                `<div class="card" style="width: 30%;">
                <div class="card-body ${x.role}">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text"> Company ID: ${x.id}</p>
                  <p class="card-text"> Email: <a href="mailto:${x.email}" target="_blank"><p class="bold">${x.email}</p> </a></p>
                  <p class="card-text">Role: ${x.role}</p>
                  <p class="card-text"> School: ${x.school}</p>
                </div>
              </div>`;
                addInfo(y);
              })
        }
})}

// Add the info generated with user input and adds it to the file
function addInfo(x){
    fs.appendFile(`./${fileName}/index.html`, x,
        function(err) {
            if (err){
                console.log(err)
            }
        }
    ),
    another()
}

//Adds the last part of the HTML
function finishhtml(){
    fs.appendFile(`./${fileName}/index.html`, 
    `

    </body>
    </html>
    `, 
    function(err) {
        if (err){
            console.log(err)
        }else{console.log("your file has been created")}
    }
    )
}


