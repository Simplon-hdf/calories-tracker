import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const router = Router();

app.use(express.json());

// Function to check balises HTML
const containsHTML = (str: string) => {
  const regex = /<[^>]*>/g;
  return regex.test(str);
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const person = await prisma.person.findUnique({
    where: { email }
  });

  if (!person) {
    return res.status(401).json({ error: 'Informations invalides' });
  }

  // Check password
  const isValidPassword = await bcrypt.compare(password, person.password);

  if (!isValidPassword) {
    return res.status(401).json({ error: 'Informations invalides' });
  }

  // Generate un token JWT
  const token = jwt.sign({ personId: person.uuid }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  // Include user information in the response
  res.json({
    token,
    user: {
      firstname: person.firstname,
      lastname: person.lastname,
      email: person.email
    }
  });
});

export default router;