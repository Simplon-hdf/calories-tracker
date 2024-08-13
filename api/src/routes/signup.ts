import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  // Vérifie si l'utilisateur existe déjà
  const existingUser = await prisma.person.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Hash le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Crée l'utilisateur
    const newUser = await prisma.person.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
});