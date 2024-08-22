import { Customer, Localisation, Person, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CustomerModel = {

    getAll: async (): Promise<Customer[]> => {
        return await prisma.customer.findMany({
            include: { Person: true, Localisation: true }
        });
    },

    getById: async (uuid: number): Promise<Customer | null> => {
        return await prisma.customer.findUnique({
            where: { uuid },
            include: { Person: true, Localisation: true }, // Include information from the linked Person table
        });
    },

    create: async (data: Omit<Customer, 'uuid'> & { personData: Omit<Person, 'uuid'>, localisationData: Omit<Localisation, 'id_localisation'> }): Promise<Customer> => {
        const { personData, localisationData, ...customerData } = data;

        // Create the location first
        const createdLocalisation = await prisma.localisation.create({
            data: localisationData,
        });
        // Create the person
        const createdPerson = await prisma.person.create({
            data: personData,
        });
        // Use the `Person` and `Location` identifiers to create the `Customer`.
        return await prisma.customer.create({
            data: {
                ...customerData,
                uuid: createdPerson.uuid, // Link customer to created Person
                id_localisation: createdLocalisation.id_localisation,
            },
        });
    },

    update: async (uuid: number, data: Partial<Customer> & { personData?: Partial<Person>, localisationData?: Partial<Localisation> }): Promise<Customer> => {
        const { personData, localisationData, ...customerData } = data;

        if (personData) {
            // Update datas in the table "Person"
            await prisma.person.update({
                where: { uuid },
                data: personData,
            });
        }
        if (localisationData) {
            // Update the information in the Location table
            await prisma.localisation.update({
                where: { id_localisation: customerData.id_localisation },
                data: localisationData,
            });
        }
        // Update datas in the table "Customer"
        return await prisma.customer.update({
            where: { uuid },
            data: customerData,
        });
    },

    delete: async (uuid: number): Promise<Customer> => {

        // Delete Customer 
        const deletedCustomer = await prisma.customer.delete({
            where: { uuid },
        });

        // Delete the associated location
        await prisma.localisation.delete({
            where: { id_localisation: deletedCustomer.id_localisation },
        });

        // Delete Person associated to Customer
        await prisma.person.delete({
            where: { uuid },
        });

        return deletedCustomer;
    },
};