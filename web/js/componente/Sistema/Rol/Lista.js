
var page = 1;

window.onload = function() {

    page = getParametroValor('page'); 
    AjaxPeticion('../../MenuPrincipal','nav');   
   
   
    Roles_tabla_lista();    
   
   
    // darle funcionalidad a buscar
    var buscar = document.getElementById('buscar');
    buscar.addEventListener('keyup',
        function(event) {
            if(event.keyCode == 13)
            {
                Roles_tabla_lista();
            }
        },
        false
    );
               
      
      
    
    var rol_agregar = document.getElementById('rol_agregar');
    rol_agregar.addEventListener('click',
        function(event) {
            location.href="../Rol/Agregar.jspx";
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








function Roles_tabla_lista ( ){

        AjaxPeticion( getRutaAbsoluta()+'/Rol/Coleccion/Lista?buscar='
            +document.getElementById('buscar').value  
            +"&page="+page
            ,'tab_body');          


            Rol_tabla_registro("roles_tabla");


        // paginacion                                
        var totalregistros = document.getElementById("roles_tabla").dataset.totalregistros;  
        AjaxPeticion( getRutaAbsoluta()+ '/Paginacion?page='+page+"&totalregistros="+totalregistros
            +""
            ,'div_paginacion');     

        paginacionajax ( "Roles_tabla_lista( );"  );            

}




