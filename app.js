const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const myMemberType = [{
    type: "list",
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

    const htmlBlock = await render(team);
    fs.writeFile ( outputPath, htmlBlock, function (err) {

        if (err) {
            return console.log("It failed to write to the file ERROR message below: \n", err)
        }
    })



}

const ask = async () => {
    var key = await inquirer.prompt(myMemberType);
    var done = "Yes";
    switch (key.memberType) {
        case "Manager":
            var toPush = [{
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
            var a = myEmployee.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            runManager(answ);
            break;
        case "Engineer": 
            var toPush = [{
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
            var a = myEmployee.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            runEngineer (answ);
            break;
        case "Intern":
            var toPush = [{
                type: "input",
                name: "school",
                message: "What's the school of the intern?"
            }, {
                type: "list",
                message: "Done entering team members school?",
                name: "done",
                choices: [
                    "Yes",
                    "No"
                ]
            }]
            var a = myEmployee.concat(toPush);
            var answ = await inquirer.prompt(a);
            done = answ.done;
            runIntern(answ);
            break;

        default:
            break;
                        


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
    team.push(new Intern(m.name, m.id, m.email, m.school));

}



runMain();



