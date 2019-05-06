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

//Ruta inicial
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
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

//ruta dinamica
app.get('/tienda/:departamento?', function(request, response){
    
    //console.log(request.query.precio);

    var query = {};
    if(request.params.departamento){
        query.departamento = request.params.departamento;
    }
    if(request.params.linea){
        query.linea = request.params.linea;
    }
    if(request.query.precio){
        query.precio = { $lte: request.query.precio };
    }

    var collection = db.collection('productos');

    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            linea: request.params.linea,
            departamento: request.params.departamento,
            precio: request.query.precio,
        };
        response.render('tienda', contexto);
    });
    
});

// Escuchar desde puerto 5500
app.listen(5500, function(){
    console.log('Servidor en el puerto 5500')
});