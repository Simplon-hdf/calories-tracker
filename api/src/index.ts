import express from 'express';
import cors from 'cors';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import dotenv from 'dotenv';
// import personRoute from './routes/profile.js'

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
// Utilisation de la route person
// app.use('/api', personRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
