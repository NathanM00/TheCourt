//Importar librerias
var express = require('express');
var exphbs = require('express-handlebars');


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

//Ruta a la tienda
app.get('/tienda', function(req, res) {
    var contexto = {
       
    };
    res.render('tienda',contexto);
});

//ruta dinamica
app.get('/tienda/:pestana', function(req, res) {
    var contexto= null;
   
       productos.forEach(function(producto){
           if(producto.numero == req.params.pestana){
               contexto=producto;
           }
       });
   
       if(contexto == null){
           res.send('Page not found: '+req.params.pestana);
       }else{
           res.render('pestana',contexto);
       }
   
       console.log(req.params.pestana);
       
   });

// Escuchar desde puerto 3000
app.listen(3000, function(){
    console.log('Servidor en el puerto 3000')
});