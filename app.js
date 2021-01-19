const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




// Create a dynamic array
let profile = [];

// Render inputs to an array and write to team.html 
function fsWriteTo() {
    const data = render(profile);
    fs.writeFile(outputPath, data, (err) => err ? console.log(err) : console.log('Profile has been created!'));
}

// Initial inquirer prompt to determine employee type

function roleQuestion() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What is your job role?',
                choices: ["Manager", "Engineer", "Intern"]
            },
        ])
        .then(data => {
            //prompt individual with follow up questions based on job role choice
            switch (data.role) {

                case "Manager":
                    manager();
                    break;
                case "Engineer":
                    engineer();
                    break;
                case "Intern":
                    intern();
                    break;
            }

        });
}


// Questions for intern
function intern() {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'intern',
                message: "What is employee's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is employee's id?",

            },
            {
                type: 'input',
                name: 'email',
                message: "What is employee's email?",

            },
            {
                type: 'input',
                name: 'school',
                message: "What is employee's school?",

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',
            },

        ])
        .then(data => {
            //Add inputs to the  array
            const intern = new Intern(data.intern, data.id, data.email, data.school);
            profile.push(intern);


            //If individual chooses to add more employee, prompt the job role question again. otherwise render inputs to an array and write to team.html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                fsWriteTo();
            }
        })
}

// Questions for engineer
function engineer() {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'engineer',
                message: "What is employee's name?",

            },
            {
                type: 'input',
                name: 'id',
                message: "What is employee's id?",

            },
            {
                type: 'input',
                name: 'email',
                message: "What is employee's email?",

            },
            {
                type: 'input',
                name: 'github',
                message: "What is employee's github username?",

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',

            },

        ])
        .then(data => {
            //Add inputs to the array
            const engineer = new Engineer(data.engineer, data.id, data.email, data.github);
            profile.push(engineer);


            //If individual chooses to add more employee, prompt the job role question again. otherwise render inputs to an array and write to team.html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                fsWriteTo();
            }
        })
}

// Questions for manager
function manager() {
    inquirer
        .prompt([

            {
                type: 'input',
                name: 'manager',
                message: "What is employee's name?",

            },
            {
                type: 'input',
                name: 'id',
                message: "What is employee's id?",

            },
            {
                type: 'input',
                name: 'email',
                message: "What is employee's email?",

            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is employee's office number?",

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',

            },

        ])
        .then(data => {

            //Add inputs to the array
            const manager = new Manager(data.manager, data.id, data.email, data.officeNumber);
            profile.push(manager);


            //If individual chooses to add more employee, prompt the job role question again. otherwise render inputs to an array and write to team.html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                fsWriteTo();
            }

        })
}

roleQuestion();
