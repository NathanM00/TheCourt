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

//ruta departamento
app.get('/tienda/:departamento?', function(request, response){
    
    //console.log(request.query.precio);

    var query = {};
    if(request.params.departamento){
        query.departamento = request.params.departamento;
    }

    var collection = db.collection('productos');

    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            departamento: request.params.departamento,
            precio: request.query.precio,
            esDNone: request.params.departamento == null,
            esDAlguno: request.params.departamento != null,
            esTshirt: request.params.departamento == "T-shirts",
            esJersey: request.params.departamento == "Jerseys",
            esHoodie: request.params.departamento == "Hoodies & Sweatshirts",
        };
        response.render('tienda', contexto);
    });
    
});

//ruta linea
app.get('/tienda/:linea?', function(request, response){
    
    //console.log(request.query.precio);

    var query = {};
    if(request.params.linea){
        query.linea = request.params.linea;
    }

    var collection = db.collection('productos');

    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        
        var contexto = {
            productos: docs,
            linea: request.params.linea,
            precio: request.query.precio,
            esLNone: request.params.linea == null,
            esLAlguno: request.params.linea != null,
            esMen: request.params.linea == "Men",
            esWomen: request.params.linea == "Women",
            esKid: request.params.linea == "Kids",
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

// Escuchar desde puerto 3000
app.listen(3000, function(){
    console.log('Servidor en el puerto 3000')
});