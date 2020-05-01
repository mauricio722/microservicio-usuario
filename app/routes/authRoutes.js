const Routes = require('express').Router();
const authController = require('../controllers/authController');

Routes.get('/:id', authController.getAuthByCode);
Routes.post('/create', authController.create);
Routes.post('/login', authController.login);
Routes.put('/update/:id', authController.updateAuth);
Routes.put('/changepassword/:email', authController.updateAuthPassword);
Routes.get('/user/:email', authController.getUserByEmail);
Routes.put('/recoverPass/:email', authController.recoverPassword);

module.exports = Routes;
