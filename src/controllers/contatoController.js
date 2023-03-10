const Contato = require('../models/ContatoModel')

exports.index = (req, res) =>{
    res.render('contato', {
        contato: {}
    })
}
exports.register = async (req, res) =>{
    try{
        const contato = new Contato(req.body)
        await contato.register()  
    
        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => res.redirect('/contato/index'))
            return
        }
        req.flash('success', 'Contato registrado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return

    }catch(e){
        res.render('404')
        console.log(e)
    }
}
exports.editIndex = async function (req, res) {
    if(!req.params.id) return res.render('404')
    const contato = await Contato.buscaPorId(req.params.id)
    if(!contato) return res.render('404')
    res.render('contato', { contato })
}
exports.edit = async function(req, res){
    try{
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`))
            return 
        }
        req.flash('success', 'Contato editado com sucesso')
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
        return

    }catch(e){
        console.log(e)
        res.render('404')
    } 

}
exports.delete = async (req, res) =>{
    if(!req.params.id) return res.render('404')
    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')

    req.flash('success', 'Contato deletado')
    console.log(contato)
    req.session.save(() => res.redirect('/'))
    return

}