const express = require('express');
const accountRoute = express.Router();
const authentication=require('../middlewares/authMiddlewares')
// Import controller functions
const {
    createAccount,
    deleteAccount,
    credit,
    debit,
    transaction
} = require('../controllers/accountControllers');

// Routes
accountRoute.post('/createAccount', authentication, createAccount);
accountRoute.delete('/deleteAccount/:account_id',authentication, deleteAccount);  // DELETE with param
accountRoute.post('/credit',authentication, credit);
accountRoute.post('/debit',authentication, debit);
accountRoute.post('/transaction',authentication,transaction);

module.exports = accountRoute;
