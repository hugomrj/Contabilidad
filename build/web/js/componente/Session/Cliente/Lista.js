
var page = 1;

window.onload = function() {

    page = getParametroValor('page'); 


    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');      
    Clientes_tabla_lista ( );    
    
               

    // darle funcionalidad a buscar
    var buscar = document.getElementById('buscar');
    buscar.addEventListener('keyup',
        function(event) {

            if(event.keyCode == 13)
            {
                Clientes_tabla_lista ( );
            }
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








function Clientes_tabla_lista ( ){

    
            AjaxPeticion( getRutaAbsoluta()+'/Cliente/Coleccion/Lista?buscar='
                +document.getElementById('buscar').value  
                +"&page="+page
                ,'tab_body');          
                   
                   
                   
                
            // paginacion                                
            var totalregistros = document.getElementById("clientes_tabla").dataset.totalregistros;  
            AjaxPeticion( getRutaAbsoluta()+'/Paginacion?page='+page+"&totalregistros="+totalregistros
                +""
                ,'div_paginacion');     
                
                
            paginacionajax ( "Clientes_tabla_lista();"  );            
            Clientes_tabla_registro ("clientes_tabla" );
    
    
    
            var clil_agregar = document.getElementById('clil_agregar');
            clil_agregar.addEventListener('click',
                function(event) {
                    location.href= getRutaAbsoluta()+"/Session/Cliente/Agregar.jspx";
                },
                false
            );    
    
    
}




