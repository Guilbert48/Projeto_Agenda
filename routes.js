const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')
// Rotas da home
route.get('/', homeController.index);

//Rotas de login

route.get('/login/index', loginController.index)

//Rotas de cadastro
route.get('/cadastro/index', cadastroController.index)
route.post('/cadastro/register', cadastroController.register)

module.exports = route;
