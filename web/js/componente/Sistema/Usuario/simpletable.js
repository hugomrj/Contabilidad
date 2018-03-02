


function Usuario_cuenta_Json(id)
{      
    
    
    var path = getRutaAbsoluta()+"/Usuario/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    var retornar = "";
    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse); 
        retornar = VJson( json, "cuenta");
    }
    return retornar;
}


