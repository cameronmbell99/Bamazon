var mysql = require("mysql");
var inquirer = require("inquirer");

var item = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    showAllProducts();
})

//shows all the products
function showAllProducts() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            var temp = res[i].id;
            item.push(temp.toString());
        }
        item.push("Leave");

        console.log("item_id" + " | " + "product_name" + " | " + "department_name" + " | " + "price" + " | " + "stock_quantity");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        addToCart();
    })
}

//Asks the user if they want to purchase an item 
function addToCart() {
    inquirer.prompt({
        name: "iditem",
        type: "list",
        message: "What is the item you would like to purchase?",
        choices: item
    }).then(function(answer) {
        connection.query("select * from products", function(err, res) {
            if (err) throw err;

            if (answer.iditem === "Leave") {
                connection.end();
            } else if (answer.iditem) {
                var temp = parseInt(answer.iditem, 10);
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like out of: " + res[temp].stock_quantity + "?[Quit with Q]"
                }).then(function(quant) {
                    console.log(quant.quantity);
                    if (quant.quantity <= res[temp].stock_quantity) {

                        showAllProducts();
                    } else if (quant === "Q" || quant === "q") {
                        connection.end();
                    } else {
                        console.log("Sorry that's and invalid number");
                        addToCart();
                    }
                })
            }
        })
    })
}



//formats the products to make them look organized

// function format(int, query) {
//     var Length = 0;
//     var spaces = " ";
//     connection.query("select * from products", function(err, res) {
//         if (err) throw err;
//         switch (query) {
//             case "product":
//                 for (var i = 0; i < res.length; i++) {
//                     if (res[i].product_name.length > Length) {
//                         Length = res[i].product_name.length;
//                     }
//                 }
//                 break;

//             case "department":
//                 for (var i = 0; i < res.length; i++) {
//                     if (res[i].department_name.length > Length) {
//                         Length = res[i].department_name.length;
//                     }
//                 }
//                 break;

//             case "price":
//                 for (var i = 0; i < res.length; i++) {
//                     if (res[i].price.length > Length) {
//                         Length = res[i].price.length;
//                     }
//                 }
//                 break;

//             case "stock":
//                 Length = 12;
//                 break;

//             default:
//                 Length = 11;
//         }

//     })
//     console.log(Length);
//     for (var i = int; i < productLength; i++) {
//         spaces += " ";
//     }
//     console.log(spaces);
//     return spaces;
// }