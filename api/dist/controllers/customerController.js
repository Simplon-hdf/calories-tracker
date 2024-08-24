"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerModel_1 = require("../models/CustomerModel");
const customerController = {
    getAll: async (req, res) => {
        try {
            const customers = await CustomerModel_1.CustomerModel.getAll();
            res.json(customers);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des clients" });
        }
    },
    getById: async (req, res) => {
        try {
            const { uuid } = req.params;
            const customer = await CustomerModel_1.CustomerModel.getById(Number(uuid));
            if (!customer) {
                res.status(404).json({ error: "Client non trouvé" });
                return;
            }
            res.json(customer);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération du client" });
        }
    },
    create: async (req, res) => {
        try {
            const { personData, ...customerData } = req.body;
            // Create a new Customer, Location and Person
            const newCustomer = await CustomerModel_1.CustomerModel.create({ ...customerData, personData });
            res.status(201).json(newCustomer);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la création du client" });
        }
    },
    update: async (req, res) => {
        try {
            const { uuid } = req.params;
            const { personData, ...customerData } = req.body;
            // Update Customer, Person and Location information
            const updatedCustomer = await CustomerModel_1.CustomerModel.update(Number(uuid), { ...customerData, personData });
            res.json(updatedCustomer);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
        }
    },
    delete: async (req, res) => {
        try {
            const { uuid } = req.params;
            // Delete the Customer and associated entries in Person and Location
            const deletedCustomer = await CustomerModel_1.CustomerModel.delete(Number(uuid));
            res.json(deletedCustomer);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression du client" });
        }
    },
};
exports.default = customerController;
