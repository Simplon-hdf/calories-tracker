"use strict";
// import jwt from 'jsonwebtoken';
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ error: 'No token provided' });
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//       req.userId = decoded.userId;
//       next();
//     } catch (error) {
//       res.status(401).json({ error: 'Invalid token' });
//     }
//   };
