

var modulo = 0;



window.onload = function() {



    modulo = getParametroValor("modulo");

   AjaxPeticion('../MenuPrincipal','nav');   
   
    AjaxPeticion('../Interaccion/Menu/Modulo?modulo='+modulo,
        'ListaElementosModulo');      

};



