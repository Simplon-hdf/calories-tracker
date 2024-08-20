"use strict";
// import { PrismaClient } from "@prisma/client";
// import { Router, Request, Response } from "express";
// import authmiddleware from "../middlewares/authmiddleware";
// const prisma = new PrismaClient();
// const router = Router();
// // Route to get user profile information
// router.get('/profile', authmiddleware, async (req: Request, res: Response) => {
//     try {
//         const userId = req.userId; // Make sure that userId is added by the middleware
//         // Request to database to retrieve user information
//         const user = await prisma.person.findUnique({
//             where: { uuid: userId }, // Make sure the ID matches the one in your database
//             select: {
//                 firstname: true,
//                 lastname: true,
//                 email: true,
//             },
//         });
//         if (!user) {
//             return res.status(404).json({ error: 'Utilisateur non trouvé' });
//         }
//         // Returns user profile information
//         res.json(user);
//     } catch (error) {
//         console.error("Erreur lors de la récupération du profil utilisateur:", error);
//         res.status(500).json({ error: "Erreur lors de la récupération du profil utilisateur" });
//     }
// });
// export default router;
