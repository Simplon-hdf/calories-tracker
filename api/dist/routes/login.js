"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
app.use(express_1.default.json());
// Function to check balises HTML
const containsHTML = (str) => {
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
    const isValidPassword = await bcryptjs_1.default.compare(password, person.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Informations invalides' });
    }
    // Generate un token JWT
    const token = jsonwebtoken_1.default.sign({ personId: person.uuid }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    // Include user information in the response
    res.json({
        token,
        user: {
            firstname: person.pseudo,
            email: person.email
        }
    });
});
exports.default = router;
