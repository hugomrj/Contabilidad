
var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaVenta/jspf/cabeceraFV.jspx'
                ,'form_cabecera');   
    
    CabeceraFV_json( id );
    
    FacturaVentaDetalle_tabla("tabla_venta_detalle");
    

   FacturaVentaDetalle_table_formato();
   
    var fve_guardar = document.getElementById('fve_guardar');
    fve_guardar.addEventListener('click',
        function(event) {
           
            
                if ( fventa_editar_validar_form() )
                {                                    
                    
                    var dataform = "";
                    if (document.getElementById("opt_CO").checked ){
                        dataform = dataform + "&forma_pago=CO"
                    }
                    if (document.getElementById("opt_CR").checked ){
                        dataform = dataform + "&forma_pago=CR"
                    }
                                        
                    var form = document.getElementById("form_cabecera");                                
                    var accion =  getRutaAbsoluta()
                            +"/FacturaVenta/Controlador/Editar"; 

                    var control = AjaxPeticionURL( accion, getDataForm(form) + dataform );   
                    
                    if (!(isNaN(control))){

                        window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Factura.jspx?id="+id;    
                    }
                    else{                    
                        alerta_error(control);
                    }
                } 
           
           
        },
        false
    );        
    
    var fve_borrar = document.getElementById('fve_borrar');
    fve_borrar.addEventListener('click',
        function(event) {
           
           
                var form = document.getElementById("form_cabecera");                            
                var accion =  getRutaAbsoluta()+"/FacturaVenta/Controlador/Borrar"; 
                

                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                                                               
                    
                    localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);  
                    window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Lista.jspx";                       
                    
                }
                else
                {    
                    alerta_error(control);
                }           
           
           
           
           
        },
        false
    );        
    
    var fve_cancelar = document.getElementById('fve_cancelar');
    fve_cancelar.addEventListener('click',
        function(event) {           
            AjaxUrl(getRutaAbsoluta()+'/FacturaVenta/Transaccion/Cancelar');   
            window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Factura.jspx?id="+id;    
            
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








function fventa_editar_validar_form ( ){
    
    //numero_factura
    var numero_factura = document.getElementById('numero_factura');    
    if (numero_factura .value == '')     
    {
        alerta_error("Falta numero factura");
        numero_factura.focus();
        numero_factura.select();        
        return false;
    }    
    
    
    var fecha_factura = document.getElementById('fecha_factura');    
    if (fecha_factura.value == '') {
        alerta_error("La fecha no puede estar vacia");
        fecha_factura.focus();
        return false;
    }        
    
    
    
    var emisor_descripcion = document.getElementById('emisor_descripcion');   
    if (emisor_descripcion.value.toString().trim() == '' )     
    {
        alerta_error("Falta descripcion de emisor");
        emisor_descripcion.focus();
        emisor_descripcion.select();        
        return false;
    }    
       
   
    
    return true;

}




