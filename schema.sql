DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    ItemID INT AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(80) NOT NULL,
    DepartmentName VARCHAR(40) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(5) NOT NULL,
    primary key(ItemID)
);

select * from Products;

INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES 
    ("2001 A Space Odyssey","ENTERTAINMENT",10.00,12),
    ("Mr Nobody","ENTERTAINMENT",15.50,8),
    ("Battlefield 5","ENTERTAINMENT",39.95,30),
    ("Unreal Tournament","ENTERTAINMENT",29.95,40),
    ("sack of potatoes","GROCERIES",9.99,50),
    ("tub of ice cream","GROCERIES",4.95,60),
    ("sunglasses","CLOTHING",89.99,20),
    ("pair of men's jeans","CLOTHING",60.00,45),
    ("basketball","RECREATIONAL",24.00,50),
    ("bicycle","RECREATIONAL",90.00,20);