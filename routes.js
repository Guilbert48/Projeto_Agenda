const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')
const contatoController = require('./src/controllers/contatoController')

// Rotas da home
route.get('/', homeController.index);

//Rotas de login

route.get('/login/index', loginController.index)
route.post('/login/index', loginController.login)
route.get('/login/logout', loginController.logout)

//Rotas de cadastro
route.get('/cadastro/index', cadastroController.index)
route.post('/cadastro/register', cadastroController.register)

//Rotas de contato
route.get('/contato/index', contatoController.index)
route.post('/contato/register', contatoController.register )
route.get('/contato/index/:id', contatoController.editIndex)
route.post('/contato/edit/:id', contatoController.edit)

module.exports = route;
