import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Trouve l'utilisateur par email
    const person = await prisma.person.findUnique({
      where: { email }
    });
  
    if (!person) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Vérifie le mot de passe
    const isValidPassword = await bcrypt.compare(password, person.password);
  
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Génère un token JWT
    const token = jwt.sign({ personId: person.uuid }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  
    res.json({ token });
  });