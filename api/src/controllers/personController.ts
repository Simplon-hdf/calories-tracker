import { Request, Response } from "express";
import { PersonModel } from "../models/PersonModel";

export const PersonController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const persons =await PersonModel.getAll();
            res.json(persons);
        } catch (error) {
            res.status(500).json({error: "Erreur lors de la recuperation des personnes."});
        }
    },
    create: async (req: Request, res: Response): Promise<void> => {
        try {
          const newPerson = await PersonModel.create(req.body);
          res.status(201).json(newPerson);
        } catch (error) {
          res.status(500).json({ error: "Erreur lors de la création." });
        }
      },
      update: async (req: Request, res: Response): Promise<void> => {
        try {
          const { uuid } = req.params;
          const updatedPerson = await PersonModel.update(Number(uuid), req.body);
          res.json(updatedPerson);
        } catch (error) {
          res.status(500).json({ error: "Erreur lors de la mise à jour." });
        }
      },
      delete: async (req: Request, res: Response): Promise<void> => {
        try {
          const { uuid } = req.params;
          const deletedPerson = await PersonModel.delete(Number(uuid));
          res.json(deletedPerson);
        } catch (error) {
          res.status(500).json({ error: "Erreur lors de la suppression de la personne" });
        }
      },
}