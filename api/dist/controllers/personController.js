"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const PersonModel_1 = require("../models/PersonModel");
exports.PersonController = {
    getAll: async (req, res) => {
        try {
            const persons = await PersonModel_1.PersonModel.getAll();
            res.json(persons);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la recuperation des personnes." });
        }
    },
    create: async (req, res) => {
        try {
            const newPerson = await PersonModel_1.PersonModel.create(req.body);
            res.status(201).json(newPerson);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la création." });
        }
    },
    update: async (req, res) => {
        try {
            const { uuid } = req.params;
            const updatedPerson = await PersonModel_1.PersonModel.update(Number(uuid), req.body);
            res.json(updatedPerson);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour." });
        }
    },
    delete: async (req, res) => {
        try {
            const { uuid } = req.params;
            const deletedPerson = await PersonModel_1.PersonModel.delete(Number(uuid));
            res.json(deletedPerson);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression de la personne" });
        }
    },
};
