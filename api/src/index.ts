import express from 'express';
import cors from 'cors';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();
console.log('Bonjour');


const app = express();
const port = parseInt(process.env.PORT || '3001', 10);
const ip = process.env.IP || 'localhost';

// Configure the authorised origin for CORS
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:8080';

app.use(express.json());
app.use(cors({
  origin: allowedOrigin
}));

// Utilisation de la route signup
app.use('/api', signupRoute);
// Utilisation de la route login
app.use('/api', loginRoute);
// Utilisation de la route for Persons
app.use('/api',  customerRoutes);

app.listen(port, ip, () => {
  console.log(`Server en cours d'exécution sur http://${ip}:${port}`);
});
