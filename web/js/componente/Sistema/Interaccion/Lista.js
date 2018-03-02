
var page = 1;

window.onload = function() {

    page = getParametroValor('page');     
    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');      
   
   
    Interacciones_tabla_lista();    
   
   
    // darle funcionalidad a buscar
    var buscar = document.getElementById('buscar');
    buscar.addEventListener('keyup',
        function(event) {
            if(event.keyCode == 13)
            {
                Interacciones_tabla_lista();
            }
        },
        false
    );
               
      
      
    
    var Interaccion_agregar = document.getElementById('Interaccion_agregar');
    Interaccion_agregar.addEventListener('click',
        function(event) {
            location.href="../Interaccion/Agregar.jspx";
        },
        false
    );    

   
   
   

};




window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

}




function Interacciones_tabla_lista ( ){

        AjaxPeticion( getRutaAbsoluta()+'/Interaccion/Coleccion/Lista?buscar='
            +document.getElementById('buscar').value  
            +"&page="+page
            ,'tab_body');          


            Interaccion_tabla_registro("interacciones_tabla");


        // paginacion                                
        var totalregistros = document.getElementById("interacciones_tabla").dataset.totalregistros;  
        AjaxPeticion( getRutaAbsoluta()+ '/Paginacion?page='+page+"&totalregistros="+totalregistros
            +""
            ,'div_paginacion');     

        paginacionajax ( "Interacciones_tabla_lista( );"  );            

}




