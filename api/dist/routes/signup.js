import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await prisma.person.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.person.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User created successfully', newUser });
    }
    catch (error) {
        res.status(500).json({ error: 'User creation failed' });
    }
});
export default router;
