



window.onload = function() {

    page = getParametroValor('page'); 
    AjaxPeticion('../MenuPrincipal','nav');   
      
   
    FacturaVenta_tabla_lista ( );
   
    
    var fvl_nuevo = document.getElementById('fvl_nuevo');
    fvl_nuevo.addEventListener('click',
        function(event) {
            
            location.href="../FacturaVenta/Transaccion/Inicio";
            
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








function FacturaVenta_tabla_lista ( ){

    
            AjaxPeticion('../FacturaVenta/Coleccion/Lista?buscar='
                +document.getElementById('buscar').value  
                +"&page="+page
                ,'tab_body');          
                
    
            // paginacion                                
            var totalregistros = document.getElementById("facven_tabla").dataset.totalregistros;  
            AjaxPeticion('../Paginacion?page='+page+"&totalregistros="+totalregistros
                +""
                ,'div_paginacion');     
            
    
            paginacionajax ( "FacturaVenta_tabla_lista();"  );    
            
            FacturaVenta_tabla_registro ('facven_tabla' );
        
    

    
}




