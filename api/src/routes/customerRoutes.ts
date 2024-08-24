import { Router } from 'express';
import customerController from '../controllers/customerController';



const router = Router();

console.log('Je suis passé côté Backend');

// Récupérer tous les clients
router.get('/customers/', customerController.getAll);

// Récupérer un client par UUID
router.get('/customers/', customerController.getById);

// Créer un nouveau client
router.post('/customers', customerController.create);

// Mettre à jour un client existant
router.put('/customers', customerController.update);

// Supprimer un client
router.delete('/customers', customerController.delete);

export default router;