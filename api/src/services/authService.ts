import { PrismaClient } from '@prisma/client';
import { CustomerModel } from '../models/CustomerModel';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const signupCustomerService = async (data: {
    pseudo: string
    email: string;
    password: string;
    weight: number;
    height: number;
    gender: string;
    birth_date: string
}) => {
    const {
        pseudo,
        email,
        password,
        ...customerData
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    // const {personData, customerData} = data;

    return await prisma.$transaction(async () => {
        // Créer une nouvelle Personne
        const customer = await CustomerModel.create({
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

