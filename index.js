
const { Console } = require("console");       // I did not put this into my code. Not sure what did. Don't want to delete it just in case.
const { allowedNodeEnvironmentFlags } = require("process");  // same as the console on line 2. Not sure where this came from.
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')


initial()

//    Function to generate an html file, as well as the folder to put it in.
let fileName = ''
function initial(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What would you like your page to be called?',
            validate: answer => {
                if (answer !== '') {
                    return true
                } else {
                    return "answer must not be blank"
                }
            }
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

// Asks the user about the employee they are adding and composes it into HTML format
function addEmployee() {
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Adding employee, what is their name?',
          validate: answer => {
            if (answer !== '') {
                return true
              } else {
                return "answer must not be blank"
            }
        }
      },  
        {
          type: 'input',
          name: 'id',
          message: 'What is their ID?',
          validate: answer => {
            if (answer !== '') {
              return true
            } else {
              return "answer must not be blank"
            }
          }
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
          const underling = new Employee(response.name, response.id, response.email, response.role);
          inquirer.prompt([
            {
              type: 'input',
              name: 'office',
              message: 'What is their office number?',
            },  
          ])
          .then((response) => {
            const x = new Manager(underling.name, underling.id, underling.email, underling.role, response.office);
            const y = 
            `<div class="card" style="width: 30%;">
            <div class="card-body ${x.getRole()}">
            <h5 class="card-title">${x.getName()}</h5>
            <p class="card-text"> Company ID: ${x.getID()}</p>
            <p class="card-text"> Email: <a href="mailto:${x.getEmail()}" target="_blank"><p class="bold">${x.getEmail()}</p> </a></p>
            <p class="card-text"> Role: ${x.getRole()}</p>
            <p class="card-text"> Office: ${x.getOffice()}</p>
            </div>
            </div>`;
            addInfo(y)
          })
        }
        else if (response.role == 'engineer'){
            const underling = new Employee(response.name, response.id, response.email, response.role);
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'github',
                  message: 'What is their github name?',
                },  
              ])
              .then((response) => {
                const x = new Engineer(underling.name, underling.id, underling.email, underling.role, response.github);
                const y = 
                `<div class="card" style="width: 30%;">
                <div class="card-body ${x.getRole()}">
                <h5 class="card-title">${x.getName()}</h5>
                <p class="card-text"> Company ID: ${x.getID()}</p>
                <p class="card-text"> Email: <a href="mailto:${x.getEmail()}" target="_blank"><p class="bold">${x.getEmail()}</p> </a></p>
                <p class="card-text"> Role: ${x.getRole()}</p>
                  <p class="card-text">GitHub: <a href="https://github.com/${x.getGithub()}" target="_blank"><p class="bold">github.com/${x.getGithub()}</p> </a></p>
                  </div>
              </div>`;
                addInfo(y);
              })
        }
        else {
            const underling = new Employee(response.name, response.id, response.email, response.role);
            inquirer.prompt([
                {
                  type: 'input',
                  name: 'school',
                  message: 'What is their school?',
                },  
              ])
              .then((response) => {
                const x = new Intern(underling.name, underling.id, underling.email, underling.role, response.school);
                const y = 
                `<div class="card" style="width: 30%;">
                <div class="card-body ${x.getRole()}">
                <h5 class="card-title">${x.getName()}</h5>
                <p class="card-text"> Company ID: ${x.getID()}</p>
                <p class="card-text"> Email: <a href="mailto:${x.getEmail()}" target="_blank"><p class="bold">${x.getEmail()}</p> </a></p>
                <p class="card-text"> Role: ${x.getRole()}</p>
                  <p class="card-text"> School: ${x.getSchool()}</p>
                </div>
              </div>`;
                addInfo(y);
              })
        }
})}


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


