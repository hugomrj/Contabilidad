
var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   


    AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaVenta/jspf/cabeceraFV.jspx'
                ,'form_cabecera');   
    
    CabeceraFV_disabled ();    
    CabeceraFV_json ( id );
    
    AjaxPeticion( getRutaAbsoluta()+'/FacturaVentaDetalle/Coleccion/Detalle?id='+id
                ,'tabla_venta_detalle');   

                    
    FacturaVentaDetalle_tabla_registro_consulta("ventadetalle_transaccion_tabla");
    

    
    var path = getRutaAbsoluta()+"/FacturaVenta/Linea.json?id="+id
    FacturaVentaDetalle_pie_json( path );
    FacturaVentaDetalle_table_formato ();   
    
    
   
    var cd_editar_factura = document.getElementById('cd_editar_factura');
    cd_editar_factura.addEventListener('click',
        function(event) {                        
           
            //localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
                
            var control = AjaxUrl( getRutaAbsoluta()
                    +'/Cliente/Funcion/PerteneceContador?cliente='+
                        +document.getElementById('clic_cliente').value);                            
            
                        
            if (control.toString().trim() == 'true'){
                
                AjaxUrl( getRutaAbsoluta()+"/FacturaVenta/Transaccion/Inicio");               
                AjaxUrl( getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Detalle?id="+id);
               
                location.href= getRutaAbsoluta()+"/Session/FacturaVenta/Editar.jspx?id="+id;                                   
                
            }else
            {
                window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Lista.jspx"; 
            }
                                
                
        },
        false
    );        
    
    
    var cd_todas_factura = document.getElementById('cd_todas_factura');
    cd_todas_factura.addEventListener('click',
        function(event) {                        
           
            localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
            window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Lista.jspx"; 
                
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


