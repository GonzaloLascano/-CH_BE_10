const express = require('express') //se llama al modulo de express
const handlebars = require('express-handlebars')
const app = express()

//variable para que los productos almacenados permanezcan en memoria.
let products = [/* {id: 1, title: 'cortina', price: 54, thumbnail:'url'}, {id: 2, title: 'cortina', price: 54, thumbnail:'url'}, {id: 3, title: 'cortina', price: 54, thumbnail:'url'} */]

// Se crea el servidor, se elige el numero de puerto.
const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
})
server.on('error', (error) => console.log({mensaje: `hubo un error :( ${error}`}))

//parseado automatico 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* se configura motor de render handlebars---------*/

app.engine(
    'hbs',
    handlebars({
        extname:'.hbs',
        defaultLayout:'index.hbs'
    })
)
app.set("view engine", 'hbs')
app.set("views", "./views")

/* ------------------------------------------------- */

/* se definen metodos de renderizado */
app.get('/productos', (req, res) => {
    res.render('lista', {products})
})

app.get('/', (req, res) => {
    res.render('formulario')
})

app.post('/productos', (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    console.log(newProduct)
    products.push(newProduct)
    res.render('formulario')
})

// Se le define una ruta de dominio publico para ingresar al formulario
app.use(express.static('public'))
