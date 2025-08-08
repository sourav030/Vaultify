const express = require('express');
const { createBank, deleteBank ,getBank } = require('../controllers/bankControllers');

const bankRoute = express.Router();

// Create bank
bankRoute.post('/createBank', createBank);

// Delete bank
bankRoute.delete('/deleteBank', deleteBank);
bankRoute.get('/getAllBank',getBank)

module.exports = bankRoute;
