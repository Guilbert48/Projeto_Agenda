const Cadastro = require('../models/CadastroModel')
exports.index = (req, res) =>{
    res.render('cadastro')
} 

exports.register = async (req, res) =>{
    try{
        const cadastro = new Cadastro(req.body)
        await cadastro.register()
        if(cadastro.erros.length > 0){
            req.flash('erros', cadastro.erros)
            req.session.save(function(){
                res.redirect('/cadastro/index')
            })
            return
        }
        req.flash('success', 'Seu usuário foi criado com sucesso')
        req.session.save(function(){
            res.redirect('/cadastro/index')
        })
    }catch(e){
        console.log(e)
        return res.render('404')
    }

}

