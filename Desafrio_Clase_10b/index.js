const express = require('express') //se llama al modulo de express y se instancia
const app = express()

//variable para que los productos almacenados permanezcan en memoria.
let products = []

// Se crea el servidor, se elige el numero de puerto.
const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
})
server.on('error', (error) => console.log({mensaje: `hubo un error :( ${error}`}))

//parseado "automatico" 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* se configura motor de render pug---------*/

app.set("view engine", 'pug')
app.set("views", "./views")

/* ------------------------------------------------- */

/* se definen endpoints con metodos de renderizado */
app.get('/productos', (req, res) => {
    res.render('lista.pug', {products: products})
})

app.get('/', (req, res) => {
    res.render('formulario.pug')
})

app.post('/productos', (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    console.log(newProduct)
    products.push(newProduct)
    res.render('formulario.pug')
})

// Se le define una ruta de dominio publico para ingresar al formulario
app.use(express.static('public'))
