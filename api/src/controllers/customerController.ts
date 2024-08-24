import { Request, Response } from 'express';
import { CustomerModel } from '../models/CustomerModel';
import { signupCustomerService } from '../services/authService';


const customerController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData = req.body;

      // Create a new Customer and Person
      const createCustomer = await signupCustomerService(customerData);
      res.status(201).json(createCustomer);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création du client" });
    }
  },
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const customers = await CustomerModel.getAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des clients" });
    }
  },
  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { uuid } = req.params;
      const customer = await CustomerModel.getById(Number(uuid));
      if (!customer) {
        res.status(404).json({ error: "Client non trouvé" });
        return;
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du client" });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { uuid } = req.params;
      const { personData, ...customerData } = req.body;

      // Update Customer, Person and Location information
      const updatedCustomer = await CustomerModel.update(Number(uuid), { ...customerData, personData});
      res.json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du client" });
    }
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { uuid } = req.params;

      // Delete the Customer and associated entries in Person and Location
      const deletedCustomer = await CustomerModel.delete(Number(uuid));
      res.json(deletedCustomer);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du client" });
    }
  },
};

export default customerController;