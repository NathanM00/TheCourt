function paginaCargada(){

  var rango = document.querySelector('.rangoprecio');

      function buscarPorPrecio(){
          location.href = '/tienda/precio=' + rango.value;
      }
      rango.addEventListener('change', buscarPorPrecio);

      var listaProductos = [];
      if(localStorage.getItem('listaProductos') != null){
          listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
      }
  
      var carritoNum = document.querySelector('.encabezado__contador');
      var carritoInd = document.querySelector('.encabezado__indicador');

      var listaCarrito = document.querySelector('.carrito-desplegado__lista');
  
      function actualizarCarrito(){
          carritoNum.innerHTML = listaProductos.length;
          if(listaProductos.length>=1){
            carritoInd.style.display=  "inline-block";
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
  
  
      var botonProductoDetalle = document.querySelector('.producto-detalle__carrito');
      function agregarAlCarritoDetalle(){
          var nombre = document.querySelector('.item__nombre').innerText;
          var precio = document.querySelector('.item__precio').innerText;
          var imagen = document.querySelector('.item__fotoP').src;
          var producto = {
              nombre: nombre,
              precio: precio,
              imagen: imagen,
          };
          
          listaProductos.push(producto);
          carritoNum.innerHTML = listaProductos.length;
          localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
      }
      if(botonProductoDetalle != null){
          botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
      }

}

window.addEventListener('load', paginaCargada);