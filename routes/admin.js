import express from 'express'
import categoria from '../models/Categoria.js'
import Categoria from '../models/Categoria.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Pagina de posts')
})

router.get('/categoria', (req, res) => {
    Categoria.find().lean().sort({date:'desc'}).then((categorias)=>{
        res.render('admin/categorias', {categoria: categorias})
    }).catch((err)=>{
       req.flash('erroMsg', 'Houve um erro')
       res.redirect('/admin')
    })
   
})

router.get('/categoria/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    var erros = []

    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    function validaDados(inputCategoria) {
        if (!inputCategoria || typeof inputCategoria == undefined || novaCategoria == null) {
            return true
        }
    }
    if (validaDados(novaCategoria.nome) || validaDados(novaCategoria.slug)) {
        erros.push({ textos: "Dados invalidos" })
        res.render('admin/addcategorias', { erros: erros })
    } else {
        new Categoria(novaCategoria).save().then(() => {
            req.flash('successMsg',"Sucesso!")
            res.redirect('/admin/categoria')
            console.log("Sucesso")
        }).catch((err) => {
            req.flash('erroMsg', 'Houve um erro!')
            console.log(`Erro ${err}`)
        })
    }


})
router.get('/categorias/edit/:id',(req,res) =>{
    Categoria.findOne({_id:req.params.id}).lean().then((categoria)=>{
        res.render('admin/editcategoria',{categoria:categoria})
    }).catch((err)=>{
        req.flash('erroMsg', 'Essa categoria não exite')
        res.redirect('/admin/categoria')
    })
   
})

router.post('/categoria/edit',(req,res) =>{
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug

        categoria.save().then(()=>{
            req.flash('successMsg','Sucesso em editar a categoria')
            res.redirect('/admin/categoria')

        }).catch((err)=>{
            req.flash('erroMsg', 'Essa categoria não exite')
            res.redirect('/admin/categoria')
        })
        
    }).catch((err)=>{
        req.flash('erroMsg', 'Essa categoria não exite')
        res.redirect('/admin/categoria')
    })
})

export default router
