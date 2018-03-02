


window.onload = function() {

    AjaxPeticion('../MenuPrincipal','nav');   
    
    document.getElementById("form_body").innerHTML 
            =  AjaxUrl('../FacturaVenta/jspf/form.jspx');
    
    FacturaVenta_form();
        
       
    document.getElementById("tabla_factura_venta_detalle").innerHTML 
            =  AjaxUrl('../FacturaVentaDetalle/Transaccion/Listar');    
   
    document.getElementById("facvenf_fecha").value = fechaActual();
    
    
    
    
    var fvn_facturar_orden = document.getElementById('fvn_facturar_orden');   
    fvn_facturar_orden.addEventListener('click',
        function()
        {


            var dataform = "";
            if (document.getElementById("opt_CO").checked ){
                dataform = dataform + "&forma_pago=CO"
            }
            if (document.getElementById("opt_CR").checked ){
                dataform = dataform + "&forma_pago=CR"
            }

            dataform = dataform + "&gravada0="
                    +document.getElementById("fvdlt_gravada0").innerHTML.toString().trim();
            dataform = dataform 
                    + "&gravada5="+document.getElementById("fvdlt_gravada5").innerHTML.toString().trim();
            dataform = dataform 
                    + "&gravada10="+document.getElementById("fvdlt_gravada10").innerHTML.toString().trim();



            dataform = dataform + "&iva5="
                    +document.getElementById("fvdlt_iva5").innerHTML.toString().trim();
            dataform = dataform + "&iva10="
                    +document.getElementById("fvdlt_iva10").innerHTML.toString().trim();
            dataform = dataform + "&total_iva="
                    +document.getElementById("fvdlt_total_iva").innerHTML.toString().trim();
            
            
            dataform = dataform + "&monto_total="
                    +document.getElementById("fvdlt_monto_total").innerHTML.toString().trim();            
            
            
            if (FacturaVentaNuevo_validacion())
            {
                var form = document.getElementById("facvenf_form");            
                //var accion =  form.getAttribute('action') ; 
                var accion =  "../FacturaVenta/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form)+dataform  );                


                if (!(isNaN(control))){                                          

                    //location.href="../FacturaVenta/Registro.jspx?id="+control;
                    location.href="../FacturaVenta/Lista.jspx";
                    
                }
                else{                    
                    alerta_error(control);
                }
                
                
            }                   
            
            
            
            
            
            
        },
        false
    );




    var fvn_cancelar_factura = document.getElementById('fvn_cancelar_factura');
    fvn_cancelar_factura.addEventListener('click',
        function(event) {
            location.href="../FacturaVenta/Lista.jspx";
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








function FacturaVentaNuevo_validacion (   ){
    
    var orden = document.getElementById('facvenf_orden_trabajo').value;
    orden = orden.replace(/,/g, "");
    
    

    var existeorden =  AjaxUrl('../OrdenTrabajo/Consulta/Existe?orden='+orden); 
    if (existeorden.toString().trim() == "0"){
        alerta_error("No exite orden de trabajo");
        document.getElementById('facvenf_orden_trabajo').focus();
        document.getElementById('facvenf_orden_trabajo').select();
        return false;
    }

    
    
    

    
//  




/*
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


