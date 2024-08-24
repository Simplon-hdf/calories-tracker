"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = __importDefault(require("../controllers/customerController"));
const router = (0, express_1.Router)();
// Récupérer tous les clients
router.get('/customers', customerController_1.default.getAll);
// Récupérer un client par UUID
router.get('/customers/:uuid', customerController_1.default.getById);
// Créer un nouveau client
router.post('/customers', customerController_1.default.create);
// Mettre à jour un client existant
router.put('/customers/:uuid', customerController_1.default.update);
// Supprimer un client
router.delete('/customers/:uuid', customerController_1.default.delete);
exports.default = router;
