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
app.use(express.urlencoded({ extended: true }));
//Registro de handlebars
app.engine('handlebars',exphbs());
//Establecer handlebars como el motor de render
app.set('view engine','handlebars');

//Ruta inicial
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
});

//ruta departamento
app.get('/tienda/:departamento?', function(request, response){
    

    var query = {};
    if(request.query.linea){
        query.linea = request.query.linea;
    }
    if(request.query.rango){
        query.rango = request.query.rango;
    }
    if(request.params.departamento){
        query.departamento = request.params.departamento;
    }

    var collection = db.collection('productos');

    collection.find(query, {sort:[['precio','ascending']] } ).toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            departamento: request.params.departamento,
            precio: request.query.precio,
            esDNone: request.params.departamento == null,
            esDAlguno: request.params.departamento != null,
            esLNone: request.query.linea == null,
            esLAlguno: request.query.linea != null,
            esRNone: request.query.rango == null,
            esRAlguno: request.query.rango != null,
            esNone: request.query.rango == null && request.query.linea == null && request.params.departamento == null,
            esAlguno: request.query.rango != null || request.query.linea != null || request.params.departamento != null,

            esMin: request.query.rango == "$20 - $40",
            esMed: request.query.rango == "$40 - $60",
            esMax: request.query.rango == "Over $60",

            esMen: request.query.linea == "Men",
            esWomen: request.query.linea == "Women",
            esKid: request.query.linea == "Kids",

            esTshirt: request.params.departamento == "T-shirts",
            esJersey: request.params.departamento == "Jerseys",
            esHoodie: request.params.departamento == "Hoodies & Sweatshirts",
        };
        response.render('tienda', contexto);
    });
    
});

app.get('/tienda/producto/:nombre', function(req, res){

    var collection = db.collection('productos');
    collection.find({ nombre: req.params.nombre })
        .toArray(function(err, docs){
            console.log(docs);

            var contexto = {
                producto: docs[0]
            };
            res.render('producto', contexto);
        });
});

app.post('/login', function (request, response){

    var pedido ={
            correo: request.body.correo,
            nombre: request.body.nombre,
            direccion: request.body.direccion,
            ciudad: request.body.ciudad,
            tarjeta: request.body.tarjeta,
            expiracion: request.body.expiracion,
            contrasena: request.body.contrasena,
            fecha: new Date(),
            pedidos: JSON.parse(request.body.productos)
    };

    var collection = db.collection('ventas');
    collection.insertOne(pedido, function(err){
        assert.equal(err, null);

        console.log('pedido guardado');
    });
    response.redirect('/tienda');

});

// Escuchar desde puerto 5000
app.listen(5000, function(){
    console.log('Servidor en el puerto 5000')
});