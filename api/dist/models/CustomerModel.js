"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.CustomerModel = {
    getAll: async () => {
        return await prisma.customer.findMany({
            include: { Person: true }
        });
    },
    getById: async (uuid) => {
        return await prisma.customer.findUnique({
            where: { uuid },
            include: { Person: true }, // Include information from the linked Person table
        });
    },
    create: async (data) => {
        const { personData, customerData } = data;
        // Create the person
        const createdPerson = await prisma.person.create({
            data: personData,
        });
        // Use the `Person` to create the `Customer`.
        return await prisma.customer.create({
            data: {
                ...customerData,
                uuid: createdPerson.uuid, // Link customer to created Person
            },
        });
    },
    update: async (uuid, data) => {
        const { personData, ...customerData } = data;
        if (personData) {
            // Update datas in the table "Person"
            await prisma.person.update({
                where: { uuid },
                data: personData,
            });
        }
        // Update datas in the table "Customer"
        return await prisma.customer.update({
            where: { uuid },
            data: customerData,
        });
    },
    delete: async (uuid) => {
        // Delete Customer 
        const deletedCustomer = await prisma.customer.delete({
            where: { uuid },
        });
        // Delete Person associated to Customer
        await prisma.person.delete({
            where: { uuid },
        });
        return deletedCustomer;
    },
};
