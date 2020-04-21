var mysql = require("mysql");
var inquirer = require("inquirer");


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

function showAllProducts() {
    connection.query("select * from products", function(err, res) {
        if (err) throw err;

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
        type: "input",
        message: "What is the id of the item you would like to purchase?[Quit with Q]"
    }).then(function(answer) {
        //connection.query()
        if (answer.iditem === "q" || answer.iditem === "Q") {
            connection.end();
            return
        } else if (answer.iditem) {

            showAllProducts();

        }
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