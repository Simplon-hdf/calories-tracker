// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import '../interfaces/types';

// // Load environment variables from the .env file
// dotenv.config();

// // Authentification middleware
// const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // Retrieving the token from the request headers
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({ error: 'Accès refusé, aucun token fourni.' });
//     }
//     // The token is generally sent in the "Bearer <token>" format.
//     const token = authHeader.split(' ')[1];
//     try {
//         // Checking et décryptage du token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

//         // Add the user ID to the request object
//         req.userId = decoded.userId;
//         // Move on to the next middleware or route
//         next();
//     } catch (err) {
//         return res.status(401).json({ error: 'Token invalide.' });
//     }
// };

// export default authmiddleware