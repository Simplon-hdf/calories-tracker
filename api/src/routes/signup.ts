import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { SignupRequestBody } from '../interfaces/types';

const prisma = new PrismaClient();
const router = Router();

// Function to check balises HTML
const containsHTML = (str: string) => {
  const regex = /<[^>]*>/g;
  return regex.test(str);
};

// Function to capitalize the first letter of a string
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

router.post('/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  // Checking balises HTML in the fields
  if (containsHTML(firstname) || containsHTML(lastname) || containsHTML(email) || containsHTML(password)) {
    return res.status(400).json({ error: "Les balises HTML ne sont pas autorisées dans les champs" });
  }

  try {
    const existingUser = await prisma.person.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email est déjà utilisée' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.person.create({
      data: {
        firstname:capitalize(firstname),
        lastname:capitalize(lastname),
        email:email.toLowerCase(),
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', newUser });
  } catch (error) {
    res.status(500).json({ error: "Echec de creation d'utilisateur" });
  }
});

export default router;