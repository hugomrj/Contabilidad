



function Rol_basicform (   )
{


}



function Rol_AgregarEditar_validacion() {
    
    var rolf_nombre = document.getElementById('rolf_nombre');       
    if ( (rolf_nombre.value).toString().trim().length == 0 ) 
    {
        alerta_error("Falta nombre del rol");
        rolf_nombre.focus();
        rolf_nombre.select();
        return false;
    }

    return true;
    
}





function Rol_basicform_Json(id)
{      
    var path = getRutaAbsoluta()+"/Rol/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);  

        document.getElementById('rolf_rol').value = VJson( json, "rol", "N");
        document.getElementById('rolf_nombre').value = VJson( json, "nombre");        
    }
    else
    {
        document.getElementById('rolf_rol').value = "0";
        document.getElementById('rolf_nombre').value = "";
    }
}






function Rol_basicform_disabled (   )
{    
    
    document.getElementById( 'rolf_rol').disabled = true;
    document.getElementById( 'rolf_nombre').disabled = true;
    

    
}




