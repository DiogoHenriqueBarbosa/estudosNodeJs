import express from 'express'
import Categoria from '../models/Categoria.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('Pagina de posts')
})

router.get('/categoria', (req, res) => {
    res.render('admin/categorias')
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

    if(!novaCategoria.nome || typeof novaCategoria.nome == undefined || novaCategoria.nome == null){
        erros.push({texto:"Nome invalido"})
    }
    if(!novaCategoria.slug || typeof novaCategoria.slug == undefined || novaCategoria.slug == null){
        erros.push({texto: "Slug invalido"})
    }
    if(req.body.nome.length <= 2 ){
        erros.push({texto: "Tamanho de nome invalido"})
    } 

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros:erros})
    }else{
        new Categoria(novaCategoria).save().then(()=>{
            req.flash('successMsg', )
            res.redirect('/admin/categoria')
            console.log("Sucesso")
        }).catch((err)=>{
            console.log(`Erro ${err}`)
        })
    }
        
    
})

export default router
