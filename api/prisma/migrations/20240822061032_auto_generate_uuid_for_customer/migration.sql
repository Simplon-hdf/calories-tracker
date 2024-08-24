-- AlterTable
CREATE SEQUENCE customer_uuid_seq;
ALTER TABLE "Customer" ALTER COLUMN "uuid" SET DEFAULT nextval('customer_uuid_seq');
ALTER SEQUENCE customer_uuid_seq OWNED BY "Customer"."uuid";
