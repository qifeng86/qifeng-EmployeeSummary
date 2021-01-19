const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

// Initial inquirer prompt to determine employee type

let profile = [];


// prompt individual with question about job role
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
                message: 'What is your name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee id?',

            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',

            },
            {
                type: 'input',
                name: 'school',
                message: 'What is your school?',

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',
            },

        ])
        .then(data => {
            //Add inputs to the profile array
            const intern = new Intern(data.intern, data.id, data.email, data.school);
            profile.push(intern);


            //If individual choose to add more employee, prompt the job role question. otherwise render profile array to html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                const data = render(profile);
                fs.writeFile(outputPath, data, (err) => err ? console.log(err) : console.log('Profile has been created!'));
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
                message: 'What is your name?',

            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee id?',

            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',

            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your github username?',

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',

            },

        ])
        .then(data => {
            //Add new inputs to the profile array
            const engineer = new Engineer(data.engineer, data.id, data.email, data.github);
            profile.push(engineer);


            //If individual choose to add more employee, prompt the job role question. otherwise render profile array to html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                const data = render(profile);
                fs.writeFile(outputPath, data, (err) => err ? console.log(err) : console.log('Profile has been created!'));
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
                message: 'What is your name?',

            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee id?',

            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',

            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?',

            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Do you want to add more employee?',

            },

        ])
        .then(data => {

            //Add new inputs to the profile array
            const manager = new Manager(data.manager, data.id, data.email, data.officeNumber);
            profile.push(manager);


            //If individual choose to add more employee, prompt the job role question. otherwise render profile array to html
            if (data.addMore === true) {
                roleQuestion();
            } else {
                const data = render(profile);
                fs.writeFile(outputPath, data, (err) => err ? console.log(err) : console.log('Profile has been created!'));
            }

        })
}

roleQuestion();