

function VentaDetalle_modal_agregar (  )
{
        
    VentanaModal("subSFCDa",  
        getRutaAbsoluta()+'/Session/FacturaVentaDetalle/jspf/agregarTransaccion.jspx', 800 );    
   
    VentaDetalle_modal_basicform();
    var fvd_cantidad = document.getElementById('fvd_cantidad');   
    fvd_cantidad.value = 0;


    var fvd_precio_unitario = document.getElementById('fvd_precio_unitario');   
    fvd_precio_unitario.onblur  = function() {        
        fvd_precio_unitario.value  = fmtNum(fvd_precio_unitario.value);   
        formulaSubTotal();
    };     
    fvd_precio_unitario.onblur();    




    var fvdat_aceptar = document.getElementById('fvdat_aceptar');   
    fvdat_aceptar.addEventListener('click',
        function()
        {           
      
            if (VentaDetalle_transaccion_validacion()){
                
                verificacion_porcentaje();                
                var form = document.getElementById("fvdat_form");                            
                var accion =  getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Agregar"; 
                
               
                var control = AjaxPeticionURL( accion, getDataForm(form) );                
         
                if (!(isNaN(control)))
                {         
                    FacturaVentaDetalle_tabla("tabla_venta_detalle");                    
                    FacturaVentaDetalle_table_formato();
                    fvdat_cerrar.click();                    
                }
                else
                {    
                    alerta_error(control);
                }
            }    
            
        },
        false
                
    );





    var fvdat_cerrar = document.getElementById('fvdat_cerrar');   
    fvdat_cerrar.addEventListener('click',
        function()
        {           
            VentanaModalCerrar("subSFCDa");
        },
        false
    );



}












function VentaDetalle_transaccion_validacion (  ){


    var fvd_cantidad = document.getElementById('fvd_cantidad');   
   if (fvd_cantidad.value <= 0){
       alerta_error("Error en cantidad");
       fvd_cantidad.focus();
       return false;
   }



    var fvd_descripcion = document.getElementById('fvd_descripcion');   
    if ( (fvd_descripcion.value).toString().length === 0 ) 
    {
        alerta_error("Falta descripcion");
        fvd_descripcion.focus();
        return false;
    }
    
    
    var fvd_precio_unitario = document.getElementById('fvd_precio_unitario');   
   if (fvd_precio_unitario.value <= 0){
       alerta_error("Error en precio");
       fvd_precio_unitario.focus();
       return false;
   }
   
    return true;
}





function verificacion_porcentaje (  ){


        var fvd_impuesto_selector = document.getElementById('fvd_impuesto_selector').value.toString().trim();
        var fvd_porcentaje = document.getElementById('fvd_impuesto_porcentaje');
    
        if ( fvd_impuesto_selector === "10")
        {            
            fvd_porcentaje.value = 10;            
        }
        else{
            if ( fvd_impuesto_selector === "5")
            {            
                fvd_porcentaje.value = 5;            
            }
            else{
                if ( fvd_impuesto_selector === "exenta")
                {            
                    fvd_porcentaje.value = 0;            
                }
            }    
        }

}

function formulaSubTotal (  ){
    
    var fvd_cantidad = document.getElementById('fvd_cantidad');
    
    var precio_unitario = document.getElementById('fvd_precio_unitario');
    var fvd_sub_total = document.getElementById('fvd_sub_total');
    
    var calculo = fvd_cantidad.value * NumQP(precio_unitario.value);
    
    if(!isNaN(calculo))
    {  
        fvd_sub_total.value = fmtNum( Math.round(calculo));   
    }
    else
    {        
        fvd_sub_total.value = 0;
    }
    
}







function VentaDetalle_modal_EditarBorrar (  id_transaccion )
{
        
    VentanaModal("subSFCDeb",  
        getRutaAbsoluta()+'/Session/FacturaVentaDetalle/jspf/editarBorrarTransaccion.jspx', 800 );    
                
        // falta un json de transaccion
                
        var path = getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Linea.json?id=" + id_transaccion
        var jsonResponse = AjaxUrl( path );    

        if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
        {  
            var json = JSON.parse(jsonResponse); 
            
            document.getElementById('fvd_compra_detalle').value = VJson( json, "compra_detalle", "N");       
            
            document.getElementById('fvd_cantidad').value = VJson( json, "cantidad", "N");       
            document.getElementById('fvd_descripcion').value = VJson( json, "descripcion");       
            document.getElementById('fvd_precio_unitario').value = VJson( json, "precio_unitario","N");  
            
            var fvd_impuesto_porcentaje = document.getElementById('fvd_impuesto_porcentaje');
            fvd_impuesto_porcentaje.value = VJson( json, "impuesto_porcentaje","N");       

            if (fvd_impuesto_porcentaje.value == 10){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 0;                
            }                      
            if (fvd_impuesto_porcentaje.value == 5){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 1;                
            }      
            if (fvd_impuesto_porcentaje.value == 0){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 2;                
            }      
            document.getElementById('fvd_sub_total').value = VJson( json, "sub_total","N");  

        }

        VentaDetalle_modal_basicform();


        var fvdebt_Editar = document.getElementById('fvdebt_Editar');   
        fvdebt_Editar.addEventListener('click',
            function()
            {           

                if (VentaDetalle_transaccion_validacion()){
                    verificacion_porcentaje();                                  
                    var form = document.getElementById("fvdebt_form");                            
                    var accion =  getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Editar?id="+id_transaccion; 
               
                    var control = AjaxPeticionURL( accion, getDataForm(form) );                   
                    if (!(isNaN(control)))
                    {         
                        FacturaVentaDetalle_tabla("tabla_venta_detalle");
                        FacturaVentaDetalle_table_formato();                  
                        fvdebt_cancelar.click();                    
                    }
                    else
                    {    
                        alerta_error(control);
                    }
                }    
            },
            false
        );



        var fvdebt_Borrar = document.getElementById('fvdebt_Borrar');   
        fvdebt_Borrar.addEventListener('click',
            function()
            {                                        

                var form = document.getElementById("fvdebt_form");     
                var accion =  getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Borrar?id="+id_transaccion;                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control)))
                {                       
                        FacturaVentaDetalle_tabla("tabla_venta_detalle");
                        FacturaVentaDetalle_table_formato();                       
                        fvdebt_cancelar.click();      
                }
                else
                {    
                    alerta_error(control);
                }
            },
            false
        );



        var fvdebt_cancelar = document.getElementById('fvdebt_cancelar');   
        fvdebt_cancelar.addEventListener('click',
            function()
            {           
                VentanaModalCerrar("subSFCDeb");
            },
            false
        );

}





function VentaDetalle_modal_Consulta ( id )
{
        
    VentanaModal("subSFCDc",  
        getRutaAbsoluta()+'/Session/FacturaVentaDetalle/jspf/consultaRegistro.jspx', 800 );    
                                
        // json 
        
        var path = getRutaAbsoluta()+"/FacturaVentaDetalle/Linea.json?id=" + id
        var jsonResponse = AjaxUrl( path );    

        if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
        {  
            var json = JSON.parse(jsonResponse); 
            
            document.getElementById('fvd_compra_detalle').value = VJson( json, "compra_detalle", "N");       
            
            document.getElementById('fvd_cantidad').value = VJson( json, "cantidad", "N");       
            document.getElementById('fvd_descripcion').value = VJson( json, "descripcion");       
            document.getElementById('fvd_precio_unitario').value = VJson( json, "precio_unitario","N");  
            
            var fvd_impuesto_porcentaje = document.getElementById('fvd_impuesto_porcentaje');
            fvd_impuesto_porcentaje.value = VJson( json, "impuesto_porcentaje","N");       

            if (fvd_impuesto_porcentaje.value == 10){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 0;                
            }                      
            if (fvd_impuesto_porcentaje.value == 5){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 1;                
            }      
            if (fvd_impuesto_porcentaje.value == 0){
                document.getElementById("fvd_impuesto_selector").selectedIndex = 2;                
            }      
            document.getElementById('fvd_sub_total').value = VJson( json, "sub_total","N");  

        }

        //CompraDetalle_modal_basicform();



        var fvdr_cerrar = document.getElementById('fvdr_cerrar');   
        fvdr_cerrar.addEventListener('click',
            function()
            {           
                VentanaModalCerrar("subSFCDc");
            },
            false
        );


}




function VentaDetalle_modal_basicform (  )
{

    var fvd_cantidad = document.getElementById('fvd_cantidad');   
    //fcd_cantidad.value = 0;
    fvd_cantidad.onblur  = function() {   
   
        if (!(validateDecimal(fvd_cantidad.value))){
            fvd_cantidad.value = 0;
        }
        formulaSubTotal();        
   
    };     
    fvd_cantidad.onblur();    
    fvd_cantidad.focus();
    fvd_cantidad.select();
    


    var fvd_precio_unitario = document.getElementById('fvd_precio_unitario');   
    fvd_precio_unitario.onblur  = function() {        
        fvd_precio_unitario.value  = fmtNum(fvd_precio_unitario.value);   
        formulaSubTotal();
    };     
    fvd_precio_unitario.onblur();    


}




function FacturaVentaDetalle_form_disabled (){
    
    document.getElementById( 'fvd_cantidad').disabled = true;
    document.getElementById( 'fvd_descripcion').disabled = true;
    document.getElementById( 'fvd_precio_unitario').disabled = true;
    document.getElementById( 'fvd_impuesto_selector').disabled = true;
    
}









function FacturaVentaDetalle_registro_formato (){
    
    
    var fvd_precio_unitario = document.getElementById('fvd_precio_unitario');   
    fvd_precio_unitario.value  = fmtNum(fvd_precio_unitario.value);   
    
    
    var fvd_sub_total = document.getElementById('fvd_sub_total');   
    fvd_sub_total.value  = fmtNum(fvd_sub_total.value);   
    
    
}
