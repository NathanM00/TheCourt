window.addEventListener('load', function () {

    var btnCartAnimado = document.querySelectorAll('.tienda__agregar');

    function recorrerBtns(boton) {
        function hoverBtn() {
            TweenLite.to(boton, 1.5, { ease: CustomEase.create("custom", "M0,0 C0.146,0 0.099,-0.195 0.244,-0.212 0.347,-0.224 0.37,-0.037 0.378,0 0.387,-0.015 0.403,-0.126 0.546,-0.126 0.656,-0.126 0.649,-0.005 0.656,0.012 0.721,-0.072 0.757,-0.054 0.757,-0.054 0.824,-0.054 0.838,-0.013 0.853,0 0.858,-0.002 0.899,-0.027 0.93,-0.026 0.969,-0.026 1,0 1,0"), y: 40 });
        }
        boton.addEventListener('mouseover', hoverBtn);
    }
    btnCartAnimado.forEach(recorrerBtns);

});