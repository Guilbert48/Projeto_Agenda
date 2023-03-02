const Login = require('../models/LoginModel')

exports.index = (req, res) =>{
    if(req.session.user) return res.render('login-logado')
    return res.render('login')
}
exports.login = async function (req, res){
try{
    const login = new Login(req.body)
    await login.login()

    if(login.erros.length > 0){
        req.flash('erros', login.erros)
        req.session.save(function(){    
            return res.redirect('/login/index')
        })
        return
    }

    req.flash('success', 'Você fez login com sucesso')
    req.session.user = login.user
    req.session.save(function(){
    return res.redirect('/login/index')
    })
}catch(e){
    console.log(e) 
    return res.render('404')
}
}

exports.logout = function(req, res){
    req.session.destroy()
    res.redirect('/')
}