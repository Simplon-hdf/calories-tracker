import express from 'express';
import cors from 'cors';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import dotenv from 'dotenv';
// import profileRoute from './routes/profile.js'
// import authMiddleware from './middlewares/authmiddleware.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
// Utilisation de la route signup
app.use('/api', signupRoute);
// Utilisation de la route login
app.use('/api', loginRoute);
// Utilisation de la route profile
// app.use('/api', authMiddleware, profileRoute);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
