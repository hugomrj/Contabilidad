

function CompraDetalle_modal_agregar (  )
{
        
    VentanaModal("subSFCDa",  
        getRutaAbsoluta()+'/Session/FacturaCompraDetalle/jspf/agregarTransaccion.jspx', 800 );    
   
    CompraDetalle_modal_basicform();
    var fcd_cantidad = document.getElementById('fcd_cantidad');   
    fcd_cantidad.value = 0;


    var fcd_precio_unitario = document.getElementById('fcd_precio_unitario');   
    fcd_precio_unitario.onblur  = function() {        
        fcd_precio_unitario.value  = fmtNum(fcd_precio_unitario.value);   
        formulaSubTotal();
    };     
    fcd_precio_unitario.onblur();    




    var fcdat_aceptar = document.getElementById('fcdat_aceptar');   
    fcdat_aceptar.addEventListener('click',
        function()
        {           
      
            if (CompraDetalle_transaccion_validacion()){
                
                verificacion_porcentaje();                
                var form = document.getElementById("fcdat_form");                            
                var accion =  getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                
         
                if (!(isNaN(control)))
                {         
                    FacturaCompraDetalle_tabla("tabla_compra_detalle");
                    FacturaVentaDetalle_form_formato();                       
                    fcdat_cerrar.click();                    
                }
                else
                {    
                    alerta_error(control);
                }
            }    
            
        },
        false
                
    );





    var fcdat_cerrar = document.getElementById('fcdat_cerrar');   
    fcdat_cerrar.addEventListener('click',
        function()
        {           
            VentanaModalCerrar("subSFCDa");
        },
        false
    );



}












function CompraDetalle_transaccion_validacion (  ){


    var fcd_cantidad = document.getElementById('fcd_cantidad');   
   if (fcd_cantidad.value <= 0){
       alerta_error("Error en cantidad");
       fcd_cantidad.focus();
       return false;
   }



    var fcd_descripcion = document.getElementById('fcd_descripcion');   
    if ( (fcd_descripcion.value).toString().length === 0 ) 
    {
        alerta_error("Falta descripcion");
        fcd_descripcion.focus();
        return false;
    }
    
    
    var fcd_precio_unitario = document.getElementById('fcd_precio_unitario');   
   if (fcd_precio_unitario.value <= 0){
       alerta_error("Error en precio");
       fcd_precio_unitario.focus();
       return false;
   }
   
    return true;
}





function verificacion_porcentaje (  ){


        var fcd_impuesto_selector = document.getElementById('fcd_impuesto_selector').value.toString().trim();
        var fcd_porcentaje = document.getElementById('fcd_impuesto_porcentaje');
    
        if ( fcd_impuesto_selector === "10")
        {            
            fcd_porcentaje.value = 10;            
        }
        else{
            if ( fcd_impuesto_selector === "5")
            {            
                fcd_porcentaje.value = 5;            
            }
            else{
                if ( fcd_impuesto_selector === "exenta")
                {            
                    fcd_porcentaje.value = 0;            
                }
            }    
        }

}

function formulaSubTotal (  ){
    
    var fcd_cantidad = document.getElementById('fcd_cantidad');
    
    var precio_unitario = document.getElementById('fcd_precio_unitario');
    var fcd_sub_total = document.getElementById('fcd_sub_total');
    
    var calculo = fcd_cantidad.value * NumQP(precio_unitario.value);
    
    if(!isNaN(calculo))
    {  
        fcd_sub_total.value = fmtNum( Math.round(calculo));   
    }
    else
    {        
        fcd_sub_total.value = 0;
    }
    
}



function CompraDetalle_modal_EditarBorrar ( id )
{
        
    VentanaModal("subSFCDeb",  
        getRutaAbsoluta()+'/Session/FacturaCompraDetalle/jspf/editarBorrarTransaccion.jspx', 800 );    
                
        // falta un json de transaccion
                
        var path = getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Linea.json?id=" + id
        var jsonResponse = AjaxUrl( path );    

        if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
        {  
            var json = JSON.parse(jsonResponse); 
            
            document.getElementById('fcd_compra_detalle').value = VJson( json, "compra_detalle", "N");       
            
            document.getElementById('fcd_cantidad').value = VJson( json, "cantidad", "N");       
            document.getElementById('fcd_descripcion').value = VJson( json, "descripcion");       
            document.getElementById('fcd_precio_unitario').value = VJson( json, "precio_unitario","N");  
            
            var fcd_impuesto_porcentaje = document.getElementById('fcd_impuesto_porcentaje');
            fcd_impuesto_porcentaje.value = VJson( json, "impuesto_porcentaje","N");       

            if (fcd_impuesto_porcentaje.value == 10){
                document.getElementById("fcd_impuesto_selector").selectedIndex = 0;                
            }                      
            if (fcd_impuesto_porcentaje.value == 5){
                document.getElementById("fcd_impuesto_selector").selectedIndex = 1;                
            }      
            if (fcd_impuesto_porcentaje.value == 0){
                document.getElementById("fcd_impuesto_selector").selectedIndex = 2;                
            }      
            document.getElementById('fcd_sub_total').value = VJson( json, "sub_total","N");  

        }

        CompraDetalle_modal_basicform();


        var fcdebt_Editar = document.getElementById('fcdebt_Editar');   
        fcdebt_Editar.addEventListener('click',
            function()
            {           

                if (CompraDetalle_transaccion_validacion()){
                    verificacion_porcentaje();                                  
                    var form = document.getElementById("fcdebt_form");                            
                    var accion =  getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Editar?id="+id; 
               
                    var control = AjaxPeticionURL( accion, getDataForm(form) );                   
                    if (!(isNaN(control)))
                    {         
                        FacturaCompraDetalle_tabla("tabla_compra_detalle");
                        FacturaVentaDetalle_form_formato();                       
                        fcdebt_cancelar.click();                    
                    }
                    else
                    {    
                        alerta_error(control);
                    }
                }    
            },
            false
        );



        var fcdebt_Borrar = document.getElementById('fcdebt_Borrar');   
        fcdebt_Borrar.addEventListener('click',
            function()
            {                                        

                var form = document.getElementById("fcdebt_form");     
                var accion =  getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Borrar?id="+id;                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control)))
                {                       
                        FacturaCompraDetalle_tabla("tabla_compra_detalle");
                        FacturaVentaDetalle_form_formato();                       
                        fcdebt_cancelar.click();      
                }
                else
                {    
                    alerta_error(control);
                }
            },
            false
        );



        var fcdebt_cancelar = document.getElementById('fcdebt_cancelar');   
        fcdebt_cancelar.addEventListener('click',
            function()
            {           
                VentanaModalCerrar("subSFCDeb");
            },
            false
        );



}




function CompraDetalle_modal_basicform (  )
{

    var fcd_cantidad = document.getElementById('fcd_cantidad');   
    //fcd_cantidad.value = 0;
    fcd_cantidad.onblur  = function() {   
   
        if (!(validateDecimal(fcd_cantidad.value))){
            fcd_cantidad.value = 0;
        }
        formulaSubTotal();        
   
    };     
    fcd_cantidad.onblur();    
    fcd_cantidad.focus();
    fcd_cantidad.select();
    


    var fcd_precio_unitario = document.getElementById('fcd_precio_unitario');   
    fcd_precio_unitario.onblur  = function() {        
        fcd_precio_unitario.value  = fmtNum(fcd_precio_unitario.value);   
        formulaSubTotal();
    };     
    fcd_precio_unitario.onblur();    


}