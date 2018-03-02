



function Usuario_basicform (   )
{


}




function Usuario_AgregarEditar_validacion() {
    
    var usuf_cuenta = document.getElementById('usuf_cuenta');       
    if ( (usuf_cuenta.value).toString().trim().length == 0 ) 
    {
        alerta_error("Falta cuenta de usuario");
        usuf_cuenta.focus();
        usuf_cuenta.select();
        return false;
    }

    return true;
    
}



function Usuario_basicform_Json(id)
{      
    var path = getRutaAbsoluta()+"/Usuario/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);  

        document.getElementById('usuf_usuario').value = VJson( json, "usuario", "N");
        document.getElementById('usuf_cuenta').value = VJson( json, "cuenta");        
    }
    else
    {
        document.getElementById('usuf_usuario').value = "0";
        document.getElementById('usuf_cuenta').value = "";
    }
}





function Usuario_basicform_disabled (   )
{    
    
    document.getElementById( 'usuf_usuario').disabled = true;
    document.getElementById( 'usuf_cuenta').disabled = true;
    
    
    document.getElementById( 'divclave').style.display = 'none';
    

    
}






/*


function Cliente_busqueda_Json(id)
{
            
    var path = "../Cliente/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
   
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);    

        document.getElementById('ordent_cliente').value = VJson( json, "cliente","N");
        document.getElementById('vicClienteDescripcion').value = 
                VJson( json, "nombre") +" " +VJson( json, "apellido") ;        

        document.getElementById('vicRuc').value = VJson( json, "ruc"); 
        document.getElementById('vicTel').value = VJson( json, "telefono"); 
        document.getElementById('vidDireccion').value = VJson( json, "direccion"); 
        document.getElementById('vicCiudad').value = VJson( json, "ciudad"); 
        
  
    }  
    else    
    {        
        document.getElementById('ordent_cliente').value = 0;
        document.getElementById('vicClienteDescripcion').value = "";
        document.getElementById('vicRuc').value = "";
        document.getElementById('vicTel').value = "";
        document.getElementById('vidDireccion').value = "";
        document.getElementById('vicCiudad').value = "";
    }  
    
    
}
















function Cliente_modal_agregar ( dom )
{
    
    VentanaModal("4",  '../Cliente/jspf/agregarCliente.jspx', 800 );        
    Cliente_basicform();
    

    var clia_guardar = document.getElementById('clia_guardar');
    clia_guardar.addEventListener('click',
        function() 
        {
                      
            if (Clientes_AgregarEditar_validacion())
            {
                var form = document.getElementById("clia_form");            
                var accion =  form.getAttribute('action') ; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                     //window.location = "../Cliente/Registro.jspx?id="+control.toString().trim();     
                     
                    linea_id = control;    
                    asignarValor(  dom , linea_id );
                    document.getElementById( dom ).onblur();  
                    clia_cerrar.click();

                     
                }
                else{                    
                    alerta_error(control);
                }
            }
        }, 
        false
    );  
    

    var clia_cerrar = document.getElementById('clia_cerrar');   
    clia_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("4");
        },
        false
    );



}
*/