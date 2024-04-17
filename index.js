#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//initialize user balance and pin code
let myBalance = 10000;
let myPin = 2003;
//print wellcome message
console.log(chalk.blue("\n\tWellcome to Arsalan Javed - ATM machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nPin is correct, Login Successfully\n"));
    //console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select a withdrawal method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawns.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.blue `${fastCashAns.fastCash} Withdraw Successfully`);
                console.log(`Your Remaining balance is: ${myBalance} `);
            }
        }
        else if (withdrawns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else
    (console.log(chalk.red("Pin is Incorrect, Try Again!")));
