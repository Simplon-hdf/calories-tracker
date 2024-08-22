import { Person, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PersonModel = {
    getAll: async (): Promise<Person[]> => {
        return await prisma.person.findMany();
    },
    create: async (data:Omit<Person,'uuid'>): Promise<Person> => {
        return await prisma.person.create({data});
    },
    getById: async (uuid: number): Promise<Person | null> => {
        return await prisma.person.findUnique({ where: { uuid } });
    },
    update: async (uuid:number, data:Partial<Person>): Promise<Person> => {
        return await prisma.person.update({
            where: {uuid},
            data,
        })
    },
    delete: async (uuid:number): Promise<Person>=> {
        return await prisma.person.delete({
            where: {uuid},
        });
    },
};