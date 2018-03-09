

function CompraDetalle_modal_agregar (  )
{
        
    VentanaModal("subSFCDa",  
        getRutaAbsoluta()+'/Session/FacturaCompraDetalle/jspf/agregarTransaccion.jspx', 800 );    
    

    var fcd_cantidad = document.getElementById('fcd_cantidad');   
    fcd_cantidad.value = 0;
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




    var fcdat_aceptar = document.getElementById('fcdat_aceptar');   
    fcdat_aceptar.addEventListener('click',
        function()
        {           
      
            if (CompraDetalle_Agregar_transaccion_validacion()){
                
                verificacion_porcentaje();
                
                var form = document.getElementById("fcdat_form");                            
                var accion =  getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                
         
                if (!(isNaN(control)))
                {   
      
      
                    FacturaCompraDetalle_tabla("tabla_compra_detalle");
      /*
                    document.getElementById("tabla_compra_detalle").innerHTML 
                        =  AjaxUrl( getRutaAbsoluta()+'/FacturaCompraDetalle/Transaccion/Lista');                        
         */           
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












function CompraDetalle_Agregar_transaccion_validacion (  ){


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
        var fcd_porcentaje = document.getElementById('fcd_porcentaje');
    
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














