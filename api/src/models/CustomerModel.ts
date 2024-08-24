import { Customer, Person, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CustomerModel = {

    getAll: async (): Promise<Customer[]> => {
        return await prisma.customer.findMany({
            include: { Person: true}
        });
    },

    getById: async (uuid: number): Promise<Customer | null> => {
        return await prisma.customer.findUnique({
            where: { uuid },
            include: { Person: true }, // Include information from the linked Person table
        });
    },

    create: async (data: { personData: Omit<Person, 'uuid'>; customerData :{ weight: number ; height: number; gender: string; birth_date: string; id_admin?: number | null;}; }): Promise<Customer> => {
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
    
    update: async (uuid: number, data: Partial<Customer> & { personData?: Partial<Person> }): Promise<Customer> => {
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

    delete: async (uuid: number): Promise<Customer> => {

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