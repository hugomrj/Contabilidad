



window.onload = function() {

    page = getParametroValor('page'); 
    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');     
      
    
    
    Cabecera_cliente();
      
    FacturaVenta_tabla_lista ( );
    
    
    
   
    /*
    var fvl_nuevo = document.getElementById('fvl_nuevo');
    fvl_nuevo.addEventListener('click',
        function(event) {
            
            location.href="../FacturaVenta/Transaccion/Inicio";
            
        },
        false
    );    
*/
   
   
   

};

window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

}








function FacturaVenta_tabla_lista ( ){



            AjaxPeticion(getRutaAbsoluta()+'/FacturaCompra/Coleccion/Lista?buscar='
                +document.getElementById('buscar').value  
                +"&page="+page
                +"&cliente="+document.getElementById('clic_cliente').value  
                ,'tab_body');          
                
                
          
                
                
                
    /*
            // paginacion                                
            var totalregistros = document.getElementById("facven_tabla").dataset.totalregistros;  
            AjaxPeticion('../Paginacion?page='+page+"&totalregistros="+totalregistros
                +""
                ,'div_paginacion');     
       */     
    
            //paginacionajax ( "FacturaVenta_tabla_lista();"  );    
            
            //FacturaVenta_tabla_registro ('facven_tabla' );
    
}





function Cabecera_cliente ( ){


            AjaxPeticion('../Cliente/jspf/cabeceraCliente.jspx'
                ,'cabecera_cliente');          


          // accion de botones      



        var clic_cliente = document.getElementById( 'clic_cliente');
        clic_cliente.onblur  = function() {                
            clic_cliente.value  = fmtNum(clic_cliente.value);           
            var idvalor = clic_cliente.value;                
            document.getElementById( 'cliente_descripcion').innerHTML = cliente_descripcion_Json( idvalor );         
        };     
        clic_cliente.onblur();




        var clic_cliente_buscar = document.getElementById( 'clic_cliente_buscar');
        clic_cliente_buscar.addEventListener('click',
            function()
            {                         
                VentanaModalBusqueda('Clib',  
                    getRutaAbsoluta()+'/Session/Cliente/jspf/busqueda.jspx', 
                    "Cliente", 
                    "clic_cliente" , 
                    "clientes_tabla", 
                    700 );                  
            },
            false
        );   





}






