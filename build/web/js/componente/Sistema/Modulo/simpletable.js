


function modulo_descripcion_Json(id)
{      
    var path = getRutaAbsoluta()+"/Modulo/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    var retornar = "";
    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )   
    {        
        var json = JSON.parse(jsonResponse); 
        retornar = VJson( json, "descripcion");
    }
    return retornar;
}


