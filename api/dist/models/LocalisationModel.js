"use strict";
// import { Localisation, PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const LocalisationModel = {
//     getAll: async (): Promise<Localisation[]> => {
//         return await prisma.localisation.findMany();
//     },
//     getById: async (uuid: number): Promise<Localisation | null> => {
//         return await prisma.localisation.findUnique({ where: { uuid } });
//     },
//     create: async (data:Omit<Localisation,'uuid'>): Promise<Localisation> => {
//         return await prisma.localisation.create({data});
//     },
//     update: async (uuid:number, data:Partial<Localisation>): Promise<Localisation> => {
//         return await prisma.localisation.update({
//             where: {uuid},
//             data,
//         })
//     },
//     delete: async (uuid:number): Promise<Localisation>=> {
//         return await prisma.localisation.delete({
//             where: {uuid},
//         });
//     },
// };
