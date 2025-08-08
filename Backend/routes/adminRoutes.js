const express = require('express');
const adminRoute = express.Router();
const { createUser, Login } = require('../controllers/adminControllers');

adminRoute.post('/createUser', createUser);
adminRoute.post('/login', Login);

module.exports = adminRoute;
