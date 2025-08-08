const express = require('express');
const userRoute = express.Router();
const { createUser, Login } = require('../controllers/userControllers');

userRoute.post('/createUser', createUser);
userRoute.post('/login', Login);

module.exports = userRoute;
