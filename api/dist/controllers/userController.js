"use strict";
// import { Request, Response } from 'express';
// import { getUserProfile } from '../services/userService';
// interface AuthRequest extends Request {
//   userId?: number; // Déclarez que userId peut être ajouté au request
// }
// export const profileController = async (req: AuthRequest, res: Response) => {
//   try {
//     const user = await getUserProfile(req.userId!); // Utilisez req.userId ici
//     if (!user) {
//       return res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur lors de la récupération du profil utilisateur" });
//   }
// };
