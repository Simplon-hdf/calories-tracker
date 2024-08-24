"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_js_1 = __importDefault(require("./routes/signup.js"));
const login_js_1 = __importDefault(require("./routes/login.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const customerRoutes_js_1 = __importDefault(require("./routes/customerRoutes.js"));
// import profileRoute from './routes/profile.js'
// import authMiddleware from './middlewares/authmiddleware.js';
dotenv_1.default.config();
console.log('Bonjour');
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3001', 10);
const ip = process.env.IP || 'localhost';
// Configure the authorised origin for CORS
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: allowedOrigin
}));
// Utilisation de la route signup
app.use('/api', signup_js_1.default);
// Utilisation de la route login
app.use('/api', login_js_1.default);
// Utilisation de la route for Persons
app.use('/api', customerRoutes_js_1.default);
app.listen(port, ip, () => {
    console.log(`Server en cours d'exécution sur http://${ip}:${port}`);
});
