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
                var temp = parseInt(answer.iditem, 10) - 1;
                console.log("You selected " + res[temp].product_name + "!");
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?[Quit with Q]\ntotal: " + res[temp].stock_quantity + "\nPrice: " + res[temp].price + "\n"
                }).then(function(quant) {
                    if (quant.quantity <= res[temp].stock_quantity) {

                        var updateStock = res[temp].stock_quantity - quant.quantity;
                        var num = answer.iditem;

                        update(updateStock, num);

                        var price = parseInt(res[temp].price);
                        var total = quant.quantity * price;

                        console.log("Your total is: $" + total);
                        inquirer.prompt({
                            name: "stay",
                            type: "list",
                            message: "Would you like to leave or keep shopping?",
                            choices: ["Keep Shopping", "Leave"]
                        }).then(function(order) {
                            if (order.stay === "Keep Shopping") {
                                showAllProducts();
                            } else {
                                connection.end();
                            }

                        })
                    } else if (quant.quantity === "Q" || quant.quantity === "q") {

                        connection.end();
                    } else {

                        console.log("Insufficient Quantity");
                        addToCart();
                    }
                })
            }
        })
    })
}

function update(updateStock, num) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [updateStock, num], (err) => {
        if (err) throw err;
    });
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