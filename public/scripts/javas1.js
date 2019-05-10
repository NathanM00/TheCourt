function paginaCargada(){

  var rango = document.querySelector('.rangoprecio');


      var listaProductos = [];
      if(localStorage.getItem('listaProductos') != null){
          listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
      }
  
      var carritoNum = document.querySelector('.encabezado__contador');
      var carritoInd = document.querySelector('.encabezado__indicador');

      var listaCarrito = document.querySelector('.pushbar__lista');
      var totalCarrito = document.querySelector('.pushbar__cartotalnum');
      var total;
      function actualizarCarrito(){
          carritoNum.innerHTML = listaProductos.length;
          if(listaProductos.length>=1){
            carritoInd.style.display=  "inline-block";
          }
          listaCarrito.innerHTML='';

          listaProductos.forEach(function(producto){
            listaCarrito.innerHTML += `
            <li>
            <div class="pushbar__producto-item">
                    <img class="pushbar__producto-img" src="${producto.imagen}">
                    <div class="pushbar__producto-resto">
                        <p class="pushbar__producto-nombre">${producto.nombre}</p>
                        <p class="pushbar__producto-precio">${producto.precio}</p>
                        <div class="pushbar__producto-variables">
                            <div class="pushbar__producto-tamano"> 
                                <p>Size</p>
                                <div class="pushbar__producto-cuadro">M</div>
                            </div>
                            <div class="pushbar__producto-cantidad">
                                <p>Quantity</p>
                                <div class="pushbar__producto-cuadro">1</div>
                            </div>
                        </div>
                    </div>
            </div>
            </li>`

             total += producto.precio;
             totalCarrito.innerHTML =  '<p class="pushbar__cartotalnum">'+total+'</p>'

          });

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
            console.log(foto.src); 
            fotoMostrada.src = foto.src;
            console.log(fotoMostrada.src); 
            foto.addEventListener('click', cambiarFoto)

                fotoMinis.forEach(function cambiarBorde(lafoto){
                        if(lafoto.src == fotoMostrada.src ){
                            lafoto.style.border= '1px solid';
                        } else{
                            lafoto.style.border= 'none';
                        }
                });

            cambiarBorde();
          }
          foto.addEventListener('click', cambiarFoto);
      };

      if(botonProductoDetalle != null){
        fotoMinis.forEach(recorrerFotos);
      }
}

window.addEventListener('load', paginaCargada);