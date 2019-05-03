function paginaCargada(){

var rango = document.querySelector('.rangoprecio');

    function buscarPrecio(){

      console.log(rango.value);
      location.href = 'tienda/T-shirts?precio=' + rango.value;
    }

rango.addEventListener('change', buscarPrecio);

}

window.addEventListener('load', paginaCargada);