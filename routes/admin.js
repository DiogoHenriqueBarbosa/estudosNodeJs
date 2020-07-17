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
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log("Sucesso")
    }).catch((err)=>{
        console.log(`Erro ${err}`)
    })
})

export default router
