
var cliente = getParametroValor("cliente");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    CabeceraFV(cliente);
    FacturaVentaDetalle_tabla("tabla_venta_detalle");
    FacturaVentaDetalle_table_formato ();   
    

    var emisor_descripcion = document.getElementById('emisor_descripcion');   
    emisor_descripcion.onfocus  = function() {        
        emisor_descripcion.focus();
        emisor_descripcion.select();
    };      
    emisor_descripcion.focus();
    emisor_descripcion.select();

    
    
    
    
    var fvn_agregar_trasanccion = document.getElementById('fvn_agregar_trasanccion');
    fvn_agregar_trasanccion.addEventListener('click',
        function(event) {            
            VentaDetalle_modal_agregar( );        
        },
        false
    );    

    
    var fvn_guardar_trasanccion = document.getElementById('fvn_guardar_trasanccion');
    fvn_guardar_trasanccion.addEventListener('click',
        function(event) {

            
                if ( fventa_nuevo_validar_form() )
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
                            +"/FacturaVenta/Transaccion/Fin"; 


                    var control = AjaxPeticionURL( accion, getDataForm(form) + dataform );                

                    if (!(isNaN(control))){

                        localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
                        window.location = getRutaAbsoluta()+"/Session/FacturaVenta/Lista.jspx"; 
                    }
                    else{                    
                        alerta_error(control);
                    }
                } 
        },
        false
    );    

    

    var fvn_cancelar_trasanccion = document.getElementById('fvn_cancelar_trasanccion');
    fvn_cancelar_trasanccion.addEventListener('click',
        function(event) {
            
               AjaxUrl(getRutaAbsoluta()+'/FacturaVenta/Transaccion/Cancelar');   
               
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








function fventa_nuevo_validar_form ( ){
    
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
        
    
    
    
    
    // falta saber si existe registro
    var size = AjaxUrl( getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Size" );  
    if (size.toString().trim() === '0'){
        alerta_error("Sin detalles de compras");
        return;
    }
    
    
    
    return true;

}




