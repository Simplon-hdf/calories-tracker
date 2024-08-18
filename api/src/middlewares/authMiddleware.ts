// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthRequest extends Request {
//   userId?: number; // Déclarez que userId peut être ajouté au request
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
//     req.userId = decoded.userId; // Assignez l'userId décodé au req
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };
