import express from 'express'
import handlebars from 'express-handlebars'
import bodyParser from 'body-parser'
import admin from './routes/admin.js'
import mongoose from 'mongoose'
import session from 'express-session'
import flash from 'connect-flash'


const PORT = 3030;
const app = express()

app.use(session({
    secret: "47026074",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("SuccessMsg")
    res.locals.erroMsg = req.flash("erroMsg")
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Pagina inicial')
})

app.use('/admin', admin)

mongoose.connect('mongodb://localhost/blogapp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('conectado com o banco')
}).catch((err) => {
    console.log(`Erro! ${err}`)
})


app.listen(PORT, () => {
    console.log(`Conectado.. Localhost:${PORT}`)
})

