import { Router } from 'express';
import customerController from '../controllers/customerController'

const router = Router();

// Récupérer tous les clients
router.get('/customers', customerController.getAll);

// Récupérer un client par UUID
router.get('/customers/:uuid', customerController.getById);

// Créer un nouveau client
router.post('/customers', customerController.create);

// Mettre à jour un client existant
router.put('/customers/:uuid', customerController.update);

// Supprimer un client
router.delete('/customers/:uuid', customerController.delete);

export default router;