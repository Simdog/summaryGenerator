const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



console.log("Welcome to your team creation");
console.log("Answer the questions to create your team's profile");

const myMemberType = [{
    type: "input",
    message: "Team member Type:",
    name: "memberType",
    choices: [
        "Intern",
        "Engineer",
        "Manager",
    ]
}]

const myEmployee = [{
    type: "input",
    name: "name",
    message: "What's the name of your employee?"
}, 
{
    type: "input",
    name: "id",
    message: "What's the ID of your employee?"
},
{
    type: "input",
    name: "email",
    message: "What's the Email of your employee?"
}]

const team = [];


const runMain = async () => {
    await ask();

    const 



}

const ask = async () => {
    let key = await inquirer.prompt(myMemberType);
    let done = "Yes";
    switch (key.memberType) {
        case "Manager":
            let toPush = [{
                type: "input",
                name: "officeNumber",
                message: "What's the office number of the manager?"
            }, {
                type: "list",
                message: "Done entering team members office number?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]
            }]
            let a = myEmployee.concat(toPush);
            let answ = await inquirer.prompt(a);
            done = answ.done;
            runManager(answ);
            break;
        case "Engineer": 
            let toPush = [{
                type: "input",
                name: "github",
                message: "What's the github username of the engineer?"
            }, { 
                type: "list",
                message: "Done entering team members github?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]
            }]
            let a = myEmployee.concat(toPush);
            let answ = await inquirer.prompt(a);
            done = answ.done;
            runEngineer (answ);
                        


    }
    if (done === "No") {
        await ask();
    }

    return;

}

const runManager = (m) => {
    const man =  new Manager(m.name, m.id, m.email, m.officeNumber);
    team.push(man);

}
const runEngineer = (m) => {
    const man =  new Engineer(m.name, m.id, m.email, m.officeNumber);
    team.push(man);

}
const runIntern = (m) => {
    const man =  new Intern(m.name, m.id, m.email, m.officeNumber);
    team.push(man);

}



runMain();


// function promptManager () {
//     return inquirer.prompt([
//         {
//         type: "input",
//         name: "nameManager",
//         message: "What is the manager's name?"    
//         },
        
//         {
//         type: "input",
//         name: "idManager",
//         message: "What is the manager's ID?"    
//         },
//         {
//         type: "input",
//         name: "emailManager",
//         message: "What is the manager's email?"    
//         },
//         {
//         type: "input",
//         name: "office",
//         message: "What is the manager's office number?"    
//         }
//     ]);
// }

promptManager ()
.then(function promptNextMemberType(){
    return inquirer.prompt ([
        {
            type: "list",
            name: "addMember",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "Done"]
        }
    ]);
})
.then (function(answers) {
    if (answers.addMember === "Engineer") {
        console.log("You have chosen engineer.");
        inquirer 
        .prompt([
            {
                type: "input",
                name: "nameEng",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "idEng",
                message: "What is your engineer's ID?"
            },
            {
                type: "input",
                name: "emailEng",
                message: "What is your engineer's email?"
            },
            {
                type: "input",
                name: "github",
                message: "What is your engineer's GitHub username?"
            },
            {
                type: "list",
                name: "addMember",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "Done"]
            }
        ])
    } else if (answers.addMember === "Intern" ) {
        console.log("You have chosen Intern.");
        inquirer
        .prompt([
            {
                type: "input",
                name: "nameInt",
                message: "What is your intern's name?"
            },
            {
                type: "input",
                name: "idInt",
                message: "What is your interns's ID?"
            },
            {
                type: "input",
                name: "emailInt",
                message: "What is your intern's email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is your intern's school?"
            },
            {
                type: "list",
                name: "addMember",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "Done"]
            }
        ])

    } else {
        console.log("Your team has succesfully been created!");
        return;
    }
})

.catch(function(err){
    console.log(err);
})

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
