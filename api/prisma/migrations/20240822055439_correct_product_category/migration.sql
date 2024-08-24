-- CreateTable
CREATE TABLE "Product" (
    "id_product" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100),
    "weight" DECIMAL(5,1),
    "kcal" INTEGER NOT NULL,
    "carbohydrates" DECIMAL(4,2),
    "lipids" DECIMAL(4,2),
    "proteins" DECIMAL(4,2),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "Product_Category" (
    "id_product_category" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Product_Category_pkey" PRIMARY KEY ("id_product_category")
);

-- CreateTable
CREATE TABLE "Localisation" (
    "id_localisation" SERIAL NOT NULL,
    "adress" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(20),
    "country" VARCHAR(50) NOT NULL,

    CONSTRAINT "Localisation_pkey" PRIMARY KEY ("id_localisation")
);

-- CreateTable
CREATE TABLE "Person" (
    "uuid" SERIAL NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "uuid" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Customer" (
    "uuid" INTEGER NOT NULL,
    "uuid_person" INTEGER NOT NULL,
    "phone" VARCHAR(20),
    "weight" DECIMAL(4,1) NOT NULL,
    "height" DECIMAL(3,0) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "id_admin" INTEGER,
    "id_localisation" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Target" (
    "id_target" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "target_type" VARCHAR(50) NOT NULL,
    "weight_target" DECIMAL(4,1) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "daily_kcal_target" INTEGER,
    "uuid" INTEGER NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id_target")
);

-- CreateTable
CREATE TABLE "Daily_Consumption" (
    "id_daily_consumption" SERIAL NOT NULL,
    "kcal_quantity" INTEGER,
    "uuid" INTEGER NOT NULL,

    CONSTRAINT "Daily_Consumption_pkey" PRIMARY KEY ("id_daily_consumption")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id_meal" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "meal_time" TIMESTAMP(3) NOT NULL,
    "id_daily_consumption" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id_meal")
);

-- CreateTable
CREATE TABLE "Meal_Product" (
    "id_product" INTEGER NOT NULL,
    "id_meal" INTEGER NOT NULL,
    "product_quantity" DECIMAL(5,1) NOT NULL,
    "unit" VARCHAR(10),

    CONSTRAINT "Meal_Product_pkey" PRIMARY KEY ("id_product","id_meal")
);

-- CreateTable
CREATE TABLE "Product_Category_Product" (
    "id_product" INTEGER NOT NULL,
    "id_product_category" INTEGER NOT NULL,

    CONSTRAINT "Product_Category_Product_pkey" PRIMARY KEY ("id_product","id_product_category")
);

-- CreateTable
CREATE TABLE "Admin_Product" (
    "id_product" INTEGER NOT NULL,
    "id_admin" INTEGER NOT NULL,

    CONSTRAINT "Admin_Product_pkey" PRIMARY KEY ("id_product","id_admin")
);

-- CreateTable
CREATE TABLE "Customer_Product" (
    "uuid" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "Customer_Product_pkey" PRIMARY KEY ("uuid","id_product")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_Category_name_key" ON "Product_Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_uuid_key" ON "Admin"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uuid_person_key" ON "Customer"("uuid_person");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Target_uuid_key" ON "Target"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_Consumption_uuid_key" ON "Daily_Consumption"("uuid");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Person"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_uuid_person_fkey" FOREIGN KEY ("uuid_person") REFERENCES "Person"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Admin"("id_admin") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id_localisation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily_Consumption" ADD CONSTRAINT "Daily_Consumption_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_id_daily_consumption_fkey" FOREIGN KEY ("id_daily_consumption") REFERENCES "Daily_Consumption"("id_daily_consumption") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal_Product" ADD CONSTRAINT "Meal_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal_Product" ADD CONSTRAINT "Meal_Product_id_meal_fkey" FOREIGN KEY ("id_meal") REFERENCES "Meal"("id_meal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category_Product" ADD CONSTRAINT "Product_Category_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Category_Product" ADD CONSTRAINT "Product_Category_Product_id_product_category_fkey" FOREIGN KEY ("id_product_category") REFERENCES "Product_Category"("id_product_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin_Product" ADD CONSTRAINT "Admin_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin_Product" ADD CONSTRAINT "Admin_Product_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "Admin"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Product" ADD CONSTRAINT "Customer_Product_uuid_fkey" FOREIGN KEY ("uuid") REFERENCES "Customer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Product" ADD CONSTRAINT "Customer_Product_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
