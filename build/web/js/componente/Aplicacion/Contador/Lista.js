
var page = 1;

window.onload = function() {

    page = getParametroValor('page'); 
    AjaxPeticion('../../MenuPrincipal','nav');   
      
   Contadores_tabla_lista();    
   
   
    
    var buscar = document.getElementById('buscar');
    buscar.addEventListener('keyup',
        function(event) {
            if(event.keyCode == 13)
            {
                Contadores_tabla_lista();
            }
        },
        false
    );
               
      
      
    
    var conta_agregar = document.getElementById('conta_agregar');
    conta_agregar.addEventListener('click',
        function(event) {
            location.href= getRutaAbsoluta()+ "/Aplicacion/Contador/Agregar.jspx";            
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








function Contadores_tabla_lista ( ){

        AjaxPeticion( getRutaAbsoluta()+'/Contador/Coleccion/Lista?buscar='
            +document.getElementById('buscar').value  
            +"&page="+page
            ,'tab_body');          

        Contador_tabla_registro("contadores_tabla");


        // paginacion                                
        var totalregistros = document.getElementById("contadores_tabla").dataset.totalregistros;  
        AjaxPeticion( getRutaAbsoluta()+ '/Paginacion?page='+page+"&totalregistros="+totalregistros
            +""
            ,'div_paginacion');     

        paginacionajax ( "Funcionarios_tabla_lista ( );"  );            

}




