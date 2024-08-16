const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/product/:barcode', controller.getProduct);

module.exports = router;