
var cliente = getParametroValor("cliente");    

window.onload = function() {

    AjaxPeticion(getRutaAbsoluta()+'/MenuPrincipal','nav');   
    
    CabeceraFC(cliente);
    FacturaCompraDetalle_tabla("tabla_compra_detalle");
    FacturaVenta_form_formato ();   
    
    
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
    if (numero_factura .value <= 0 )     
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





function  FacturaVenta_form_formato (  ){
    
    
    
        var tabla = "compradetalle_transaccion_tabla";

        var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');

        for (var i=0 ; i < rows.length; i++)
        {
          
            cell = table.rows[i].cells[2] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            
            
            cell = table.rows[i].cells[3] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                        
            
            cell = table.rows[i].cells[4] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                 
            
            cell = table.rows[i].cells[5] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                 
            
        }
        
        
        var fcdlt_gravada0 = document.getElementById('fcdlt_gravada0');    
        fcdlt_gravada0.innerHTML = fmtNum(fcdlt_gravada0.innerHTML);         

        var fcdlt_gravada5 = document.getElementById('fcdlt_gravada5');    
        fcdlt_gravada5.innerHTML = fmtNum(fcdlt_gravada5.innerHTML);             
        
        var fcdlt_gravada10 = document.getElementById('fcdlt_gravada10');    
        fcdlt_gravada10.innerHTML = fmtNum(fcdlt_gravada10.innerHTML);             
        
        var fcdlt_monto_total = document.getElementById('fcdlt_monto_total');    
        fcdlt_monto_total.innerHTML = fmtNum(fcdlt_monto_total.innerHTML);             
        
        var fcdlt_iva5 = document.getElementById('fcdlt_iva5');    
        fcdlt_iva5.innerHTML = fmtNum(fcdlt_iva5.innerHTML);             
        
        var fcdlt_iva10 = document.getElementById('fcdlt_iva10');    
        fcdlt_iva10.innerHTML = fmtNum(fcdlt_iva10.innerHTML);             
        
        var fcdlt_total_iva = document.getElementById('fcdlt_total_iva');    
        fcdlt_total_iva.innerHTML = fmtNum(fcdlt_total_iva.innerHTML);             
        
        
        
        
        
        
}







