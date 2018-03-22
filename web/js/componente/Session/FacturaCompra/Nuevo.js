
var cliente = getParametroValor("cliente");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    CabeceraFC(cliente);
    FacturaCompraDetalle_tabla("tabla_compra_detalle");
    FacturaCompraDetalle_table_formato ();   
    

    var numero_factura = document.getElementById('numero_factura');   
    numero_factura.onfocus  = function() {        
        numero_factura.focus();
        numero_factura.select();
    };      
    numero_factura.focus();
    numero_factura.select();

    
    
    
    
    var cd_agregar_trasanccion = document.getElementById('cd_agregar_trasanccion');
    cd_agregar_trasanccion.addEventListener('click',
        function(event) {            
            CompraDetalle_modal_agregar( );        
        },
        false
    );    

    
    var cd_guardar_trasanccion = document.getElementById('cd_guardar_trasanccion');
    cd_guardar_trasanccion.addEventListener('click',
        function(event) {

            
                if ( fcompra_nuevo_validar_form() )
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
                            +"/FacturaCompra/Transaccion/Fin"; 


                    var control = AjaxPeticionURL( accion, getDataForm(form) + dataform );                

                    if (!(isNaN(control))){

                        localStorage.setItem("storageCliente", document.getElementById('clic_cliente').value);   
                        window.location = getRutaAbsoluta()+"/Session/FacturaCompra/Lista.jspx"; 
                    }
                    else{                    
                        alerta_error(control);
                    }
                } 
        },
        false
    );    

    

    var cd_cancelar_trasanccion = document.getElementById('cd_cancelar_trasanccion');
    cd_cancelar_trasanccion.addEventListener('click',
        function(event) {
            
               AjaxUrl(getRutaAbsoluta()+'/FacturaCompra/Transaccion/Cancelar');   
               
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








function fcompra_nuevo_validar_form ( ){
    
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
        
    
    
    
    
    // falta saber si existe registro
    var size = AjaxUrl( getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Size" );  
    if (size.toString().trim() === '0'){
        alerta_error("Sin detalles de compras");
        return;
    }
    
    
    
    return true;

}




