"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.PersonModel = {
    getAll: async () => {
        return await prisma.person.findMany();
    },
    create: async (data) => {
        return await prisma.person.create({ data });
    },
    getById: async (uuid) => {
        return await prisma.person.findUnique({ where: { uuid } });
    },
    update: async (uuid, data) => {
        return await prisma.person.update({
            where: { uuid },
            data,
        });
    },
    delete: async (uuid) => {
        return await prisma.person.delete({
            where: { uuid },
        });
    },
};
