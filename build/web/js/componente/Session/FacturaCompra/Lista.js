

window.onload = function() {


    page = getParametroValor('page'); 
    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');     
    
        var cliente =  localStorage.getItem("storageCliente");        
        if (isNaN(cliente)){
            cliente = 0;
        }
    
    
    Cabecera_cliente(cliente);
    localStorage.removeItem("storageCliente");
    
    FacturaCompra_tabla_lista( );
    
    
    
        // darle funcionalidad a buscar
        var buscar = document.getElementById('buscar');
        buscar.addEventListener('keyup',
            function(event) {
                if(event.keyCode == 13)
                {
                    FacturaCompra_tabla_lista ( );
                }
            },
            false
        );    


    
    
   
    var nuevo_factura_compra = document.getElementById('nuevo_factura_compra');
    nuevo_factura_compra.addEventListener('click',
        function(event) {                        
           
            var control = AjaxUrl( getRutaAbsoluta()
                    +'/Cliente/Funcion/PerteneceContador?cliente='
                    +document.getElementById('clic_cliente').value );                            
            
            if (control.toString().trim() == 'true'){
                
               
                AjaxUrl( getRutaAbsoluta()+"/FacturaCompra/Transaccion/Inicio");
               
                location.href= getRutaAbsoluta()+"/Session/FacturaCompra/Nuevo.jspx?cliente="                                   
                    +document.getElementById('clic_cliente').value;                            
               
            }else
            {
                alerta_error("Falta seleccionar Cliente");                            
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








function FacturaCompra_tabla_lista(){

            AjaxPeticion(getRutaAbsoluta()+'/FacturaCompra/Coleccion/Lista?buscar='
                +document.getElementById('buscar').value  
                +"&page="+page
                +"&cliente="+document.getElementById('clic_cliente').value  
                ,'tab_body');          
                
                
                
            // paginacion                                
            var totalregistros = document.getElementById("faccom_tabla").dataset.totalregistros;  
            AjaxPeticion( getRutaAbsoluta()+'/Paginacion?page='+page+"&totalregistros="+totalregistros
                +""
                ,'div_paginacion');                     
                
            paginacionajax ( "FacturaCompra_tabla_lista();"  );                       
           
           
           
            FacturaCompra_tabla_lista_registro("faccom_tabla");           
            FacturaCompra_tabla_lista_formato("faccom_tabla");
        
}





function Cabecera_cliente ( cliente ){


        AjaxPeticion( getRutaAbsoluta()+'/Session/Cliente/jspf/cabeceraCliente.jspx'
                ,'cabecera_cliente');          

          // cargar datos en el caso que existan      
          if (cliente != 0){              
              document.getElementById( 'clic_cliente').value = cliente;
          }


        // accion de botones      
        var clic_cliente = document.getElementById( 'clic_cliente');
        clic_cliente.onblur  = function() {                
            clic_cliente.value  = fmtNum(clic_cliente.value);           
            var idvalor = clic_cliente.value;                
            document.getElementById( 'cliente_descripcion').innerHTML = cliente_descripcion_Json( idvalor );         
            FacturaCompra_tabla_lista ( );
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









function  FacturaCompra_tabla_lista_formato ( tabla ){
    

        var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');

        for (var i=0 ; i < rows.length; i++)
        {
            cell = table.rows[i].cells[3] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            
        }
}




function FacturaCompra_tabla_lista_registro( tabla )
{


    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.linea_id;                     
                window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Factura.jspx?id="+linea_id;                
                
                // falta editar factura
        };       
    }
};
