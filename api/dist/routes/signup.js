"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Function to check balises HTML
const containsHTML = (str) => {
    const regex = /<[^>]*>/g;
    return regex.test(str);
};
// Function to capitalize the first letter of a string
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
router.post('/signup', async (req, res) => {
    const { pseudo, email, password } = req.body;
    // Checking balises HTML in the fields
    if (containsHTML(pseudo) || containsHTML(email) || containsHTML(password)) {
        return res.status(400).json({ error: "Les balises HTML ne sont pas autorisées dans les champs" });
    }
    try {
        const existingUser = await prisma.person.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email est déjà utilisée' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma.person.create({
            data: {
                pseudo: capitalize(pseudo),
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'Utilisateur créé avec succès', newUser });
    }
    catch (error) {
        res.status(500).json({ error: "Echec de creation d'utilisateur" });
    }
});
exports.default = router;
