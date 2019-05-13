function paginaCargada(){

  var rango = document.querySelector('.rangoprecio');


      var listaProductos = [];
      var carritoNum = document.querySelector('.encabezado__contador');
      var carritoInd = document.querySelector('.encabezado__indicador');
      var totalCarrito = document.querySelector('.pushbar__cartotalnum');
      var totalChekout = document.querySelector('.pushbar__check-totalnum');
      var parcialChekout = document.querySelector('.pushbar__check-parnum');
      var totalItems = document.querySelector('.pushbar__cartotalcanti');
      var totalItemsCheck = document.querySelector('.pushbar__checktotalcanti');

      var listaCarrito = document.querySelector('.pushbar__lista');

      if(localStorage.getItem('listaProductos') != null){
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }

      function actualizarCarrito(){
        var suma = 0;

        carritoNum.innerHTML = listaProductos.length;
        totalItems.innerHTML = listaProductos.length;
        totalItemsCheck.innerHTML = listaProductos.length;
        if(listaProductos.length>=1){
          carritoInd.style.display=  "inline-block";
        }
        
        if(listaCarrito!=null){
          listaCarrito.innerHTML="";
      }

      listaProductos.forEach(function (producto, index) {

        var itemNuevo = document.createElement('li');
          var contNuevo = document.createElement('div');

            var imgNuevo = document.createElement('img');

            var restoNuevo = document.createElement('div');
                var nombreNuevo = document.createElement('p');
                var precioNuevo = document.createElement('p');
                var variablesNuevo = document.createElement('div');
                    var cantidadNuevo = document.createElement('div');
                        var quanNuevo = document.createElement('p');
                        var cuadroCNuevo = document.createElement('div');
                    var tamanoNuevo = document.createElement('div');
                        var sizeNuevo = document.createElement('p');
                        var cuadroTNuevo = document.createElement('div');

            var eliminarNuevo = document.createElement('button');
                var eliminarNuevoIcono = document.createElement('i');

              if (listaCarrito != null) {

                listaCarrito.appendChild(itemNuevo);
                itemNuevo.appendChild(contNuevo);
                  contNuevo.appendChild(imgNuevo);
                  contNuevo.appendChild(restoNuevo);
                     restoNuevo.appendChild(nombreNuevo);
                     restoNuevo.appendChild(precioNuevo);
                     restoNuevo.appendChild(variablesNuevo);
                        variablesNuevo.appendChild(cantidadNuevo);
                            cantidadNuevo.appendChild(quanNuevo);
                            cantidadNuevo.appendChild(cuadroCNuevo);
                        variablesNuevo.appendChild(tamanoNuevo);
                            tamanoNuevo.appendChild(sizeNuevo);
                            tamanoNuevo.appendChild(cuadroTNuevo);
                  contNuevo.appendChild(eliminarNuevo);
                     eliminarNuevo.appendChild(eliminarNuevoIcono);
            }

            contNuevo.className = 'pushbar__producto-item';
            imgNuevo.className = 'pushbar__producto-img';
            restoNuevo.className = 'pushbar__producto-resto';
              nombreNuevo.className = 'pushbar__producto-nombre';
              precioNuevo.className = 'pushbar__producto-precio';
              variablesNuevo.className = 'pushbar__producto-variables';
                cantidadNuevo.className = 'pushbar__producto-cantidad';
                    cuadroCNuevo.className = 'pushbar__producto-cuadro';
                tamanoNuevo.className = 'pushbar__producto-tamano';
                    cuadroTNuevo.className = 'pushbar__producto-cuadro';
            eliminarNuevo.className = 'pushbar__producto-eliminar';
              eliminarNuevoIcono.className = 'fa fa-close';

            imgNuevo.src= producto.imagen;
            nombreNuevo.innerHTML = producto.nombre;
            precioNuevo.innerHTML = producto.precio;
            quanNuevo.innerHTML = "Quantity";
            cuadroCNuevo.innerHTML = "1";
            sizeNuevo.innerHTML = "Size";
            cuadroTNuevo.innerHTML = "M";

            var temp = new String();
            for (let i = 1; i < producto.precio.length; i++) {
                temp += producto.precio[i];
            }
            suma += parseInt(temp);


            //Eliminar elemento del carrito
            eliminarNuevo.addEventListener('click', function () {
                
              listaProductos.splice(index, 1);
              itemNuevo.remove();
              localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
              actualizarCarrito();
          });

      });

      if (totalCarrito != null) {
        totalCarrito.innerHTML = "$" + suma;  
        totalChekout.innerHTML = "$" + suma;  
        parcialChekout.innerHTML = "$" + suma;
    }

      }
      
      actualizarCarrito();

   var botones = document.querySelectorAll('.tienda__agregar');
      function recorrerBotones(boton){
          function agregarAlCarrito(){
              var padre = boton.parentNode;
              var nombre = padre.querySelector('.item__nombre').innerText;
              var precio = padre.querySelector('.item__precio').innerText;
              var imagen = padre.querySelector('.item__fotoP').src;
              var producto = {
                  nombre: nombre,
                  precio: precio,
                  imagen: imagen,
              };
              
              listaProductos.push(producto);
              actualizarCarrito();
              localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
            }
          boton.addEventListener('click', agregarAlCarrito);
      }
      botones.forEach(recorrerBotones);

      var botonProductoDetalle = document.querySelector('.producto__agregar');
      function agregarAlCarritoDetalle(){
          var nombre = document.querySelector('.producto__nombre').innerText;
          var precio = document.querySelector('.producto__precio').innerText;
          var imagen = document.querySelector('.producto__fotoP').src;
          var producto = {
              nombre: nombre,
              precio: precio,
              imagen: imagen,
         };

          listaProductos.push(producto);
          actualizarCarrito();  
          localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        }

      if(botonProductoDetalle != null){
          botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
      }

      var fotoMostrada = document.querySelector('.producto__fotoP');

      var fotoMinis = document.querySelectorAll('.producto__fotoM');
     function recorrerFotos(foto){
          function cambiarFoto(){
            fotoMostrada.src = foto.src;
            foto.addEventListener('click', cambiarFoto)

                fotoMinis.forEach(function cambiarBorde(lafoto){
                        if(lafoto.src == fotoMostrada.src ){
                            lafoto.style.border= '1px solid';
                        } else{
                            lafoto.style.border= 'none';
                        }
                });
          }
          foto.addEventListener('click', cambiarFoto);
      };

      if(botonProductoDetalle != null){
        fotoMinis.forEach(recorrerFotos);
      }

      var vistaCarrito = document.querySelector('.pushbar__carro');
      var vistaCheckout = document.querySelector('.pushbar__checkout');
      var botonCheckout = document.querySelector('.pushbar__checkout-boton');
      var atrasCheckout = document.querySelector('.pushbar__boton-atras');

      function verCheckout(){
        vistaCarrito.style.display = 'none';
        vistaCheckout.style.display = 'block';
      }
      botonCheckout.addEventListener('click', verCheckout);
      function ocultarCheckout(){
        vistaCarrito.style.display = 'block';
        vistaCheckout.style.display = 'none';
      }
      atrasCheckout.addEventListener('click', ocultarCheckout);
}

window.addEventListener('load', paginaCargada);