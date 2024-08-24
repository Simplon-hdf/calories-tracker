"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupCustomer = void 0;
const client_1 = require("@prisma/client");
const CustomerModel_1 = require("../models/CustomerModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const signupCustomer = async (data) => {
    const { pseudo, email, password, ...customerData } = data;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // const {personData, customerData} = data;
    return await prisma.$transaction(async (prisma) => {
        // Créer une nouvelle Personne
        const customer = await CustomerModel_1.CustomerModel.create({
            personData: {
                pseudo,
                email,
                password: hashedPassword, // Assurez-vous de hacher le mot de passe avant de le stocker
            },
            customerData
        });
        return customer;
    });
};
exports.signupCustomer = signupCustomer;
