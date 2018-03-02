

function Interaccion_basicform (   )
{


    var interf_modulo = document.getElementById( 'interf_modulo');
    interf_modulo.onblur  = function() {        
        
        interf_modulo.value  = fmtNum(interf_modulo.value);           
        var idmodulo = interf_modulo.value;
        modulo_descripcion_Json( idmodulo );            
        document.getElementById( 'modulo_descripcion').innerHTML = modulo_descripcion_Json( idmodulo ); 
        
    };     
    interf_modulo.onblur();





    var interf_modulo_buscar = document.getElementById( 'interf_modulo_buscar');
    interf_modulo_buscar.addEventListener('click',
        function()
        {  
            ModalBusquedaSimple('2',  getRutaAbsoluta()+'/Sistema/Modulo/jspf/busqueda.jspx',
                    "Modulo", "interf_modulo" , "modulos_tabla", 600 );                                        
            
        },
        false
    );   

    

}




function Interaccion_AgregarEditar_validacion() {
    
    
    var interf_nombre = document.getElementById('interf_nombre');       
    if ( (interf_nombre.value).toString().trim().length == 0 ) 
    {
        alerta_error("Falta nombre de la interaccion");
        interf_nombre.focus();
        interf_nombre.select();
        return false;
    }


    var modulo_descripcion = document.getElementById('modulo_descripcion');       
    var interf_modulo = document.getElementById('interf_modulo');       
    
    if ( (modulo_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Modulo");
        interf_modulo.focus();
        interf_modulo.select();
        return false;
    }


    
    var interf_url = document.getElementById('interf_url');       
    if ( (interf_url.value).toString().trim().length == 0 ) 
    {
        alerta_error("Falta url");
        interf_url.focus();
        interf_url.select();
        return false;
    }




    return true;
    
}





function Interaccion_basicform_Json(id)
{      
    var path = getRutaAbsoluta()+"/Interaccion/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);  
        
        document.getElementById('interf_interaccion').value = VJson( json, "interaccion", "N");
        document.getElementById('interf_nombre').value = VJson( json, "nombre");        
        document.getElementById('interf_modulo').value = json[0]["modulo"]["modulo"];        
        document.getElementById('modulo_descripcion').value = json[0]["modulo"]["descripcion"];        
        document.getElementById('interf_url').value = json[0]["url"]
        document.getElementById('interf_orden').value = VJson( json, "orden", "N");
    }
    else
    {
        document.getElementById('interf_interaccion').value = "0";
        document.getElementById('interf_nombre').value = "";        
        document.getElementById('interf_modulo').value = "0";        
        document.getElementById('modulo_descripcion').value = "";        
        document.getElementById('interf_url').value = ""
        document.getElementById('interf_orden').value = "0";

    }
}






function Interaccion_basicform_disabled (   )
{        
    document.getElementById( 'interf_interaccion').disabled = true;
    document.getElementById( 'interf_nombre').disabled = true;
    document.getElementById( 'interf_modulo').disabled = true;
    document.getElementById( 'interf_url').disabled = true;
    document.getElementById( 'interf_orden').disabled = true;
    
    
}




