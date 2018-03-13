


function Usuario_cuenta_Json(id)
{      
    
    
    var path = getRutaAbsoluta()+"/Usuario/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    var retornar = "";
    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )       
    {        
        var json = JSON.parse(jsonResponse); 
        retornar = VJson( json, "cuenta");
    }
    return retornar;
}


