CREATE TABLE Products(
   id_product INT,
   name VARCHAR(100) NOT NULL,
   brand VARCHAR(100) NOT NULL,
   weight DECIMAL(4,1),
   energetic_value_kcal INT NOT NULL,
   carbohydrates DECIMAL(4,2) NOT NULL,
   lipids DECIMAL(4,2) NOT NULL,
   proteins DECIMAL(4,2) NOT NULL,
   PRIMARY KEY(id_product)
);

CREATE TABLE Product_Categories(
   id_product_category INT,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_product_category),
   UNIQUE(name)
);

CREATE TABLE Localisation(
   id_localisation INT,
   adress VARCHAR(100) NOT NULL,
   city VARCHAR(100) NOT NULL,
   zip_code VARCHAR(10) NOT NULL,
   PRIMARY KEY(id_localisation)
);

CREATE TABLE Customers(
   uuid INT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(20),
   weight DECIMAL(4,1),
   height DECIMAL(3,0),
   id_localisation INT NOT NULL,
   PRIMARY KEY(uuid),
   UNIQUE(email),
   UNIQUE(phone),
   FOREIGN KEY(id_localisation) REFERENCES Localisation(id_localisation)
);

CREATE TABLE Meals(
   id_meal INT,
   title_meal VARCHAR(100) NOT NULL,
   meal_time DATETIME NOT NULL,
   uuid INT NOT NULL,
   PRIMARY KEY(id_meal),
   FOREIGN KEY(uuid) REFERENCES Customers(uuid)
);

CREATE TABLE Targets(
   id_target INT,
   name VARCHAR(100) NOT NULL,
   target_type VARCHAR(50) NOT NULL,
   weight_target DECIMAL(4,1),
   start_date DATE NOT NULL,
   end_date DATE,
   uuid INT NOT NULL,
   PRIMARY KEY(id_target),
   UNIQUE(uuid),
   FOREIGN KEY(uuid) REFERENCES Customers(uuid)
);

CREATE TABLE Meal_Products(
   id_product INT,
   id_meal INT,
   PRIMARY KEY(id_product, id_meal),
   FOREIGN KEY(id_product) REFERENCES Products(id_product),
   FOREIGN KEY(id_meal) REFERENCES Meals(id_meal)
);

CREATE TABLE Product_Category_Products(
   id_product INT,
   id_product_category INT,
   PRIMARY KEY(id_product, id_product_category),
   FOREIGN KEY(id_product) REFERENCES Products(id_product),
   FOREIGN KEY(id_product_category) REFERENCES Product_Categories(id_product_category)
);
