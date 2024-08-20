import express, { Request, Response } from 'express';
import productRoute from './routes/product';


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', productRoute);


app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
