import express from 'express';
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get('/', async (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
