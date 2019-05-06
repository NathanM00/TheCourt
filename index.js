//Importar librerias
var express = require('express');
var exphbs = require('express-handlebars');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'Taller2';

const client = new MongoClient(url);

var db = null;

client.connect(function(err) {
    assert.equal(null, err);

     db = client.db(dbName);

    //client.close();
  });  

//Crear app de express
var app = express();

//Establecer la carpeta public como estatica
app.use(express.static('public'));

//Registro de handlebars
app.engine('handlebars',exphbs());
//Establecer handlebars como el motor de render
app.set('view engine','handlebars');

//Arreglo de productos
var productos = [];
productos.push({
    titulo: 'aaaa',
    precio: 20,
    imagen: "../public/recursos/productosA1.jpeg",
    descripcion: "Your kiddo won't be able to contain their excitement when you gift them this Boston Celtics Essential logo hoodie from Nike. The cold won't stand a chance when your young one has this warm hoodie on." 
});

//Ruta inicial
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
});

//ruta dinamica
app.get('/tienda/:departamento?', function(request, response){
    
    console.log(request.query.precio);

    var query = {};
    if(request.params.departamento){
        query.departamento = request.params.departamento;
    }
    if(request.query.precio){
        query.precio = { $lte: request.query.precio };
    }

    var collection = db.collection('productos');

    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            departamento: request.params.departamento,
            precio: request.query.precio,
            esCamiseta: request.params.departamento == "T-shirts",
            esSaco: request.params.departamento == "Hoodies & Sweatshirts",
            esJersey: request.params.departamento == "Jerseys",
        };
        response.render('tienda', contexto);
    });
    
});

// Escuchar desde puerto 5500
app.listen(5500, function(){
    console.log('Servidor en el puerto 5500')
});