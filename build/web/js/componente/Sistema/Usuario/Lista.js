
var page = 1;

window.onload = function() {

    page = getParametroValor('page'); 
    AjaxPeticion('../../MenuPrincipal','nav');   
   
   
    Usuarios_tabla_lista();    
   
   
    // darle funcionalidad a buscar
    var buscar = document.getElementById('buscar');
    buscar.addEventListener('keyup',
        function(event) {
            if(event.keyCode == 13)
            {
                Usuarios_tabla_lista();
            }
        },
        false
    );
               
      
      
    
    var usu_agregar = document.getElementById('usu_agregar');
    usu_agregar.addEventListener('click',
        function(event) {
            location.href="../Usuario/Agregar.jspx";
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








function Usuarios_tabla_lista ( ){

        AjaxPeticion( getRutaAbsoluta()+'/Usuario/Coleccion/Lista?buscar='
            +document.getElementById('buscar').value  
            +"&page="+page
            ,'tab_body');          

        Usuario_tabla_registro("usuarios_tabla");


        // paginacion                                
        var totalregistros = document.getElementById("usuarios_tabla").dataset.totalregistros;  
        AjaxPeticion( getRutaAbsoluta()+ '/Paginacion?page='+page+"&totalregistros="+totalregistros
            +""
            ,'div_paginacion');     

        paginacionajax ( "Usuarios_tabla_lista ( );"  );            

}




