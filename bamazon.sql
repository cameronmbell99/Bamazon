
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- Creates the table "products" within animals_db --
CREATE TABLE products (
 
  id integer(200) auto_increment not null,

  product_name varchar(30) not null,

  department_name varchar(30) not null,

  price integer(10) not null,

  stock_quantity integer(10) not null,

  primary key (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX ONE", "Electronics", 400, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Electronics", 400, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doom Eternal", "Video Games", 60, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Animal Crossing: New Horizons", "Video Games", 4, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Titanic", "Entertainment", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sonic the Hedgehog", "Entertainment", 4, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Denim Jeans", "Apparel", 40, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sundress", "Apperal", 35, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Necessities", 5, 4000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hand Sanatizer", "Necessities", 3, 4000);

-- DROP DATABASE IF EXISTS bamazon_db;