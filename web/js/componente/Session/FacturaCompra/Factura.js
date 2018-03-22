
var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   


    AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaCompra/jspf/cabeceraFC.jspx'
                ,'form_cabecera');   
    
    CabeceraFC_disabled();    
    CabeceraFC_json ( id );
    
    AjaxPeticion( getRutaAbsoluta()+'/FacturaCompraDetalle/Coleccion/Detalle?id='+id
                ,'tabla_compra_detalle');   


                    
    FacturaCompraDetalle_tabla_registro_consulta("compradetalle_transaccion_tabla");
    
    
    var path = getRutaAbsoluta()+"/FacturaCompra/Linea.json?id="+id
    FacturaCompraDetalle_pie_json( path );    
    
//    FacturaCompraDetalle_form_formato ();   
    
    
    FacturaCompraDetalle_table_formato ();   
    
    
   
    var cd_editar_factura = document.getElementById('cd_editar_factura');
    cd_editar_factura.addEventListener('click',
        function(event) {                        
           
            //localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
                
            var control = AjaxUrl( getRutaAbsoluta()
                    +'/Cliente/Funcion/PerteneceContador?cliente='+
                        +document.getElementById('clic_cliente').value);                            
            
                        
            if (control.toString().trim() == 'true'){
                
                AjaxUrl( getRutaAbsoluta()+"/FacturaCompra/Transaccion/Inicio");               
                AjaxUrl( getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Detalle?id="+id);
               
                location.href= getRutaAbsoluta()+"/Session/FacturaCompra/Editar.jspx?id="+id;                                   
                
            }else
            {
                window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Lista.jspx"; 
            }
                                
                
        },
        false
    );        
    
    
    var cd_todas_factura = document.getElementById('cd_todas_factura');
    cd_todas_factura.addEventListener('click',
        function(event) {                        
           
            localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
            window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Lista.jspx"; 
                
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


