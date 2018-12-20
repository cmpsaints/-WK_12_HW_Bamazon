// require mysql and inquirer Node modules
var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to SQL database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Qwerttyy123_",
  database: "Bamazon"
})


function customerPurchase(){
    connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;

        console.log(".....Welcome to Bamazon.....");
        console.log("*********************************************");

        for(var i = 0; i<res.length;i++){
            console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + 
                        "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
            console.log("-------------------------------------------------------------------------------------------------------------------");
        }

        console.log("\n");

        inquirer.prompt(
        [{
            type: "input",
            name: "id",
            message: "What is the product ID of the product you would like to purchase?",
            validate: function(value){
                if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                    return true;
                } else{
                    return false;
                }
            }
        },

        {
            type: "input",
            name: "qty",
            message: "How much would you like to purchase?",
            validate: function(value){
                if(isNaN(value)){
                    return false;
                } else{
                    return true;
                }
            }
        }])
        .then(function(answer){
            var whatToBuy = (answer.id)-1;
            var howMuchToBuy = parseInt(answer.qty);
            var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

        // check if enough quantity

            if(res[whatToBuy].StockQuantity >= howMuchToBuy){
                // updates quantity in Products table after purchase
                connection.query("UPDATE Products SET ? WHERE ?", [
                    {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
                    {ItemID: answer.id}
                ], function(err, result){
                        if(err) throw err;
                        console.log("Success! Your total is $" + grandTotal.toFixed(2) + ".");
                        reprompt();
                    }
                );
            
                // connection.query("SELECT * FROM Departments", function(err, deptRes){
                //     if(err) throw err;
                //     var index;
                //     for(var i = 0; i < deptRes.length; i++){
                //         if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
                //             index = i;
                //         }
                //     }
                //     // reprompt();
                // });
            
            } else{
                console.log("Sorry, there's not enough in stock!");
                reprompt();
            }
    
            // reprompt();
        });
    });
}

//asks customer if want to purchase another item

function reprompt(){
    inquirer.prompt(
    [{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function(answer){
        if(answer.reply){
            start();
        } else{
            console.log("See you soon! (cmd-C for Mac, or ctrl-C for Windows to finalize exit)");
        }
    });
}

customerPurchase();