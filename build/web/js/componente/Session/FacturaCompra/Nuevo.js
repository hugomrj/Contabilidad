
var cliente = getParametroValor("cliente");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    CabeceraFC(cliente);
    
    
/*    
    document.getElementById("tabla_compra_detalle").innerHTML 
        =  AjaxUrl( getRutaAbsoluta()+'/FacturaCompraDetalle/Transaccion/Lista');    
   */
  
    FacturaCompraDetalle_tabla("tabla_compra_detalle");
    
    
    
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

/*
                    var postPie = getPost( "vdtl_", ["gravada0", "gravada5", "gravada10",
                                                                    "iva5", "iva10", "monto_total"] );
*/

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

    


};



window.onresize = function() {    
    var nodeList = document.querySelectorAll('.fondo_oscuro');    
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }
}








function fcompra_nuevo_validar_form ( ){
    
    
    // falta saber si existe registro
    var size = AjaxUrl( getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Size" );  
    if (size.toString().trim() === '0'){
        alerta_error("Sin detalles de compras");
        return;
    }
    
    
/*    
    
    var orden = document.getElementById('facvenf_orden_trabajo').value;
    orden = orden.replace(/,/g, "");

    var existeorden =  AjaxUrl('../OrdenTrabajo/Consulta/Existe?orden='+orden); 
    if (existeorden.toString().trim() == "0"){
        alerta_error("No exite orden de trabajo");
        document.getElementById('facvenf_orden_trabajo').focus();
        document.getElementById('facvenf_orden_trabajo').select();
        return false;
    }



    // controlar las cuadriculas estas cargadas
    var detalle_count = 0;    
    detalle_count = AjaxUrl('../OrdenTrabajoDetalle/Transaccion/Count');    
    if ( parseInt(detalle_count) == 0 ) 
    {
        alerta_error("Faltan valores del pedido");
        return false;
    }
*/ 
    
    
    
    return true;

}







function CabeceraFC (cliente ){

        AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaCompra/jspf/cabeceraFC.jspx'
                ,'form_cabecera');           

        var path = getRutaAbsoluta()+"/Cliente/Linea.json?id="+cliente 
        var jsonResponse = AjaxUrl( path );    

    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {        
        var json = JSON.parse(jsonResponse);  
        
        document.getElementById('clic_cliente').value = VJson( json, "cliente", "N");
        
        var tipocli = VJson( json, "tipo").toString().trim();
        if (tipocli === "F"){            
            document.getElementById('cliente_descripcion').value =    
                    VJson( json, "nombre") + " " + VJson( json, "apellido");                        
        }
        if (tipocli === "J"){
            document.getElementById('cliente_descripcion').value =    
                    VJson( json, "razon_social") ;            
        }        
    }
    else
    {       
        document.getElementById('clic_cliente').value = 0;
        document.getElementById('cliente_descripcion').value = "";
    }

}










