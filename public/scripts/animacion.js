window.addEventListener('load', function(){
    var titulo = this.document.querySelector('.tienda__cantidad');

    function hoverTitulo(){
        TweenMax.to(titulo, 1, {x:100});
    }
    titulo.addEventListener('mouseenter', hoverTitulo);

});