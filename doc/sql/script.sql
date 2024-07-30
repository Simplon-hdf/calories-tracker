CREATE TABLE Product (
   id_product SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   brand VARCHAR(100),
   weight DECIMAL(5,1),
   kcal INT NOT NULL,
   carbohydrates DECIMAL(4,2),
   lipids DECIMAL(4,2),
   proteins DECIMAL(4,2)
);

CREATE TABLE Product_Categorie (
   id_product_category SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Localisation (
   id_localisation SERIAL PRIMARY KEY,
   adress VARCHAR(255) NOT NULL,
   city VARCHAR(255) NOT NULL,
   zip_code VARCHAR(20),
   country VARCHAR(50) NOT NULL
);

CREATE TABLE Person (
   uuid SERIAL PRIMARY KEY,
   firstname VARCHAR(100) NOT NULL,
   lastname VARCHAR(100) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL
);

CREATE TABLE Admin (
   id_admin SERIAL PRIMARY KEY,
   uuid INT NOT NULL UNIQUE,
   FOREIGN KEY(uuid) REFERENCES Person(uuid)
);

CREATE TABLE Customer (
   uuid INT PRIMARY KEY,
   phone VARCHAR(20) UNIQUE,
   weight DECIMAL(4,1) NOT NULL,
   height DECIMAL(3,0) NOT NULL,
   gender VARCHAR(10) NOT NULL,
   id_admin INT,
   id_localisation INT NOT NULL,
   FOREIGN KEY(uuid) REFERENCES Person(uuid),
   FOREIGN KEY(id_admin) REFERENCES Admin(id_admin),
   FOREIGN KEY(id_localisation) REFERENCES Localisation(id_localisation)
);

CREATE TABLE Target (
   id_target SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   target_type VARCHAR(50) NOT NULL,
   weight_target DECIMAL(4,1) NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL,
   daily_kcal_target INT,
   uuid INT NOT NULL UNIQUE,
   FOREIGN KEY(uuid) REFERENCES Customer(uuid)
);

CREATE TABLE Daily_Consumption (
   id_daily_consumption SERIAL PRIMARY KEY,
   kcal_quantity INT,
   uuid INT NOT NULL UNIQUE,
   FOREIGN KEY(uuid) REFERENCES Customer(uuid)
);

CREATE TABLE Meal (
   id_meal SERIAL PRIMARY KEY,
   title VARCHAR(100),
   meal_time TIMESTAMP NOT NULL,
   id_daily_consumption INT NOT NULL,
   FOREIGN KEY(id_daily_consumption) REFERENCES Daily_Consumption(id_daily_consumption)
);

CREATE TABLE Meal_Product (
   id_product INT,
   id_meal INT,
   product_quantity DECIMAL(5,1) NOT NULL,
   unit VARCHAR(10),
   PRIMARY KEY(id_product, id_meal),
   FOREIGN KEY(id_product) REFERENCES Product(id_product),
   FOREIGN KEY(id_meal) REFERENCES Meal(id_meal)
);

CREATE TABLE Product_Category_Product (
   id_product INT,
   id_product_category INT,
   PRIMARY KEY(id_product, id_product_category),
   FOREIGN KEY(id_product) REFERENCES Product(id_product),
   FOREIGN KEY(id_product_category) REFERENCES Product_Categorie(id_product_category)
);

CREATE TABLE Admin_Product (
   id_product INT,
   id_admin INT,
   PRIMARY KEY(id_product, id_admin),
   FOREIGN KEY(id_product) REFERENCES Product(id_product),
   FOREIGN KEY(id_admin) REFERENCES Admin(id_admin)
);

CREATE TABLE Customer_Product (
   uuid INT,
   id_product INT,
   PRIMARY KEY(uuid, id_product),
   FOREIGN KEY(uuid) REFERENCES Customer(uuid),
   FOREIGN KEY(id_product) REFERENCES Product(id_product)
);