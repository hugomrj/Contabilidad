
var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaCompra/jspf/cabeceraFC.jspx'
                ,'form_cabecera');   
    
    CabeceraFC_json( id );
    
    FacturaCompraDetalle_tabla("tabla_compra_detalle");
    FacturaCompraDetalle_table_formato ();   
    
    /*
     
    AjaxPeticion( getRutaAbsoluta()+'/FacturaCompraDetalle/Coleccion/Detalle?id='+id
                ,'tabla_compra_detalle');   
    
    */
    
    
    
    /*
    
    
    var path = getRutaAbsoluta()+"/FacturaCompra/Linea.json?id="+id
    FacturaCompraDetalle_pie_json( path );
    
    FacturaVentaDetalle_form_formato ();   
    
    */
   
   
   
    var fce_guardar = document.getElementById('fce_guardar');
    fce_guardar.addEventListener('click',
        function(event) {
           
            
                if ( fcompra_editar_validar_form() )
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
                            +"/FacturaCompra/Controlador/Editar"; 

                    var control = AjaxPeticionURL( accion, getDataForm(form) + dataform );   
                    
                    if (!(isNaN(control))){

                        //localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
                        window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Factura.jspx?id="+id;    
                    }
                    else{                    
                        alerta_error(control);
                    }
                } 
           
           
           
           
        },
        false
    );        
    
    var fce_borrar = document.getElementById('fce_borrar');
    fce_borrar.addEventListener('click',
        function(event) {
           
           
                var form = document.getElementById("form_cabecera");                            
                var accion =  getRutaAbsoluta()+"/FacturaCompra/Controlador/Borrar"; 
                

                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                                                               
                    
                    localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);  
                    window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Lista.jspx";                       
                    
                }
                else
                {    
                    alerta_error(control);
                }           
           
           
           
           
        },
        false
    );        
    
    var fce_cancelar = document.getElementById('fce_cancelar');
    fce_cancelar.addEventListener('click',
        function(event) {           
            AjaxUrl(getRutaAbsoluta()+'/FacturaCompra/Transaccion/Cancelar');   
            window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Factura.jspx?id="+id;    
            
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








function fcompra_editar_validar_form ( ){
    
    //numero_factura
    var numero_factura = document.getElementById('numero_factura');    
    if (numero_factura .value == '')     
    {
        alerta_error("Falta numero factura");
        numero_factura.focus();
        numero_factura.select();        
        return false;
    }    
    
    
    var facvenf_fecha_factura = document.getElementById('facvenf_fecha_factura');    
    if (facvenf_fecha_factura.value == '') {
        alerta_error("La fecha no puede estar vacia");
        facvenf_fecha_factura.focus();
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
       
/*    
    // falta saber si existe registro
    var size = AjaxUrl( getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Size" );  
    if (size.toString().trim() === '0'){
        alerta_error("Sin detalles de compras");
        return;
    }
*/    
    
    
    return true;

}




