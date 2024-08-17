import express from 'express';
import cors from 'cors';
import signupRoute from './routes/signup.js';
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
// Utilisation de la route signup
app.use('/api', signupRoute);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
