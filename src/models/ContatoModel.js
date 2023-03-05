const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },


  descricao: String
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
  this.body = body
  this.erros = []
  this.contato = null
}
Contato.buscaPorId = async function(id){
  if(typeof id !== 'string') return 
  const user = await ContatoModel.findById(id)
  return user
}

Contato.prototype.register = async function(){
  this.valida()
  if(this.erros.length > 0) return
  this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function (){
  this.cleanUp()

  if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push('E-mail ou senha inválidos')
  if(!this.body.nome) this.erros.push('Nome é um campo obrigatório')
  if(!this.body.email && !this.body.telefone){
    this.erros.push('Pelo menos um contato precisa ser enviado: email e/ou telefone')

  } 
  
}


Contato.prototype.cleanUp = function() {
  for(const key in this.body){
    if(typeof this.body[key] !== 'string'){
      this.body[key] = '' 
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
    
  }
}


module.exports = Contato;
