function paginaCargada(){

  var rango = document.querySelector('.rangoprecio');

    /*  function buscarPorPrecio(){
          location.href = '/tienda/precio=' + rango.value;
      }
      rango.addEventListener('change', buscarPorPrecio);
*/
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
  
      var botonProductoDetalle = document.querySelector('.tienda__agregar');
      function agregarAlCarritoDetalle(){
          console.log("aaa");
          var nombre = document.querySelector('.producto__nombre').innerText;
          var precio = document.querySelector('.producto__precio').innerText;
          var imagen = document.querySelector('.producto__fotoP').src;
          var producto = {
              nombre: nombre,
              precio: precio,
              imagen: imagen,
          };
          actualizarCarrito();  

          listaProductos.push(producto);
          carritoNum.innerHTML = listaProductos.length;
          localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
      }
      if(botonProductoDetalle != null){
          botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
      }

}

window.addEventListener('load', paginaCargada);