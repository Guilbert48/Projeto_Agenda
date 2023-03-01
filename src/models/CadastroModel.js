const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const CadastroSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
  constructor(body){
    this.body = body
    this.erros = []
    this.users = null
  }
 async register(){
   this.valida()
   if(this.erros.length > 0) return
   
   await this.usersExists()
   if(this.erros.length > 0) return
   try{
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await CadastroModel.create(this.body)
      }catch(e){
        console.log(e)
      }
  }

 async usersExists(){
    const user = await CadastroModel.findOne({ email: this.body.email })
    if(user) this.erros.push('Este usuário já existe')
  }


//Validação
  valida(){
    this.cleanUp
    if(!validator.isEmail(this.body.email)){
      this.erros.push('E-mail inválido')
    }

    if(this.body.password.length < 3 || this.body.password.length > 50){
        this.erros.push('A senha precisa ter entre 3 e 50 caracteres')
    }
  }

  cleanUp(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '' 
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password, 
    }
  }

}

module.exports = Cadastro;
